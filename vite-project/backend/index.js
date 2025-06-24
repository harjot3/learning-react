/* 
Template
// Express ------------------------------------------------------------------------ //
// ---------------------------------------------------------------------------------- //
*/

// dotenv (api keys) -------------------------------------------------------- //
require('dotenv').config();
const mongoDBUsername = process.env.MONGODB_USERNAME;
const mongoDBPassword = process.env.MONGODB_PASSWORD;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;

const nodeMailerUser = process.env.NODEMAILER_USER;
const nodeMailerPass = process.env.NODEMAILER_PASS;
const JWT_SecretKey = process.env.JWT_SecretKey;
const port = process.env.PORT;
// ---------------------------------------------------------------------------------- //


// Variables ------------------------------------------------------------------------ //
var usersEntered = {};
// ---------------------------------------------------------------------------------- //


// Express (backend server )------------------------------------------------------------- //
const express = require('express');
const app = express();
app.use(express.json()); 
// ---------------------------------------------------------------------------------- //


// cors middleware ---------------------------------------------------------------- //
const cors = require('cors');
app.use(cors());
// ---------------------------------------------------------------------------------- //


// MongoDB (database) ----------------------------------------------------------------------------- //
const mongoose = require('mongoose');
const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.8jbzuel.mongodb.net/${MONGODB_CLUSTER}`;

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

var userEmail;
var userUsername;
var userPassword;

// connects to frontend via http://localhost:3000/api/register
app.post("/api/register", async (request, response) => {
  // Get the information sent from front-end
  let { email, username, password } = request.body;

  let messageOne;

  let existingUsername = await userModel.findOne( { username : username } );
  let existingEmail = await userModel.findOne( { email : email } );
  let verification_code = Math.floor(Math.random() * (999999 - 111111) + 111111);   // random 6 digit code

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
    "messageOne" : messageOne,
    "existingUsername" : existingUsername ? true : false,
    "existingEmail" : existingEmail ? true : false,
    "verification_code" : verification_code,
    "email" : email,
    "username" : username
  });

  usersEntered.email = email ;
  usersEntered.password = password;
  usersEntered.username = username;
});
// ----------------------------------------------------------------------------------- //

// Nodemailer (verification email) ----------------------------------------------------------------------- //
const nodemailer = require('nodemailer');

async function sendMail(email, code) {

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: nodeMailerUser,  
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
      console.log('Email sent');
    }
  });
}
// ----------------------------------------------------------------------------------- //

// ----------------------------------------------------------------------------------- //
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
// ----------------------------------------------------------------------------------- //

// Decode Token ------------------------------------------------------------------------ //
const jwt = require('jsonwebtoken');
app.post("/api/verifyToken", async function(request, response) {

  let { token }  = request.body;
  var decoded;
  
  try {
    decoded = jwt.verify(token, JWT_SecretKey);;
    if (decoded) {
      console.log(decoded.usernameOrEmail)
    }
  } catch (error) {
    console.log("error");
  }

  let user = await userModel.findOne({
    $or : [
      { email : decoded.usernameOrEmail },
      { username : decoded.usernameOrEmail}
    ]
  }); 

  let usernameOrEmail = decoded.usernameOrEmail;
  let password = user.password;
  

  response.json({
    usernameOrEmail : usernameOrEmail,
    password : password
  });

})


// ----------------------------------------------------------------------------------- //

// ----------------------------------------------------------------------------------- //
app.post("/api/login", async function(request, response) {

    let { usernameOrEmail, password } = request.body;
    let messageFive = `Login Successful`;
    let existingEmail = await userModel.findOne( { email : usernameOrEmail  } );
    let existingUsername = await userModel.findOne( { username : usernameOrEmail } );
    var token;

    if (!existingEmail && !existingUsername) {
      messageFive = `That email/username was not found`;        
    } 

    else if (existingUsername) {
      if (password !== existingUsername.password) {
        messageFive = `Incorrect password entered`;
      }
    } 

    else if (existingEmail) {
      if (password !== existingEmail.password) {
          messageFive = `Incorrect password entered`;
      }
    }

    if (messageFive === 'Login Successful') {
        const payload = {
            "usernameOrEmail" : usernameOrEmail,
        }
        token = jwt.sign(payload, JWT_SecretKey, { expiresIn: '7d'});
    }

    response.json({
        messageFive,
        token
    })

})
// ----------------------------------------------------------------------------------- //

// printing results to local server
app.get("/api/register", function(request, response) {
  response.json({ 
    usersEntered
  });
});

// start the server 
app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});  
