

var currentScore = 0;
var numberOfQuestion = 0; // from 0 to 10
var numbers  = [];
var number = Math.floor(Math.random()*20)+1;

function NextGame(start){
  if(!start){
    let name = document.getElementById("GameName").value;
    console.log("theoretical body");
    console.log(JSON.stringify({nameGame:name, id:number}));
    fetch("/quiz/"+number,{
      method:"POST",
      body: JSON.stringify({nameGame:name, id:number})
    }).then((res)=>res.json()).then((res) => {
      console.log("res body");
      console.log(res);
      currentScore+=res;
      document.getElementById("QuizZone").innerHTML = "<p><span class='score'>"+ currentScore +"</span>/10</p></br><h2>From which game is this picture?</h2><img id='gamePic' src='images/Game" + number + ".jpg' alt='Gameplay picture'></img><br><input type='text' id='GameName'><br></input><button onclick='NextGame(false)'>Submit</button>"
})
    numberOfQuestion++;
  }
  if(numberOfQuestion==10){
    //Go to the results page
  }
  while(numbers.includes(number)){
    number = Math.floor(Math.random()*20)+1;
  }
  numbers.push(number);
  document.getElementById("QuizZone").innerHTML = "<p><span class='score'>"+ currentScore +"</span>/10</p></br><h2>From which game is this picture?</h2><img id='gamePic' src='images/Game" + number + ".jpg' alt='Gameplay picture'></img><br><input type='text' id='GameName'><br></input><button onclick='NextGame(false)'>Submit</button>"
}
