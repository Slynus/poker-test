const PokerCard = require('./PokerCard');
const pcUtils = require('../utils/PokerCardUtils');

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

        if (this.isHandIllegal()) { throw new Error('Hand is illegal'); }
    }

    // Indique si la main possède des doublons
    isHandIllegal() {
        const someCardIdentical = this.cards.some(card => {
            // On récupère les cartes identiques
            let sameCards = this.cards.filter(currentCard => currentCard.isSameCard(card));

            // Si il y en a plus qu'une cela signifie qu'il y a des doublons (ou plus)
            if (sameCards.length > 1) { return true; }
        });

        return someCardIdentical;
    }

    // Compare la main avec une autre main
    compareWith(hand) {
        if (hand instanceof PokerHand) {
            const handARankArray = PokerHand.evaluateRank(this.cards);
            const handBRankArray = PokerHand.evaluateRank(hand.cards);
            return PokerHand.compareRanks(handARankArray, handBRankArray);
        } else {
            throw new Error('Not a Poker Hand');
        }
    }

    toString() {
        return this.cards.map(c => `${c.value}${c.suit}`).join('-');
    }

    // Defini le meilleur rang entre deux rangs.
    static compareRanks(rankArrayA, rankArrayB) {
        // On parcours le rankArray pour trouver la meilleure main.
        for (let index = 0; index < rankArrayA.length; index++) {
            if (rankArrayA[index] > rankArrayB[index]) {
                return 1;
            } else if (rankArrayA[index] < rankArrayB[index]) {
                return 2;
            }
        }
        return 3;
    }

    /**
     * Construit un tableau qui réprésente la valeur de la main
     * Le premier indice est la force du type de main, plus la valeur de l'indice est fort plus la main est forte.
     * Les indices suivants servent en cas d'égalité, on les regardera, et on continuras a avancer dans les indices en cas d'égalités
     * @param {Array[PokerCard]} hand 
     * @returns {Array[Number]}
     */
    static evaluateRank(hand) {
        return pcUtils.getStraightFlushRank(hand)
            || pcUtils.get4OfKindRank(hand)
            || pcUtils.getFullHouseRank(hand)
            || pcUtils.getFlushRank(hand)
            || pcUtils.getStraightRank(hand)
            || pcUtils.get3OfKindRank(hand)
            || pcUtils.getTwoPairRank(hand)
            || pcUtils.getPairRank(hand)
            || pcUtils.getBestCardRank(hand);
    }
}




module.exports = PokerHand;
