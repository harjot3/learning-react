const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.get("/api", (request, response) => {
    response.json( {"users" : ["one", "two", "three"] })
})

app.listen(3000, () => {console.log("it's listening")})

mongoose.connect(
   "//username:<my_password>@cluster0.8jbzuel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})