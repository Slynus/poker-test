const PokerCard = require('./PokerCard');

test('Can create Poker Card', () => {

    const cardA = new PokerCard('AS');
    expect(cardA.card.value).toBe('A');
    expect(cardA.card.suit).toBe('S');

    // more expect
    //   expect(obj.a).toBe(1);
});

test('Can not create Poker Card, card String is falsy', () => {
    expect(() => new PokerCard()).toThrowError('No Card provided');
    expect(() => new PokerCard(null)).toThrowError('No Card provided');
    expect(() => new PokerCard(undefined)).toThrowError('No Card provided');
    expect(() => new PokerCard("")).toThrowError('No Card provided');
});

test('Can not create Poker Card, card String is not a string', () => {
    expect(() => new PokerCard(42)).toThrow(TypeError);
    expect(() => new PokerCard([])).toThrow(TypeError);
    expect(() => new PokerCard(true)).toThrow(TypeError);
    expect(() => new PokerCard({})).toThrow(TypeError);
});

test('Can not create Poker Card, card String is not correct length', () => {
    expect(() => new PokerCard('AHH')).toThrow('Bad Card Syntax');
    expect(() => new PokerCard('1')).toThrow('Bad Card Syntax');
    expect(() => new PokerCard('K')).toThrow('Bad Card Syntax');
});

test('Can not create Poker Card, card String is not in existing possible values', () => {
    expect(() => new PokerCard('2K')).toThrow('Card not existing');
    expect(() => new PokerCard('FH')).toThrow('Card not existing');
    expect(() => new PokerCard('GM')).toThrow('Card not existing');
    expect(() => new PokerCard('11')).toThrow('Card not existing');
    expect(() => new PokerCard('CC')).toThrow('Card not existing');
});

