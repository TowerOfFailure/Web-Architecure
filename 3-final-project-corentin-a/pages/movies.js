//I added this code to the site as a webpage so that the HTML could be dynamic

const urlStartMovie='https://api.themoviedb.org/3/search/movie?api_key=763f19f3fefcb6a88b9b2286cfc6fd9c&query=';
const urlEndMovie='&page=1';
const urlStartCast = 'https://api.themoviedb.org/3/search/person?api_key=763f19f3fefcb6a88b9b2286cfc6fd9c&query=';
const initId=431;//The ID of "Cube", the first move i'll take, as an example
var peopleMentionned = [];
var moviesMentionned = [];
var currentId = initId;
var currentCast = []
var currentCareer = []
var testingMovie = true

function OnSuccess(response){
  return response.json();
}

//For movies
function ReadOnSuccess(response) {
  id = response.results[0].id;
  result = "<div class='movie'><p>Name of the movie : " + response.results[0].title + "<p><img src = 'https://image.tmdb.org/t/p/original"+ response.results[0].poster_path +"' alt='Poster of the movie : " + response.results[0].title + "' width = '100'> Released : "+ response.results[0].release_date +"</p></div>";
  result += AddFormMovie();
  GetCast(id)
  if(document.getElementsByClassName("form").length !=0){
    document.getElementsByClassName("form")[document.getElementsByClassName("form").length - 1].innerHTML='';
  }
  document.getElementById("Document").innerHTML+= result;
  document.getElementById("error").style.visibility = "hidden";
  document.getElementById("already").style.visibility = "hidden";
}

function AddFormMovie(){
  return "<div class='form'><h3>Name 1 person that participated in the movie</h3><input type='text' id='CrewMember'></input><button onClick='CheckCrew()' accesskey='enter'>Submit</button><div class='error' id='already'>Sorry, but this person was already mentionned before.</div> <div class='error' id='error'>Sorry, but this person is not related to this movie.</div></div>"
}

function SeekMovie(nameOfMovie){
  testingMovie=true;
  document.getElementById('ToReplace').style.visibility="hidden";
  url = urlStartMovie + nameOfMovie + urlEndMovie;
  moviesMentionned.push(nameOfMovie);
  fetch(url).then(OnSuccess).then(ReadOnSuccess);
}

function CheckCrew(){
  let candidateCrew = document.getElementById("CrewMember").value.toLowerCase();
  if(currentCast.includes(candidateCrew)){
    //if the person is in the movie but was already mentionned
    if(peopleMentionned.includes(candidateCrew)){
      document.getElementById("error").style.visibility = "hidden";
      document.getElementById("already").style.visibility = "visible";
    }
    //If the person was not mentionned before and is in the movie
    else{
      document.getElementById("error").style.visibility = "hidden";
      document.getElementById("already").style.visibility = "hidden";
      //Load the cast member part of the quiz
      SeekCareer(candidateCrew);
    }

  }
  //If the person is not in the movie
  else{
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("already").style.visibility = "hidden";
  }

}

function GetCast(id){
  url = "https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=763f19f3fefcb6a88b9b2286cfc6fd9c";
  fetch(url).then(OnSuccess).then(ImportCast)
}
function ImportCast(response){
  currentCast = [];
  for(var i=0;i<response.cast.length;i++){
    if(!currentCast.includes(response.cast[i].name.toLowerCase())){
      currentCast.push(response.cast[i].name.toLowerCase());
    }
  }
  //We want only the director as a possible staff member
  for(var i=0;i<response.crew.length;i++){
    if(!currentCast.includes(response.crew[i].name.toLowerCase())){
      if(response.crew[i].job=="Director"){
        currentCast.push(response.crew[i].name.toLowerCase());
      }
    }
  }
}

// For the movies
function AddFormCast(){
  return "<div class='form'><h3>Name 1 movie that this person participated in</h3><input type='text' id='MovieTest'></input><button onClick='CheckMovie()' accesskey='enter'>Submit</button><div class='error' id='already'>Sorry, but this movie was already mentionned before.</div> <div class='error' id='error'>Sorry, but this person is not related to this movie.</div></div>"
}

function SeekCareer(nameOfPerson){
  testingMovie=false;
  url = urlStartCast + nameOfPerson.replace(" ","%20");
  peopleMentionned.push(nameOfPerson);
  fetch(url).then(OnSuccess).then(ReadOnSuccessMovie);
}
var test;
function ReadOnSuccessMovie(response) {
  test = response;
  id = response.results[0].id;
  result = "<div class='actor'><p>Name " + response.results[0].name + "<p><img src = 'https://image.tmdb.org/t/p/original"+ response.results[0].profile_path +"' alt='image of " + response.results[0].name + "' width = '100'></p></div>";
  result += AddFormCast();
  if(document.getElementsByClassName("form").length != 0){
    document.getElementsByClassName("form")[document.getElementsByClassName("form").length -1].innerHTML='';
  }
  GetCareer(id)
  document.getElementById("Document").innerHTML+= result;
  document.getElementById("error").style.visibility = "hidden";
  document.getElementById("already").style.visibility = "hidden";
}

function CheckMovie(){
  let movietest = document.getElementById("MovieTest").value.toLowerCase();
  if(currentCareer.includes(movietest)){
    //If the person is in the movie but was already mentionned
    if(moviesMentionned.includes(movietest)){
      document.getElementById("error").style.visibility = "hidden";
      document.getElementById("already").style.visibility = "visible";
    }
    //If the person was not mentionned before and is in the movie
    else{
      document.getElementById("error").style.visibility = "hidden";
      document.getElementById("already").style.visibility = "hidden";
      //Load the cast member part of the quiz
      SeekMovie(movietest);
    }

  }
  //If the person is not in the movie
  else{
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("already").style.visibility = "hidden";
  }

}

function GetCareer(id){
  url = "https://api.themoviedb.org/3/person/"+id+"/combined_credits?api_key=763f19f3fefcb6a88b9b2286cfc6fd9c";
  fetch(url).then(OnSuccess).then(ImportCareer)
}

function ImportCareer(response){
  currentCareer = [];
  for(var i=0;i<response.cast.length;i++){
    if(response.cast[i].original_title && !currentCareer.includes(response.cast[i].original_title.toLowerCase())){
      currentCareer.push(response.cast[i].original_title.toLowerCase());
    }
  }
  for(var i=0;i<response.crew.length;i++){
    if(response.crew[i].original_title && !currentCareer.includes(response.crew[i].original_title.toLowerCase())){
      if(response.crew[i].job=="Director"){
        currentCareer.push(response.crew[i].original_title.toLowerCase());
      }
    }
  }
}

document.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
    if(testingMovie){
      CheckCrew();
    }
    else{
      CheckMovie();
    }
  }
})
