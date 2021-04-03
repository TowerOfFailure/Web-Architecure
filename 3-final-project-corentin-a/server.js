'use strict';

const express = require('express');
//const path = require('path');

//Port number from environment
var PORT = process.env.PORT;

//The app itself
const app = express();

app.get('/', (req,res) => {
  res.sendFile(__dirname+"/MoviesQuiz.html");
});

app.get('/style.css', (req,res) => {
  res.sendFile(__dirname+"/style.css");
});

app.get('/movies.js', (req,res) => {
  res.sendFile(__dirname+"/movies.js");
});

if(PORT == undefined){
  PORT=5000;
}
app.listen(PORT,console.log(`Running on port :${PORT}`));
