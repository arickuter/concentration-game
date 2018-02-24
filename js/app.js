// Variable declaration
var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
var openCards = [];
var moveNum = 0;
var matchedPairs = 0;
var clickable = true;
var star = '<li><i class="fa fa-star"></i></li>';
var fullStars = star + star + star;

// Shuffles cards and populates deck
$(document).ready(function() {
  shuffle(cards);
  populateDeck();
});

// Loops through cards array and populates ul element with cards
function populateDeck() {
  for (i = 0; i < cards.length; i++) {
    var addCard = '<li class="card"><i class="' + cards[i] + '"></i></li>';
    $('.deck').append(addCard);
  }
}

// Event listener for ul items, excuted some code only when clickable is true
$('ul').on('click', 'li', function() {
  if (clickable === true) {
    var activeCard = $(event.target);
    showCard(activeCard);
    checkCards(activeCard);
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
  $('.stars').append(fullStars);
  matchedPairs = 0;
  clickable = true;
  openCards = [];
  shuffle(cards);
  populateDeck();
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
    $('#three').removeClass('fa fa-star');
  } else if (moveNum > 20 && moveNum <= 25) {
    $('#two').removeClass('fa fa-star');
  } else if (moveNum > 25) {
    $('#one').removeClass('fa fa-star');
  }
  void(document.getElementById("moves").innerHTML = moveNum); // Displays moveNum
}

// Checks if all cards have been matched -> Win message and resets deck
function win() {
  if (matchedPairs === 8) {
    alert('\t\t\t\tCongratulatons! You win!');
    restart();
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
