const PokerHand = require('../models/PokerHand');
const PokerCard = require('../models/PokerCard');
const pcUtils = require('./PokerCardUtils');

test('filterCards ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD');
    const handB = [new PokerCard('AS'), new PokerCard('KH'), new PokerCard('5C'), new PokerCard('JD')];
    const handC = [new PokerCard('AS')];

    const filtered1 = pcUtils.filterCards(handA.cards, handB);
    const filtered2 = pcUtils.filterCards(handA.cards, handC);

    expect(filtered1.length).toBe(1);
    expect(filtered1[0].value).toBe('T');

    expect(filtered2.length).toBe(4);
    expect(filtered2[0].value).toBe('K');
});

test('sortCard ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD');
    const handB = new PokerHand('AS AH 2S 3S 4S');

    const handASort = pcUtils.sortCards(handA.cards);
    const handBSort = pcUtils.sortCards(handB.cards);

    expect(handASort.map(c => c.value)).toEqual(['5', 'T', 'J', 'K', 'A']);
    expect(handBSort.map(c => c.value)).toEqual(['2', '3', '4', 'A', 'A']);
});

test('getBestCard Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD');
    const handB = new PokerHand('2S QH 5C QD TD');

    const getBestA = pcUtils.getBestCard(handA.cards);
    const getBestB = pcUtils.getBestCard(handB.cards);

    expect(getBestA.value).toBe('A');
    expect(getBestB.value).toBe('Q');
});

test('getBestCardRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD');
    const handB = new PokerHand('2S QH 5C QD TD');

    const rankA = pcUtils.getBestCardRank(handA.cards);
    const rankB = pcUtils.getBestCardRank(handB.cards);

    expect(rankA).toEqual([0, 12]);
    expect(rankB).toEqual([0, 10]);
});

test('getPair Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de paires
    const handB = new PokerHand('2S QH 5C QD TD'); // Une paires
    const handC = new PokerHand('5S 2H 5C 2D TD'); // Deux paires
    const handD = new PokerHand('2S QH QC QD TD'); // Brelan

    const getBestPairA = pcUtils.getPair(handA.cards);
    const getBestPairB = pcUtils.getPair(handB.cards);
    const getBestPairC = pcUtils.getPair(handC.cards);
    const getBestPairD = pcUtils.getPair(handD.cards);

    expect(getBestPairA).toBe(null);
    expect(getBestPairB[0].value).toBe('Q');
    expect(getBestPairC[0].value).toBe('5');
    expect(getBestPairD).toBe(null);
});

test('getPairRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // pas de Paire
    const handB = new PokerHand('2S QH 5C QD TD'); // Paire

    const rankA = pcUtils.getPairRank(handA.cards);
    const rankB = pcUtils.getPairRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([1, 10, 8]);
});

test('getTwoPair Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de paires
    const handB = new PokerHand('2S QH 5C QD TD'); // Une paires
    const handC = new PokerHand('5S 2H 5C 2D TD'); // Deux paires
    const handD = new PokerHand('QS QH QC QD TD'); // Carré

    const getBestPairA = pcUtils.getTwoPair(handA.cards);
    const getBestPairB = pcUtils.getTwoPair(handB.cards);
    const getBestPairC = pcUtils.getTwoPair(handC.cards);
    const getBestPairD = pcUtils.getTwoPair(handD.cards);

    expect(getBestPairA).toBe(null);
    expect(getBestPairB).toBe(null);
    expect(getBestPairC[0][0].value).toBe('5');
    expect(getBestPairC[1][0].value).toBe('2');
    expect(getBestPairD).toBe(null);
});

test('getTwoPairRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // pas de double Paire
    const handB = new PokerHand('2S QH 5C QD 5D'); // Deux Paire

    const rankA = pcUtils.getTwoPairRank(handA.cards);
    const rankB = pcUtils.getTwoPairRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([2, 10, 3, 0]);
});

test('get3OfKind Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de brelan
    const handB = new PokerHand('2S QH 5C QD TD'); // Une paires
    const handC = new PokerHand('2S 2H 5C 2D TD'); // Brelan
    const handD = new PokerHand('QS QH QC QD TD'); // Carré

    const get3OfKindA = pcUtils.get3OfKind(handA.cards);
    const get3OfKindB = pcUtils.get3OfKind(handB.cards);
    const get3OfKindC = pcUtils.get3OfKind(handC.cards);
    const get3OfKindD = pcUtils.get3OfKind(handD.cards);

    expect(get3OfKindA).toBe(null);
    expect(get3OfKindB).toBe(null);
    expect(get3OfKindC[0].value).toBe('2');
    expect(get3OfKindD).toBe(null);
});

test('get3OfKindRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // pas de Brelan
    const handB = new PokerHand('5S AH 5C QD 5D'); // Brelan

    const rankA = pcUtils.get3OfKindRank(handA.cards);
    const rankB = pcUtils.get3OfKindRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([3, 3, 12]);
});

