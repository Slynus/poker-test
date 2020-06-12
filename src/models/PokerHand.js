const PokerCard = require('./PokerCard');

class PokerHand {

    constructor(handString) {

        // Check for falsy values
        if (!handString) { throw new Error('No hand provided'); }
        if (typeof handString !== 'string') { throw new TypeError(); }

        let splitedCards = handString.split(' ');

        if (splitedCards.length > 5) { throw new Error('Too many cards'); }
        if (splitedCards.length < 5) { throw new Error('Too few cards'); }

        this.cards = splitedCards.map((card) => {
            return new PokerCard(card);
        });

        if (!this.isHandLegal()) { throw new Error('Hand is illegal'); }
    }

    compareWith(hand) {
        if (hand instanceof PokerHand) {
            console.log('can compare');
        } else {
            throw new Error('Not a Poker Hand');
        }


        /**
         * evaluate rank A
         * evaluate rank B
         * 
         * if equality
         * compare for rank X
         */
    }

    isHandLegal() {
        const someCardIdentical = this.cards.some(card => {
            // On récupère les cartes identiques
            let sameCards = this.cards.filter(currentCard => currentCard.isSameCard(card));

            // Si il y en a plus qu'une cela signifie qu'il y a des doublons (ou plus)
            if (sameCards.length > 1) { return true; }
        });

        return !someCardIdentical;
    }

    evaluateRank()
}


module.exports = PokerHand;
