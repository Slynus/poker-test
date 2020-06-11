// const PokerCard = require('./PokerCard');

class PokerHand {

    constructor(handString) {

        // Check for falsy values
        if (!handString) { throw new Error("No hand provided"); }
        if (typeof handString !== 'string') { throw new TypeError(); }

        let splitedCards = handString.split(' ');
        this.cards = splitedCards;

        // this.cards = splitedCards.map((card) => {
        //     return new PokerCard(card);
        // });

        if (this.cards.length > 5) { throw new Error("Too many cards"); }
        if (this.cards.length < 5) { throw new Error("Too few cards"); }

    }



    compareWith(hand) {
        if (hand instanceof PokerHand) {
            console.log("can compare");
        } else {
            throw new Error("Not a Poker Hand");
        }
    }


}


module.exports = PokerHand;
