"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  const max = parseInt($maxUsr.value);
  if(max<0 || isNaN(max)) {
    $output.textContent = "Veuillez entrer un nombre positif";
    return;
  }
  secretNumber = Math.floor(Math.random() * max) + 1;
  maxGuesses = Math.ceil(Math.log(max)) + 1;
  nbGuesses = 0;
  $output.textContent = "Nouvelle partie commencée !";
  $guessBtn.disabled = false;
  $numUsr.value = "";
  $output.textContent = `Trouvez le nombre entre 1 et ${max}. Vous avez ${maxGuesses} essais pour le deviner. Bonne chance !`;
  $numUsr.focus();
}

function Game(){
  const guess = parseInt($numUsr.value);
  if(isNaN(guess) || guess < 0 || guess > parseInt($maxUsr.value)) {
    $output.textContent = `Veuillez entrer un nombre valide, compris entre 0 et ${parseInt($maxUsr.value)}`;
    return;
  }
  nbGuesses++;
  if(nbGuesses >= maxGuesses) {
    $output.textContent = `Vous avez épuisé vos ${maxGuesses} essais ! Le nombre secret était ${secretNumber}.`;
    $guessBtn.disabled = true;
    return;
  }
  if(guess === secretNumber) {
    $output.textContent = `Félicitations ! Vous avez trouvé le nombre secret ${secretNumber} en ${nbGuesses} ${nbGuesses > 1 ? "essais" : "essai"}.`;
    $guessBtn.disabled = true;
  }
  else if(guess < secretNumber) {
    $output.textContent = `Trop bas !\nVotre essai : ${guess} (${nbGuesses}/${maxGuesses})`;
    $numUsr.value = "";
    $numUsr.focus();
  }
  else {
    $output.textContent = `Trop haut !\nVotre essai : ${guess} (${nbGuesses}/${maxGuesses})`;
    $numUsr.value = "";
    $numUsr.focus();
  }

}

$startBtn.addEventListener("click", launchGame);
$guessBtn.addEventListener("click", Game);
$maxUsr.addEventListener("keydown", function(evt) {
  if(evt.key === "Enter") {
    evt.preventDefault();
    launchGame(evt);
  }
});
$numUsr.addEventListener("keydown", function(evt) {
  if(evt.key === "Enter") {
    evt.preventDefault();
    Game(evt);
  }
});



function addCow(evt) {
  console.debug(evt.pageX, evt.pageY);
  const cow = document.createElement("img");
  cow.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  cow.alt = "Image de vache";
  cow.className = "cow";
  const size = 50;
  cow.style.left = `${evt.pageX - size/2}px`;
  cow.style.top = `${evt.pageY - size/2}px`;
  const rotate = Math.floor(Math.random() * 360);
  cow.style.transform = `rotate(${rotate}deg)`;
  document.body.appendChild(cow);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
    $cowBtn.textContent = "Vache Inactive !";
  } else {
    document.onmousedown = addCow;
    $cowBtn.textContent = "Vache Active !!!!!!!!!!!!";
  }
}

$cowBtn.addEventListener("click", toggleCow);
$cowBtn.textContent = "Vache Inactive !";

