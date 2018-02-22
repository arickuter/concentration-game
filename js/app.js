/*
 * Display the cards on the page
 *   - shuffle the list of cards using the "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
var openCards = [];

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
  showCard();

});

function showCard() {
  let card = $(event.target);
  $(card).css("pointer-events", "none");
  card.addClass('show open');
  checkCard(card);
}

function checkCard(card) {
  if (openCards.length > 0) {
    /* If card already selected */
    var oldCard = $("." + openCards[0].substring(0,2) + "." + openCards[0].substring(3, openCards[0].length));
    if (card.children().attr('class') === openCards[0]) {
      card.addClass('match');
      oldCard.parent('li').addClass('match');
      openCards = [];
    }else{
      openCards = [];
      // Hot sleep for 2 seconds
      start = new Date().getTime();
      while (new Date().getTime() < start + 2000) {}

      oldCard.parent('li').removeClass('show open');
      card.removeClass('show open');
      $(oldCard.parent('li')).css("pointer-events", "auto");
      $(card).css("pointer-events", "auto");
    }
  /* If no card selected */
  }else{
    openCards.push(card.children().attr('class'));
  }
}
