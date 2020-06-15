/**
 * Permet de flitrer certaines cartes d'une main
 * @param {*} hand la main filtrée
 * @param {*} cardsToRemove les cartes à supprimer de hand
 */
function filterCards(hand, cardsToRemove) {
    cardsToRemove.forEach(cToRemove => {
        hand = hand.filter(c => !c.isSameCard(cToRemove));
    });
    return hand;
}

// Trie les cartes par valeur indexée
function sortCards(cards) {
    if (!cards) { return null; }

    function compareCard(a, b) {
        if (a.valueRank > b.valueRank) { return 1; }
        if (a.valueRank < b.valueRank) { return -1; }
        return 0;
    }
    const rest = cards.sort(compareCard);
    return rest;
}

function getBestCard(cards) {
    if (!cards) { return null; }

    const best = cards.reduce((max, card) => {
        return card.valueRank > max.valueRank ? card : max;
    });

    return best;
}

function getBestCardRank(cards) {
    if (!cards) { return null; }

    const best = getBestCard(cards);

    return [0, best.valueRank];
}

// Ne retourne que les vraies paires (pas les brelans et les carrés)
function getPair(cards) {
    if (!cards) { return null; }

    let pairs = [];

    cards.forEach(card => {
        const sameValueCard = cards.filter(c => c.value === card.value);
        if (sameValueCard.length == 2) {
            pairs.push(sameValueCard);
            cards = cards.filter(c => !c.isSameCard(card));
        }
    });

    if (pairs.length < 1) { return null; }
    const bestPairCard = getBestCard(pairs.flat());

    const bestPair = pairs.filter(p => {
        if (p[0].value === bestPairCard.value) { return true; }
    }).flat();

    return bestPair;
}

function getPairRank(cards) {
    if (!cards) { return null; }

    const bestPair = getPair(cards);

    if (!bestPair) { return null; }

    const filteredCards = filterCards(cards, bestPair);
    const bestCard = getBestCard(filteredCards);

    return [1, bestPair[0].valueRank, bestCard.valueRank];
}

function getTwoPair(cards) {
    if (!cards) { return null; }

    const bestPair = getPair(cards);

    if (!bestPair) { return null; }

    const filteredCards = filterCards(cards, bestPair);
    const secondPair = getPair(filteredCards);

    if (!secondPair) { return null; }

    return [bestPair, secondPair];
}

function getTwoPairRank(cards) {
    if (!cards) { return null; }

    const twoPair = getTwoPair(cards);
    if (!twoPair) { return null; }
    const filteredCards = filterCards(cards, twoPair.flat());

    const bestCard = getBestCard(filteredCards);
    return [2, twoPair[0][0].valueRank, twoPair[1][0].valueRank, bestCard.valueRank];
}

function get3OfKind(cards) {
    if (!cards) { return null; }

    let threeOfKind = [];

    cards.forEach(card => {
        const sameValueCard = cards.filter(c => c.value === card.value);
        if (sameValueCard.length == 3) {
            threeOfKind = sameValueCard;
            cards = cards.filter(c => !c.isSameCard(card));
        }
    });

    if (threeOfKind.length < 1) { return null; }
    return threeOfKind;
}

function get3OfKindRank(cards) {
    if (!cards) { return null; }

    const threeOfKind = get3OfKind(cards);

    if (!threeOfKind) { return null; }

    const filteredCards = filterCards(cards, threeOfKind);
    const bestCard = getBestCard(filteredCards);

    return [3, threeOfKind[0].valueRank, bestCard.valueRank];
}

function isStraight(cards) {
    // Si les élements du tableau ne se suivent pas avec une différence de valeur de 1 alors ce n'est pas une suite.
    function isStraightInArray(arr) {
        for (let index = 1; index < arr.length; index++) {
            if (arr[index] - arr[index - 1] !== 1) { return false; }
        }
        return true;
    }

    if (!cards) { return false; }

    const sortedCards = sortCards(cards);

    const sortedCardsValues = sortedCards.map(c => c.valueRank);

    if (isStraightInArray(sortedCardsValues)) { return true; }

    // Cas spécial avec une suite composé d'un AS puis d'un Deux.
    const last = sortedCardsValues.pop();
    if (last === 12 && sortedCardsValues[0] === 0 && isStraightInArray(sortedCardsValues)) { return true; }

    return false;
}

function getStraightRank(cards) {
    if (!cards) { return null; }

    const cardsAreStraight = isStraight(cards);

    if (!cardsAreStraight) { return null; }

    const bestCard = getBestCard(cards);

    return [4, bestCard.valueRank];
}

function isFlush(cards) {
    if (!cards) { return false; }

    // console.log(cards);
    if (cards.every(c => c.suit === cards[0].suit)) { return true; }
    return false;
}

function getFlushRank(cards) {
    if (!cards) { return false; }

    const isCardsFlush = isFlush(cards);

    if (!isCardsFlush) { return null; }

    const bestCard = getBestCard(cards);

    return [5, bestCard.valueRank];
}

function getFullHouse(cards) {
    if (!cards) { return false; }

    const threeOfKind = get3OfKind(cards);
    const pair = getPair(cards);

    if (!threeOfKind || !pair) { return null; }

    return [threeOfKind, pair];
}

function getFullHouseRank(cards) {
    if (!cards) { return false; }

    const fullHouse = getFullHouse(cards);
    if (!fullHouse) { return null; }

    return [6, fullHouse[0][0].valueRank, fullHouse[1][0].valueRank];
}

function get4OfKind(cards) {
    if (!cards) { return null; }

    let fourOfKind = [];

    cards.forEach(card => {
        const sameValueCard = cards.filter(c => c.value === card.value);
        if (sameValueCard.length == 4) {
            fourOfKind = sameValueCard;
            cards = cards.filter(c => !c.isSameCard(card));
        }
    });

    if (fourOfKind.length < 1) { return null; }
    return fourOfKind;

}

function get4OfKindRank(cards) {
    if (!cards) { return null; }

    const fourOfKind = get4OfKind(cards);

    if (!fourOfKind) { return null; }

    const filteredCards = filterCards(cards, fourOfKind);
    const bestCard = getBestCard(filteredCards);

    return [7, fourOfKind[0].valueRank, bestCard.valueRank];
}

function isStraightFlush(cards) {
    if (!cards) { return false; }

    const isCardsFlush = isFlush(cards);
    const isCardsStraight = isStraight(cards);

    if (isCardsFlush && isCardsStraight) { return true; }
    return false;
}

function getStraightFlushRank(cards) {
    if (!cards) { return false; }

    const isCardsStraightFlush = isStraightFlush(cards);

    if (!isCardsStraightFlush) { return null; }

    const bestCard = getBestCard(cards);

    return [8, bestCard.valueRank];
}

module.exports = {
    filterCards,
    sortCards,
    getBestCardRank,
    getPairRank,
    getTwoPairRank,
    get3OfKindRank,
    getStraightRank,
    getFlushRank,
    getFullHouseRank,
    get4OfKindRank,
    getStraightFlushRank,
    getBestCard,
    getPair,
    getTwoPair,
    get3OfKind,
    isStraight,
    isFlush,
    getFullHouse,
    get4OfKind,
    isStraightFlush
};
