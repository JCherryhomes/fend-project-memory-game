class Deck {
    
    constructor(container, deckElement, resetButton, starsElement, movesElement, stopwatch) {
        this.deckElement = deckElement;
        this.stopwatch = stopwatch;
        this.openCards = [];
        this.cards = [];
        this.attempts = 0;
        this.matchCount = 0;
        this.rating = 3;

        this.addCardClickHandler();
        this.addResetClickHandler();

        /**
         * Store the symbols in the order they appear on the page.
         */
        for (let index in this.deckElement.children) {
            let card = this.deckElement.children[index];
            if (card.firstElementChild) {
                this.cards.push(this.getSymbol(card));
            }
        }

        this.possibleMatchCount = (this.cards.length / 2);
    
        // Shuffle the cards so the games starts different every time
        this.reset();
    }

    /**
     * Get the symbol from the provided card element.
     * @param {li.card} cardElement 
     */
    getSymbol(cardElement) {
        return cardElement.firstElementChild.classList[1];
    }

    /**
     * This method starts the game.
     * @param {li.card} cardElement 
     */
    run(cardElement) {
        // Attempts should increase 1 for every 2 cards clicked
        this.attempts += .5;

        this.showCard(cardElement);

        if (this.openCardsMatch()) {
            this.markMatchedCards();
            this.matchCount++;
        }

        if (this.openCards.length >= 2) {
            this.resetUnmatchedCards();
        }

        this.updateRating();
        this.updateMoves();
        
        if (this.possibleMatchCount === this.matchCount) {
            this.finish();
        }
    };

    finish() {
        this.stopwatch.stop();
        const message = 'You performed ' + this.attempts + 
            ' moves in ' + this.stopwatch.results() + ' seconds. You earned ' + 
            this.rating + ' star(s)! Play again?';

        if (window.confirm(message)) {
            this.stopwatch.reset();
            this.reset();
        }
    };

    updateMoves() {
        const roundedAttempts = Math.floor(this.attempts);

        if (roundedAttempts > 0) {
            movesElement.innerHTML = roundedAttempts > 1 ?
                roundedAttempts + ' Moves' :
                '1 Move';
        }
    };

    updateRating() {
        const expert = this.possibleMatchCount + 1;
        const intermediate = this.possibleMatchCount * 2;
        const attemptCount = Math.floor(this.attempts);

        this.rating = attemptCount <= expert ? 3 : 
            attemptCount <= intermediate ? 2 : 
            1;

        for (let index = 0; index < 3; index++) {
            const star = starsElement.children[index].children[0];
            star.classList.remove('highlight');
        }

        for (let index = 0; index < this.rating; index++) {
            const star = starsElement.children[index].children[0];
            star.classList.add('highlight');
        }
    };

    /**
     * If there are two open cards, pause before hiding them
     */
    resetUnmatchedCards(){
        setTimeout(() => {
            this.hideCards();
            this.openCards = [];
        }, 500);
    };

    markMatchedCards() {
        this.hideCards();
        this.openCards.forEach(card => {
            card.classList.add('match');
        });

        this.openCards = [];
    };

    /**
     * Check for two open cards and then check to see if they match.
     */
    openCardsMatch() {
        return this.openCards.length == 2 && this.checkForMatch();
    };
    
    /**
     * Adds the open and show classes to the provided card element.
     * @param {li.card} cardElement 
     */
    showCard(cardElement) {
        if (this.openCards.length < 2) {
            cardElement
                .classList
                .add('open');
            cardElement
                .classList
                .add('show');
        
            this.openCards.push(cardElement);
        }
    };
    
    /**
     * Removes the open and show classes from all of the open card elements.
     */
    hideCards() {
        this.openCards.forEach(cardElement => {
            cardElement
                .classList
                .remove('open');
            cardElement
                .classList
                .remove('show');
        });
    };
    
    /**
     * Checks to see if the symbols match for the currently opened cards.
     */
    checkForMatch() {
        const firstSymbol = this.getSymbol(this.openCards[0]);
        const secondSymbol = this.getSymbol(this.openCards[1]);

        return firstSymbol === secondSymbol;
    };

    /**
     * Resets and shuffles the cards. Creates and adds the elements to the deck.
     */
    reset() {        
        this.openCards = [];
        const shuffledCards = this.shuffle(this.cards);
        
        this.cards = [];

        while (this.deckElement.firstChild) {
            this.deckElement.removeChild(this.deckElement.firstChild);
        }
        
        // Remove the current deck element
        for (let index = 0; index < container.children.length; index++) {
            const node = container.children[index];

            if (node.className === 'deck') {
                container.removeChild(node);
            }
        }

        // Build a new deck element
        this.deckElement = document.createElement('ul');
        this.deckElement.classList.add('deck');

        // Build the list of cards and add them to the deck
        for (let index in shuffledCards) {
            const symbol = shuffledCards[index];
            const li = document.createElement('li');
            const span = document.createElement('span');

            li.classList.add('card');
            span.classList.add('fa');
            span.classList.add(symbol);

            li.appendChild(span);
            this.deckElement.appendChild(li);
            this.cards.push(symbol);
        }

        // Append the deck to the container. We remove and add the deck to limit reflow.
        container.appendChild(this.deckElement);

        // Add click handler to the newly created deck
        this.addCardClickHandler();

        this.matchCount = 0;
        this.attempts = 0;
        this.rating = 3;

        movesElement.innerHTML = '';
        this.updateRating();
        this.stopwatch.start();
    };

    /**
     * Shuffles the provided array.
     * Source: Shuffle function from http://stackoverflow.com/a/2450976
     */
    shuffle(array) {
        let currentIndex = array.length,
            temporaryValue = 0,
            randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    /**
     * Add a click event handler to the deck element.
     */
    addCardClickHandler() {
        this.deckElement.addEventListener('click', (event) => {
            if (event.target.className === 'card') {
                const card = event.target;
                deck.run(card);
            }
        });
    };

    /**
     * Add a click event handler to the reset button.
     */
    addResetClickHandler() {
        resetButton.addEventListener('click', (event) => {
            deck.reset();
        });
    };
};