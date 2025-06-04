/* 
Template
// Express ------------------------------------------------------------------------ //
// ---------------------------------------------------------------------------------- //
*/
// Variables ------------------------------------------------------------------------ //
const port = 5000;
var usersEntered = {};
// ---------------------------------------------------------------------------------- //

// dotenv --------------------------------------------------------------------------- //
require('dotenv').config();
const mongoDBUsername = process.env.MONGODB_USERNAME;
const mongoDBPassword = process.env.MONGODB_PASSWORD;

const nodeMailerUser = process.env.NODEMAILER_USER;
const nodeMailerPass = process.env.NODEMAILER_PASS;

// ---------------------------------------------------------------------------------- //


// Express ------------------------------------------------------------------------ //
const express = require('express');
const app = express();
app.use(express.json()); 
// ---------------------------------------------------------------------------------- //


// cors middleware ---------------------------------------------------------------- //
const cors = require('cors');
app.use(cors());
// ---------------------------------------------------------------------------------- //


// MongoDB ---------------------------------------------------------------------------------- //
const mongoose = require('mongoose');
const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.8jbzuel.mongodb.net/ExpenseTracker`;

mongoose.connect(uri)

mongoose.connection.once('open', function printStatus()  {
  console.log('Connected to MongoDB Atlas!');
});

const userSchema =  new mongoose.Schema({
    email : String,
    username: String,
    password: String
});

const userModel = mongoose.model("user", userSchema);
// ----------------------------------------------------------------------------------- //


// Nodemailer  ----------------------------------------------------------------------- //
const nodemailer = require('nodemailer');

async function sendMail(email, code) {

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: nodeMailerUser,  // Remove template literals since these are already strings
      pass: nodeMailerPass
    },
  });

  var mailOptions = {
    from: `${nodeMailerUser}`,
    to: `${email}`,
    subject: 'Expense Tracker Authentication Code',
    text: `Your verification code is ${code}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: '  + info.response);
    }
  });
}

// ----------------------------------------------------------------------------------- //

var userEmail;
var userUsername;
var userPassword;

// connects to frontend via http://localhost:5000/api
app.post("/api/register", async (request, response) => {
  // Get the information sent from front-end
  let { email, username, password } = request.body;


  let messageOne;

  console.log("Received Email:", email);
  console.log("Received Username:", username);
  console.log("Received Password", password)

  let existingUsername = await userModel.findOne( { username : username } );
  let existingEmail = await userModel.findOne( { email : email } );
  let verification_code = Math.floor(Math.random() * (999999 - 111111) + 111111);

  userEmail = email;
  userUsername = username;
  userPassword = password;
  

  if (existingUsername) {
    messageOne = `The username ${username} already exists`;
  } else if (existingEmail) {
      messageOne = `The email ${email} already exists`;
  } else {
    messageOne = `Welcome to Joti's Expense Tracker, ${username}!`
    sendMail(email, verification_code);
  }

  // Send a response back 
  response.json({ 
    messageOne,
    existingUsername : existingUsername ? true : false,
    existingEmail : existingEmail ? true : false,
    verification_code : verification_code
  });

  email = usersEntered.email ;
  password = usersEntered.passwor;
  username = usersEntered.username;
});



app.post("/api/verify" , async function(request, response) {
    let { correctVerificationCodeEntered } = request.body;

    if (correctVerificationCodeEntered) {
        const user = new userModel({
        email : userEmail,
        username: userUsername,
        password : userPassword,
      })
      user.save();
    }
})


app.post("/api/login", function(request, response) {
    let { usernameOrEmail, password } = request.body;

    let existingEmail = userModel.findOne( { email : usernameOrEmail  } );
    let existingUsername = userModel.findOne( { username : usernameOrEmail  } );
    

    response.json({
      
    })

})

// printing results to local server
app.get("/api/register", function(request, response) {
  response.json({ 
    usersEntered
  });
});

// start the server 
app.listen(port, console.log(`Server running on port ${port}`));  
