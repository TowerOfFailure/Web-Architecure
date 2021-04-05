

function AddGame(){
  name = document.getElementById("nameNewGame").value;
  image = document.getElementById("imageNewGame").value;
  if(name and image){
    document.getElementById("incorrect").style.visibility = "hidden";
  }
  else{
    //One of the required fields was not filled
    document.getElementById("incorrect").style.visibility = "visible";
  }
}

function RemoveGame(id){
  fetch('./remove/'+id).then{
    window.location.href = "./admin"
  }
}

document.getElementById("incorrect").style.visibility = "hidden";
fetch("./games",{method:"POST"}).then((res) => {
  const games = res;
  for(var i = 0 ; i<games.length;i++){
    document.getElementById("ListOfGames").innerHTML+="<li>" + games[i].nameGame + "<img src=" + games[i]. +"></img> <button onClick ='RemoveGame(" + games[i].id + ")'>Remove</button></li>"
  }
})
