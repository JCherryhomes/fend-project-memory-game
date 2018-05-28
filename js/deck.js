const Deck = function(deckElement) {
    console.info('Creating Deck');
    var matchedCards = [];
    var openCards = [];
    var cards = deckElement;
    var self = this;

    /**
     * This method starts the game.
     * @param {li.card} cardElement 
     */
    function run(cardElement) {
        self.showCard(cardElement);

        if (self.openCardsMatch(cardElement)) {
            self.hideCards();
            self.openCards.forEach(card => {
                card.classList.add('match');
                self.matchedCards.push(card);
            });

            self.openCards = [];
        }

        if (self.openCards.length >= 2) {
            setTimeout(() => {
                self.hideCards();
                self.openCards = [];
            }, 1500);
        }
    }

    /**
     * Check for two open cards and then check to see if they match.
     */
    function openCardsMatch() {
        return self.openCards.length == 2 && self.checkForMatch();
    }

    /**
     * Get the symbol from the provided card element.
     * @param {li.card} cardElement 
     */
    function getSymbol (cardElement) {
        return cardElement.firstElementChild.classList[1];
    }
    
    /**
     * Adds the open and show classes to the provided card element.
     * @param {li.card} cardElement 
     */
    function showCard (cardElement) {
        if (self.openCards.length < 2) {
            cardElement
                .classList
                .add('open');
            cardElement
                .classList
                .add('show');
        
            self.openCards.push(cardElement);
        }
    }
    
    /**
     * Removes the open and show classes from all of the open card elements.
     */
    function hideCards () {
        self.openCards.forEach(cardElement => {
            cardElement
                .classList
                .remove('open');
            cardElement
                .classList
                .remove('show');
        });
    }
    
    /**
     * Checks to see if the symbols match for the currently opened cards.
     */
    function checkForMatch () {
        const firstSymbol = self.getSymbol(self.openCards[0]);
        const secondSymbol = self.getSymbol(self.openCards[1]);

        return firstSymbol === secondSymbol;
    }

    /**
     * Resets and shuffles the cards.
     */
    function reset () {        
        self.matchedCards = [];
        self.openCards = [];
        console.log('Cards', self.cards.children);

        const shuffledCards = self.shuffle(self.cards.children);
        console.log('Temp Deck', shuffledCards);
        
        while (self.cards.hasChildNodes()) {
            self.cards.removeChild(self.cards.lastChild);
        }

        for (var index in shuffledCards) {
            const card = shuffledCards[index];
            console.log('card', card);

            card.classList.remove('show');
            card.classList.remove('open');
            card.classList.remove('match');

            self.cards.push(card);
        }
    }

    /**
     * Shuffles the provided array.
     * Source: Shuffle function from http://stackoverflow.com/a/2450976
     */
    function shuffle (array) {
        var currentIndex = array.length,
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
    }

    /**
     * Provides access to the run and reset methods.
     */
    return {
        run: self.run,
        reset: self.reset
    };
};