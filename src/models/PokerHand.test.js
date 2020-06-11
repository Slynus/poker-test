const PokerHand = require('./PokerHand');

test('Can create Poker Hand', () => {

    const handA = new PokerHand("AS AH AD AC QS");
    const handB = new PokerHand("KS 2H 5C JD TD");
    expect(handA.cards.length).toBe(5);
    expect(handB.cards.length).toBe(5);

    // more expect
    //   expect(obj.a).toBe(1);
});

test('Can not create Poker Hand, hand String is falsy', () => {
    expect(() => new PokerHand()).toThrowError('No hand provided');
    expect(() => new PokerHand(null)).toThrowError('No hand provided');
    expect(() => new PokerHand(undefined)).toThrowError('No hand provided');
    expect(() => new PokerHand("")).toThrowError('No hand provided');
});

test('Can not create Poker Hand, hand String is not a string', () => {
    expect(() => new PokerHand(42)).toThrow(TypeError);
    expect(() => new PokerHand([])).toThrow(TypeError);
    expect(() => new PokerHand(true)).toThrow(TypeError);
    expect(() => new PokerHand({})).toThrow(TypeError);
});

test('Can not create Poker Hand, hand String contains too many cards', () => {
    expect(() => new PokerHand("AS AH AD AC QS RS")).toThrowError('Too many cards');
});

test('Can not create Poker Hand, hand String contains too few cards', () => {
    expect(() => new PokerHand("AS AH AD AC")).toThrowError('Too few cards');
});

// test('Can not create Poker Hand, the hand is illegal (same cards multiple times)', () => {
//     expect(() => new PokerHand("AS AS AS AS AS")).toThrowError('Hand is illegal');
//     expect(() => new PokerHand("AS VH AD VH QS")).toThrowError('Hand is illegal');
// });

// test('Can not create Poker Hand, parsing is wrong, card in wrong format', () => {
//     expect(() => new PokerHand("AS VH 10D VH QS")).toThrowError('Hand is illegal');
// });

// test('Can not create Poker Hand, parsing is wrong, unkown cards', () => {
//     expect(() => new PokerHand("AS VH AG VH QS")).toThrowError('Hand is illegal');
// });