test('isStraight Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Suite
    const handB = new PokerHand('9S 7H 5C 6D 8D'); // Suite
    const handC = new PokerHand('2S 4H 5C AD 3D'); // Suite cas spécial avec l'As


    const isStraightA = pcUtils.isStraight(handA.cards);
    const isStraightB = pcUtils.isStraight(handB.cards);
    const isStraightC = pcUtils.isStraight(handC.cards);

    expect(isStraightA).toBe(false);
    expect(isStraightB).toBe(true);
    expect(isStraightC).toBe(true);
});

test('getStraightRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // pas de Suite
    const handB = new PokerHand('2S 4H 5C AD 3D'); // Suite

    const rankA = pcUtils.getStraightRank(handA.cards);
    const rankB = pcUtils.getStraightRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([4, 12]);
});

test('isFlush Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Flush
    const handB = new PokerHand('AD 7D QD 6D 8D'); // Flush


    const isFlushA = pcUtils.isFlush(handA.cards);
    const isFlushB = pcUtils.isFlush(handB.cards);

    expect(isFlushA).toBe(false);
    expect(isFlushB).toBe(true);
});

test('isFlushRank Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Flush
    const handB = new PokerHand('KD 7D QD 6D 8D'); // Flush

    const rankA = pcUtils.getFlushRank(handA.cards);
    const rankB = pcUtils.getFlushRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([5, 11]);
});

test('getFullHouse Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Full
    const handB = new PokerHand('2S QH 5C QD TD'); // Une paire
    const handC = new PokerHand('2S 2H 5C 2D TD'); // Un Brelan
    const handD = new PokerHand('QS QH TC QD TD'); // Un Full

    const getFullHouseA = pcUtils.getFullHouse(handA.cards);
    const getFullHouseB = pcUtils.getFullHouse(handB.cards);
    const getFullHouseC = pcUtils.getFullHouse(handC.cards);
    const getFullHouseD = pcUtils.getFullHouse(handD.cards);

    expect(getFullHouseA).toBe(null);
    expect(getFullHouseB).toBe(null);
    expect(getFullHouseC).toBe(null);
    expect(getFullHouseD[0][0].value).toBe('Q');
    expect(getFullHouseD[0][2].value).toBe('Q');
    expect(getFullHouseD[1][0].value).toBe('T');
});

test('getFullHouseRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // Pas de Full
    const handB = new PokerHand('QS QH TC QD TD'); // Full

    const rankA = pcUtils.getFullHouseRank(handA.cards);
    const rankB = pcUtils.getFullHouseRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([6, 10, 8]);
});

test('get4OfKind Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de carre
    const handB = new PokerHand('2S QH 5C QD TD'); // Une paire
    const handC = new PokerHand('2S 2H 5C 2D TD'); // Brelan
    const handD = new PokerHand('QS QH QC QD TD'); // Carré

    const get4OfKindA = pcUtils.get4OfKind(handA.cards);
    const get4OfKindB = pcUtils.get4OfKind(handB.cards);
    const get4OfKindC = pcUtils.get4OfKind(handC.cards);
    const get4OfKindD = pcUtils.get4OfKind(handD.cards);

    expect(get4OfKindA).toBe(null);
    expect(get4OfKindB).toBe(null);
    expect(get4OfKindC).toBe(null);
    expect(get4OfKindD[0].value).toBe('Q');
});

test('get4OfKindRank Ok', () => {
    const handA = new PokerHand('AS KH 5C JD TD'); // pas de carre
    const handB = new PokerHand('QS QH QC QD TD'); // carre

    const rankA = pcUtils.get4OfKindRank(handA.cards);
    const rankB = pcUtils.get4OfKindRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([7, 10, 8]);
});

test('isFlush Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Straight & Flush
    const handB = new PokerHand('AD 7D QD 6D 8D'); // Flush
    const handC = new PokerHand('4D 5H 6D 7D 8D'); // Straight
    const handD = new PokerHand('4D 5D 6D 7D 8D'); // Straight & Flush


    const isStraightFlushA = pcUtils.isStraightFlush(handA.cards);
    const isStraightFlushB = pcUtils.isStraightFlush(handB.cards);
    const isStraightFlushC = pcUtils.isStraightFlush(handC.cards);
    const isStraightFlushD = pcUtils.isStraightFlush(handD.cards);


    expect(isStraightFlushA).toBe(false);
    expect(isStraightFlushB).toBe(false);
    expect(isStraightFlushC).toBe(false);
    expect(isStraightFlushD).toBe(true);
});

test('isFlushRank Ok', () => {
    const handA = new PokerHand('AS KH 2C JD TD'); // Pas de Straight & Flush
    const handB = new PokerHand('4D 5D 6D 7D 8D'); // Straight & Flush

    const rankA = pcUtils.getStraightFlushRank(handA.cards);
    const rankB = pcUtils.getStraightFlushRank(handB.cards);

    expect(rankA).toEqual(null);
    expect(rankB).toEqual([8, 6]);
});