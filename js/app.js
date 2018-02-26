// Variable declaration
var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
var openCards = [];
var moveNum = 0;
var matchedPairs = 0;
var clickable = true;
var starRate = 3;
var timer = 0;
var startTime;
var playTime;
timerRunning = false;
var timeObj;

// Adds stars to page
function starPop() {
  for (i = 1; i < 4; i++) {
    $('.stars').append('<li><i id="star' + i + '" class="fa fa-star"></i></li>');
  }
}

function beginTimer() {
  // Executes every second and displays how much time has passed
  startTime = new Date().getTime();
  timerRunning = true;
  timeObj = setInterval(function() {
    void(document.getElementById("timer").innerHTML = '   Timer: ' + Math.round((new Date().getTime() - startTime) / 1000) + 's');
  }, 1000);
}

// Shuffles cards and populates deck
$(document).ready(function() {
  shuffle(cards);
  populateDeck();
  starPop();
});

// Loops through cards array and populates ul element with cards
function populateDeck() {
  for (i = 0; i < cards.length; i++) {
    var addCard = '<li class="card"><i class="' + cards[i] + '"></i></li>';
    $('.deck').append(addCard);
  }
}

// Event listener for ul items, excuted some code only when clickable is true
$('ul').on('click', 'li', function(event) {
  if (clickable) {
    var activeCard = $(event.target);
    showCard(activeCard);
    checkCards(activeCard);
  }
  if (timerRunning === false) {
    beginTimer();
  }
});

// When restart button clicked, restart() is called
$('.restart').on('click', 'i', function() {
  restart();
});

// Resets the game as if page were refreshed
function restart() {
  $('.deck').empty();
  moveNum = 0;
  void(document.getElementById("moves").innerHTML = moveNum);
  $('.stars').empty();
  starPop();
  matchedPairs = 0;
  clickable = true;
  openCards = [];
  shuffle(cards);
  populateDeck();
  starRate = 3;
  timer = 0;
  void(document.getElementById("timer").innerHTML = ' Timer: 0s');
  playTime = 0;
  timerRunning = false;
  clearInterval(timeObj);
}

// Disables clicks on object and adds two classes
function showCard(activeCard) {
  $(activeCard).css("pointer-events", "none");
  activeCard.addClass('open show');
}

/* Checks if another card is already open. If there is, it disables clicks on
all other cards and further checks if the two cards match. If they match,
matchCards() is called and clicks are allowed once again. If they do not match,
clicks are allowed and noMatch() is called after certain time. However if there no
cards already open, the clicked card is added to array openCards
*/
function checkCards(activeCard) {
  if (openCards.length > 0) {
    clickable = false;
    if (activeCard.children().attr('class') === openCards[0].children().attr('class')) {
      matchCards(activeCard, openCards[0]);
      clickable = true;
    } else {
      setTimeout(function() {
        clickable = true;
        noMatch(activeCard, openCards[0]);
      }, 1250);
    }
  } else {
    addCard(activeCard);
  }
}

// Adds param 'card' to array
function addCard(card) {
  openCards.push(card);
}

/* Receives two params and adds classes to them, inc. matchedPairs, resets
openCards arr. calls move() function and checks if player has won
*/
function matchCards(cardOne, cardTwo) {
  cardOne.addClass('match');
  cardTwo.addClass('match');
  matchedPairs += 1;
  openCards = [];
  move();
  setTimeout(function() {
    win();
  }, 500);
}

/* Receives two objects as params and removes classes from them and re-enables
clicks, resets openCards arr. and calls move()
*/
function noMatch(cardOne, cardTwo) {
  cardOne.removeClass('show open');
  cardTwo.removeClass('show open');
  $(cardOne).css("pointer-events", "auto");
  $(cardTwo).css("pointer-events", "auto");
  openCards = [];
  move();
}

// Checks how many moves have been completed and displays certain amount of stars
function move() {
  moveNum += 1;
  if (moveNum > 15 && moveNum <= 20) {
    $('#star3').removeClass('fa fa-star');
    if (starRate === 3) {
      starRate -= 1;
    }
  } else if (moveNum > 20 && moveNum <= 25) {
    $('#star2').removeClass('fa fa-star');
    if (starRate === 2) {
      starRate -= 1;
    }
  }
  void(document.getElementById("moves").innerHTML = moveNum); // Displays moveNum
}

// Checks if all cards have been matched -> Win message and resets deck
function win() {
  if (matchedPairs === 8) {
    playTime = Math.round((new Date().getTime() - startTime) / 1000);
    alert('Congratulatons! You win! Star rating: ' + starRate + ' | Time: ' + playTime + 's');
    clearInterval(timeObj);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
