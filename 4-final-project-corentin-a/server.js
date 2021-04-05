const express = require('express');
const DATABASE_NAME="GamingGame";
const MONGO_URL = `mongodb+srv://admin:admin@cluster0.yuirx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
const JSON = require('JSON');

//Starting the connection with the database.
let db = null;
let coll = null;
let users = null;

//Port number from environment
var PORT = process.env.PORT;

//The app itself
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({
  type: function(req) {
    return 'text';
  }
}));

//The base games to install in the database.
async function initialImport(){
  //Initial images and games associated
    const doc = {
        games: [
          {
            id:1,
            name:"celeste",
            screenshot:"/images/Game1.jpg"
          },
          {
            //For games having alternate titles, i added the "alt" option (difficulty option?)
            id:2,
            name:"super meat boy",
            alt:"meat boy",
            screenshot:"/images/Game2.png"
          },
          {
            id:3,
            name:"indivisible",
            screenshot:"/images/Game3.jpg"
          },
          {
            id:4,
            name:"donkey kong",
            screenshot:"/images/Game4.jpg"
          },
          {
            id:5,
            name:"space invaders",
            screenshot:"/images/Game5.jpg"
          },
          {
            id:6,
            name:"mortal kombat",
            screenshot:"/images/Game6.jpg"
          },
          {
            id:7,
            name:"rivals of aether",
            screenshot:"/images/Game7.jpg"
          },
          {
            id:8,
            name:"cookie clicker",
            screenshot:"/images/Game8.jpg"
          },
          {
            id:9,
            name:"doki doki litterature club",
            alt:'ddlc',
            screenshot:"/images/Game9.jpg"
          },
          {
            id:10,
            name:"just shapes and beats",
            alt:'jsab',
            screenshot:"/images/Game10.jpg"
          },
          {
            id:11,
            name:"super mario maker",
            alt:"mario maker",
            screenshot:"/images/Game11.jpg"
          },
          {
            id:12,
            name:"overclocked",
            screenshot:"/images/Game12.jpg"
          },
          {
            id:13,
            name:"minecraft",
            screenshot:"/images/Game13.png"
          },
          {
            id:14,
            name:"fortnite",
            screenshot:"/images/Game14.jpg"
          },
          {
            id:15,
            name:"dofus",
            screenshot:"/images/Game15.jpg"
          },
          {
            id:16,
            name:"kingdom hearts",
            alt:"kh",
            screenshot:"/images/Game16.jpg"
          },
          {
            id:17,
            name:"undertale",
            screenshot:"/images/Game17.jpg"
          },
          {
            id:18,
            name:"superhot",
            alt:"super hot",
            screenshot:"/images/Game18.jpg"
          },
          {
            id:19,
            name:"portal",
            screenshot:"/images/Game19.jpg"
          },
          {
            id:20,
            name:"rayman",
            screenshot:"/images/Game20.jpg"
          }
        ]
    };
    const result = await coll.insertOne(doc);
    console.log(`Document id: ${result.insertedId}`);
    //Initial admins import (admin / admin, authorization of level 2)
    const admins = {
      score:[{
        name:"admin",
        score:0,
        date:Date.now()
      }]
    }
    const result2 = await coll.insertOne(admins);
    console.log(`Document id: ${result2.insertedId}`);
}

async function GetElements(){
  coll.findOne({},function (err,res) {
    var ids=[];
    var pics = {};
    var games={};
    var images=res.games;
    for(var i=0;i<images.length; i++){
      const number = i;
      const src = images[i].screenshot;
      app.get(src,(req,res) => {
        res.sendFile(__dirname + src);
      });
      //The answers for the quiz
      id=images[i].id
      app.post("/quiz/"+id, (req2,res2) => {
        //Send true if the result is correct, and false is it isn"t (similar to 1 and 0)
        res2.send((JSON.parse(req2.body).nameGame == images[number].name) || (JSON.parse(req2.body).nameGame == images[number].alt));
        //res2.send((JSON.parse(req2.body).nameGame == images[JSON.parse(req2.body).id-1].name) || (JSON.parse(req2.body).nameGame == images[JSON.parse(req2.body).id-1].alt));
      });
      app.post("/remove/"+id, (req2,res2) => {
        coll.games.update({
          $delete:{
            id:req2.id
          }
        })
        res2.send("");
      });
      ids.push(id);
      pics[id]=src;
      game = images[i];
      games[id]=game;
    }
    app.post("/ids", (res,result) => {
      //returns all available ids
      result.send(ids);
    });
    app.post("/pics", (req,result)=>{
      result.send(pics);
    });
    app.post("/games", (req,result)=>{
      result.send(games);
    });
  });
}

MongoClient.connect(MONGO_URL,function(err,client){
  db=client.db(DATABASE_NAME);
  coll = db.collection("GamingGameV1");
  //if the collection does not exist already, ve must create it
  if(!coll){
    db.createCollection("GamingGameV1", function(err,res){
      if(err) throw err;
      console.log("Collection created ! ^^");
    });
    coll = db.collection("GamingGameV1");
  }

  initialImport();
  GetElements();
});

//The different web pages
app.get('/admin', (req,res) => {
  res.sendFile(__dirname+"/admin.html");
});

app.get('/quiz', (req,res) => {
  //console.log(coll);
  res.sendFile(__dirname+"/quiz.html");
});

app.get('/', (req,res) => {
  res.sendFile(__dirname+"/connection.html");
});

app.get('/result', (req,res) => {
  res.sendFile(__dirname+"/result.html");
});

app.post("/result", (req,res) =>{
  console.log(req.body);
  if(req.body.name){
    coll.user.update( {users : {$push :
      {
        name : req.name,
        score: req.score,
        date : Date.now()
      }}
    });
  }
});

//The css file
app.get('/adminStyle.css', (req,res) => {
  res.sendFile(__dirname+"/adminStyle.css");
});

//the different scripts

app.get('/connection.js', (req,res) => {
  res.sendFile(__dirname+"/connection.js");
});

app.get('/admin.js', (req,res) => {
  res.sendFile(__dirname+"/admin.js");
});

app.get('/quiz.js', (req,res) => {
  res.sendFile(__dirname+"/quiz.js");
});

app.get('/result.js', (req,res) => {
  res.sendFile(__dirname+"/result.js");
});

//the connection attempts
app.post('/connection', (req,res) => {
  //req = JSON.parse(request);
  body=JSON.parse(req.body)
  console.log({name : body.name});
  coll.find({name : body.name},{name :1}).toArray((err, res) =>{
    console.log(res);
    if(err) throw err;
    if(res.length != 0){
      result = res[0]
      console.log(result);
      /*
      if(result.password == body.password){
        //level 1 is for a standard user and level 2 is for an administrator
        res.send(result.level);
      }
      else{
        //-1 is sent if the wrong password was sent
        res.send(-1);
      }
      */
      res.send(1);
    }
    else{
      //We send 0 if the account does not already exist
      res.send(0);
    }
  }
  )
});



if(PORT == undefined){
  PORT=5000;
}
app.listen(PORT,console.log(`Running on port :${PORT}`));
