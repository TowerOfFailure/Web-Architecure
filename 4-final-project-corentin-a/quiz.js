
var currentScore = 0;
var numberOfQuestion = 0; // from 0 to 10
var numbers  = [];
var number = Math.floor(Math.random()*20)+1;//This is just an example of a value
var ids = [];
var images = [];

fetch('./ids',{method:"POST"}).then((res)=>res.json()).then((result) => {console.log(result); ids = result;});
fetch("./pics",{method:"POST"}).then((res)=>res.json()).then((result) => {console.log(result); images = result});

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
      console.log(currentScore);
      document.getElementById("QuizZone").innerHTML = "<p><span class='score'>"+ currentScore +"</span>/10</p></br><h2>From which game is this picture?</h2><img id='gamePic' src='"+images[number]+"' alt='Gameplay picture'></img><br><input type='text' id='GameName'><br></input><button onclick='NextGame(false)'>Submit</button>"

      numberOfQuestion++;

      if(numberOfQuestion==10){
        //Go to the results page
        window.localStorage.setItem("score",currentScore);
        fetch("./result", {method:"POST",body:JSON.stringify({name:localStorage.getItem("name"),score:currentScore})});
        window.location.href = "./result"
      }
    });
  }
  while(numbers.includes(number)){
    number = ids[Math.floor(Math.random()*ids.length)];
  }
  numbers.push(number);
  document.getElementById("QuizZone").innerHTML = "<p><span class='score'>"+ currentScore +"</span>/10</p></br><h2>From which game is this picture?</h2><img id='gamePic' src='"+images[number]+"' alt='Gameplay picture'></img><br><input type='text' id='GameName'><br></input><button onclick='NextGame(false)'>Submit</button>"
}
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
    NextGame(numbers.length==0);
  }
})
