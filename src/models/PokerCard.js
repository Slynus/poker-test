const possibleValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const possibleSuits = ['S', 'H', 'D', 'C'];

class PokerCard {

    constructor(cardString) {

        // Check for falsy values
        if (!cardString) { throw new Error('No Card provided'); }
        if (typeof cardString !== 'string') { throw new TypeError(); }

        if (cardString.length !== 2) { throw new Error('Bad Card Syntax'); }
        if (!possibleValues.includes(cardString[0]) || !possibleSuits.includes(cardString[1])) { throw new Error('Card not existing'); }

        this.card = {
            value: cardString[0],
            suit: cardString[1]
        };

    }

}

module.exports = PokerCard;
