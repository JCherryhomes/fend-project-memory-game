const Deck = function(deckElement) {
    var self = this;
    console.info('Creating Deck');

    self.openCards = [];
    self.cards = [];

    /**
     * Get the symbol from the provided card element.
     * @param {li.card} cardElement 
     */
    self.getSymbol = function(cardElement) {
        return cardElement.firstElementChild.classList[1];
    }

    /**
     * This method starts the game.
     * @param {li.card} cardElement 
     */
    self.run = function(cardElement) {
        self.showCard(cardElement);

        if (self.openCardsMatch(cardElement)) {
            self.hideCards();
            self.openCards.forEach(card => {
                card.classList.add('match');
            });

            self.openCards = [];
        }

        if (self.openCards.length >= 2) {
            setTimeout(() => {
                self.hideCards();
                self.openCards = [];
            }, 1500);
        }
    };

    /**
     * Check for two open cards and then check to see if they match.
     */
    self.openCardsMatch = function() {
        return self.openCards.length == 2 && self.checkForMatch();
    }
    
    /**
     * Adds the open and show classes to the provided card element.
     * @param {li.card} cardElement 
     */
    self.showCard = function(cardElement) {
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
    self.hideCards = function() {
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
    self.checkForMatch = function() {
        const firstSymbol = self.getSymbol(self.openCards[0]);
        const secondSymbol = self.getSymbol(self.openCards[1]);

        return firstSymbol === secondSymbol;
    }

    /**
     * Resets and shuffles the cards. Creates and adds the elements to the deck.
     */
    self.reset = function() {        
        self.openCards = [];
        const shuffledCards = self.shuffle(self.cards);
        
        self.cards = [];

        while (deckElement.firstChild) {
            deckElement.removeChild(deckElement.firstChild);
        }

        const container = document.getElementsByClassName('container')[0];
        
        // Remove the deck element
        for (var temp in container.children) {
            const node = container.children[temp];
            if (node.className === 'deck') {
                container.removeChild(node);
            }
        }

        // Recreate the deck element
        deckElement = document.createElement('ul');
        deckElement.classList.add('deck');

        // Build the list of cards and add them to the deck
        for (var index in shuffledCards) {
            const symbol = shuffledCards[index];
            const li = document.createElement('li');
            const span = document.createElement('span');

            li.classList.add('card');
            span.classList.add('fa');
            span.classList.add(symbol);

            li.appendChild(span);
            deckElement.appendChild(li);
            self.cards.push(symbol);
        }

        // Append the deck to the container. We remove and add the deck to limit reflow.
        container.appendChild(deckElement);

        // Add click handler to the newly created deck
        self.addCardClickHandler();
        console.log(container);
    }

    /**
     * Shuffles the provided array.
     * Source: Shuffle function from http://stackoverflow.com/a/2450976
     */
    self.shuffle = function(array) {
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

    self.addCardClickHandler = function() {
        document
            .getElementsByClassName('deck')[0]
            .addEventListener('click', (event) => {
                if (event.target.className === 'card') {
                    const card = event.target;
                    deck.run(card);
                }
            });
    };

    self.addResetClickHandler = function() {
        document
            .getElementsByClassName('restart')[0]
            .addEventListener('click', (event) => {
                container.removeChild(deckElement);
                deck.reset();
            });
    };

    /**
     * Store the symbols in the order they appear on the page.
     */
    for (var index in deckElement.children) {
        var card = deckElement.children[index];
        if (card.firstElementChild) {
            self.cards.push(self.getSymbol(card));
        }
    }

    /**
     * Provides access to the run and reset methods.
     */
    return {
        run: self.run,
        reset: self.reset,
        addResetClickHandler: self.addResetClickHandler,
        addCardClickHandler: self.addCardClickHandler
    };
};