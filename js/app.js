/*
 * Create a list that holds all of your cards
 */
const deckElement = document.getElementsByClassName('deck')[0];
console.log(deckElement.hasChildNodes());
const deck = new Deck(deckElement);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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



document
    .getElementsByClassName('deck')[0]
    .addEventListener('click', (event) => {
        if (event.target.className === 'card') {
            const card = event.target;
            deck.run(card);
        }
    });

document
    .getElementsByClassName('restart')[0]
    .addEventListener('click', (event) => {
        console.info('Reset clicked');
        deck.reset();
        console.info(deck.cards);
    });
