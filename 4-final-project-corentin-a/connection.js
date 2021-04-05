function Connect(){
  /*
  var name = document.getElementById("pseudo").value;
  //var password = document.getElementById("password").value;
  fetch("/connection", {
    method:"POST",
    body: JSON.stringify({name:name})
  }).then((result) => {
    if(result ==-1){
      //incorrect password
      document.getElementById("password").value="";
      alert("wrong password");
    }
    else{
      if(result==0){
        window.localStorage.setItem("level",1);
      }
      else{
        window.localStorage.setItem("level",result);
      }
      window.localStorage.setItem("user",name);
      window.location.href = "./quiz";
    }
  });*/
  var name = document.getElementById("pseudo").value;
  window.localStorage.setItem("user",name);
  window.location.href = "./quiz";
}
