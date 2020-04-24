// Eventlistener calling the init function when the DOM-content is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
  init();
});

var sum = 0
var randomNr = placeTreassure();

// Calling functions required for the game.
function init() {
  initChests();
  initRefreshButton();
  getImageFromPexels();
  initChestEventListeners();
  initScoreBoard();
}

// Initializing the 3 chests.
function initChests() {
  chests = document.getElementById('chests');

  chest1 = document.createElement('img');
  chest1.src = 'images/chest-closed.png';
  chests.appendChild(chest1);
  chest1.style.margin = '10px';

  chest2 = document.createElement('img');
  chest2.src = 'images/chest-closed.png';
  chests.appendChild(chest2);
  chest2.style.margin = '10px';

  chest3 = document.createElement('img');
  chest3.src = 'images/chest-closed.png';
  chests.appendChild(chest3);
  chest3.style.margin = '10px';
}

// Initializing the scoreboard and using original variable "sum".
function initScoreBoard() {
  score = document.createElement('p');
  score.innerText = 'Score: ' + sum;
  document.getElementById('game-wrapper').appendChild(score);
  score.style.textAlign = 'center';
  score.style.color = 'white';
  score.style.fontSize = '30px';
  score.id = 'score';
}

// Initializing the refresh button.
function initRefreshButton() {
  myButton = document.getElementById('refresh-button');
}

// Initializing the eventlisteners.
function initChestEventListeners() {
  chest1.addEventListener('click', chestClicked);
  chest2.addEventListener('click', chestClicked);
  chest3.addEventListener('click', chestClicked);
  myButton.addEventListener('click', refresh);
}

/* 
Randomly placing the "treasure" and returning the result of the Math.random in the variable
randomNr to global scope.
*/
function placeTreassure() {
  randomNr = (Math.round(Math.random() * (3 - 1)));
  console.log(randomNr);
  return randomNr;
}

// Getting 10 pictures from Pexels API with search query treasure.
function getImageFromPexels() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&per_page=10&page=1', true);
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001fda9591fba6f4168a9275e9e1a47acaa');
  xhr.addEventListener('load', function () {
    if (this.readyState == 4 && this.status == 200) {
      pictures = JSON.parse(this.response);
    }
  });
  xhr.send();
}

/*
Listening to which eventlistener that has been triggered and altering its image src,
calling removeChestEvents and increase the sum if the right chest has been selected 
and get 1 random from Math.random.
*/
function chestClicked(e) {
  randomPicture = Math.round(Math.random() * pictures.photos.length);
  picture = pictures.photos[randomPicture].src.small;
  e.target.src = 'images/chest-open.png';
  removeChestEvents();
  if (e.target == chest1 && randomNr == 0) {
    e.target.src = picture;
    sum += 5;
  }
  if (e.target == chest2 && randomNr == 1) {
    e.target.src = picture;
    sum += 5;
  }
  if (e.target == chest3 && randomNr == 2) {
    e.target.src = picture;
    sum += 5;
  }
  score.innerText = 'Score: ' + sum;
}

//Remove event listeners from chests.
function removeChestEvents() {
  chest1.removeEventListener('click', chestClicked);
  chest2.removeEventListener('click', chestClicked);
  chest3.removeEventListener('click', chestClicked);
}

/* 
Initializing the chests eventlisteners again, callin the function that place the treasure in a 
new random chest and altering chests image src to closed again.
*/
function refresh() {
  initChestEventListeners();
  placeTreassure();

  chest1.src = 'images/chest-closed.png';
  chest2.src = 'images/chest-closed.png';
  chest3.src = 'images/chest-closed.png';
}