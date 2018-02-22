/*
 * Display the cards on the page
 *   - shuffle the list of cards using the "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

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
  card.addClass('show open');

}
