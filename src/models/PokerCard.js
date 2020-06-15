const possibleValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const possibleSuits = ['S', 'H', 'D', 'C'];

class PokerCard {

    constructor(cardString) {

        // Check pour les valeur falsy
        if (!cardString) { throw new Error('No Card provided'); }
        if (typeof cardString !== 'string') { throw new TypeError(); }

        if (cardString.length !== 2) { throw new Error('Bad Card Syntax'); }
        if (!possibleValues.includes(cardString[0]) || !possibleSuits.includes(cardString[1])) { throw new Error('Card not existing'); }

        this.value = cardString[0];
        this.suit = cardString[1];
    }

    // Compare une instance de carte avec une autre
    compareWith(card) {
        if (!(card instanceof PokerCard)) { throw new Error('Not a Poker Card'); }

        if (this.value === card.value) { return 3; }

        if (possibleValues.indexOf(this.value) > possibleValues.indexOf(card.value)) {
            return 1;
        }
        else {
            return 2;
        }
    }

    // Verifie si la carte est indentique (valeur et couleur)
    isSameCard(card) {
        if (!(card instanceof PokerCard)) { throw new Error('Not a Poker Card'); }

        if (this.value === card.value && this.suit === card.suit) {
            return true;
        } else {
            return false;
        }
    }

    // Donne la valeur indexée de la carte
    get valueRank() {
        return possibleValues.indexOf(this.value);
    }
}

module.exports = PokerCard;
