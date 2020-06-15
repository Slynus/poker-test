const PokerHand = require('./PokerHand');

test('Can create Poker Hand', () => {
    const handA = new PokerHand('AS AH AD AC QS');
    const handB = new PokerHand('KS 2H 5C JD TD');

    expect(handA.cards.length).toBe(5);
    expect(handB.cards.length).toBe(5);
});

test('Can not create Poker Hand, hand String is falsy', () => {
    expect(() => new PokerHand()).toThrowError('No hand provided');
    expect(() => new PokerHand(null)).toThrowError('No hand provided');
    expect(() => new PokerHand(undefined)).toThrowError('No hand provided');
    expect(() => new PokerHand('')).toThrowError('No hand provided');
});

test('Can not create Poker Hand, hand String is not a string', () => {
    expect(() => new PokerHand(42)).toThrow(TypeError);
    expect(() => new PokerHand([])).toThrow(TypeError);
    expect(() => new PokerHand(true)).toThrow(TypeError);
    expect(() => new PokerHand({})).toThrow(TypeError);
});

test('Can not create Poker Hand, hand String contains too many cards', () => {
    expect(() => new PokerHand('AS AH AD AC QS KS')).toThrowError('Too many cards');
});

test('Can not create Poker Hand, hand String contains too few cards', () => {
    expect(() => new PokerHand('AS AH AD AC')).toThrowError('Too few cards');
});

test('Can not create Poker Hand, the hand is illegal (same cards multiple times)', () => {
    expect(() => new PokerHand('AS AS AS AS AS')).toThrowError('Hand is illegal');
    expect(() => new PokerHand('AS JH AD JH QS')).toThrowError('Hand is illegal');
});

test('compareRanks is ok', () => {
    const arrayA = [0, 0, 0, 2];
    const arrayB = [0, 0, 0, 4];
    const arrayC = [0, 0, 0, 1];

    const arrayD = [2];
    const arrayE = [4];
    const arrayF = [1];

    expect(PokerHand.compareRanks(arrayA, arrayA)).toBe(3);
    expect(PokerHand.compareRanks(arrayA, arrayB)).toBe(2);
    expect(PokerHand.compareRanks(arrayA, arrayC)).toBe(1);

    expect(PokerHand.compareRanks(arrayD, arrayD)).toBe(3);
    expect(PokerHand.compareRanks(arrayD, arrayE)).toBe(2);
    expect(PokerHand.compareRanks(arrayD, arrayF)).toBe(1);
});

test('evaluateRank is ok', () => {
    const handA = new PokerHand('TS 2H 4D 8C 6S'); // Meilleure carte
    const handB = new PokerHand('KS KH 5C JD 5D'); // Deux Paires
    const handC = new PokerHand('AS KS QS JS TS'); // Quinte Flush Royale

    const rankA = PokerHand.evaluateRank(handA.cards);
    const rankB = PokerHand.evaluateRank(handB.cards);
    const rankC = PokerHand.evaluateRank(handC.cards);

    expect(rankA).toEqual([0, 8]);
    expect(rankB).toEqual([2, 11, 3, 9]);
    expect(rankC).toEqual([8, 12]);
});

test('compareWith is ok', () => {
    const handA = new PokerHand('TS 2H 4D 8C 6S'); // Meilleure carte
    const handB = new PokerHand('KS KH 5C JD 5D'); // Deux Paires
    const handC = new PokerHand('AS KS QS JS TS'); // Quinte Flush Royale
    const handD = new PokerHand('KS KH 5C QD 5D'); // Deux Paires
    const handE = new PokerHand('KS KH 3C JS 6D'); // Deux Paires 
    const handF = new PokerHand('KC KD 2C JD 7D'); // Deux Paires

    const matchAB = handA.compareWith(handB);
    const matchAC = handA.compareWith(handC);
    const matchBC = handB.compareWith(handC);
    const matchDB = handD.compareWith(handB);
    const matchCC = handC.compareWith(handC);
    const matchEF = handE.compareWith(handF);

    expect(matchAB).toBe(2);
    expect(matchAC).toBe(2);
    expect(matchBC).toBe(2);
    expect(matchDB).toBe(1);
    expect(matchCC).toBe(3);
    expect(matchEF).toBe(3);
});