

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

document.getElementById("incorrect").style.visibility = "hidden";
