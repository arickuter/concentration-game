/*
 * Display the cards on the page
 *   - shuffle the list of cards using the "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
var openCards = [];
var moveNum = 0;
var matchedPairs = 0;
var clickable = true;

$(document).ready(function() {
  shuffle(cards);
  for (i = 0; i < cards.length; i++) {
    var addCard = '<li class="card"><i class="' + cards[i] + '"></i></li>';
    $('.deck').append(addCard);
  }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$('ul').on('click', 'li', function() {
  if (clickable === true) {
    var activeCard = $(event.target);
    showCard(activeCard);
    checkCards(activeCard);
  }
});

$('.restart').on('click', 'i', function() {
  location.reload(true);
});

function showCard(activeCard) {
  $(activeCard).css("pointer-events", "none");
  activeCard.addClass('open show');
}

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

function addCard(card) {
  openCards.push(card);
}

function matchCards(cardOne, cardTwo) {
  cardOne.addClass('match');
  cardTwo.addClass('match');
  matchedPairs += 1;
  openCards = [];
  setTimeout(function() {
    win();
  }, 1250);
}

function noMatch(cardOne, cardTwo) {
  cardOne.removeClass('show open');
  cardTwo.removeClass('show open');
  $(cardOne).css("pointer-events", "auto");
  $(cardTwo).css("pointer-events", "auto");
  openCards = [];
  move();
}

function move() {
  moveNum += 1;
  void(document.getElementById("moves").innerHTML = moveNum);
}

function win() {
  if (matchedPairs === 8) {
    alert('Congratulatons! You have won in ' + moveNum + ' moves!');
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
