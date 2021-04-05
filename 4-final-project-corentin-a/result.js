var score = window.localStorage.getItem("score");

if(!score){
  score = 0;
}

document.getElementById("score").innerHTML= score + "/10";
