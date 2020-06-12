const PokerCard = require('./PokerCard');

test('Can create Poker Card', () => {

    const cardA = new PokerCard('AS');
    expect(cardA.value).toBe('A');
    expect(cardA.suit).toBe('S');

    // more expect
    //   expect(obj.a).toBe(1);
});

test('Can not create Poker Card, card String is falsy', () => {
    expect(() => new PokerCard()).toThrowError('No Card provided');
    expect(() => new PokerCard(null)).toThrowError('No Card provided');
    expect(() => new PokerCard(undefined)).toThrowError('No Card provided');
    expect(() => new PokerCard('')).toThrowError('No Card provided');
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

test('Can compare Poker cards', () => {
    const validResponses = [1, 2, 3];

    const cardA = new PokerCard('AS');
    const cardB = new PokerCard('QS');

    const compareResponse = cardA.compareWith(cardB);

    expect(validResponses).toContain(compareResponse);
});

test('Can compare Poker cards, compare is correct', () => {
    const cardA = new PokerCard('KS');
    const cardB = new PokerCard('KH');
    const cardC = new PokerCard('AD');
    const cardD = new PokerCard('2C');

    expect(cardA.compareWith(cardB)).toBe(3);
    expect(cardA.compareWith(cardC)).toBe(2);
    expect(cardA.compareWith(cardD)).toBe(1);
});

test('Can not compare Poker cards, Card compared is not a card', () => {

    const cardA = new PokerCard('AS');

    expect(() => cardA.compareWith('')).toThrowError('Not a Poker Card');
    expect(() => cardA.compareWith(null)).toThrowError('Not a Poker Card');
    expect(() => cardA.compareWith(undefined)).toThrowError('Not a Poker Card');
    expect(() => cardA.compareWith(42)).toThrowError('Not a Poker Card');
    expect(() => cardA.compareWith([])).toThrowError('Not a Poker Card');
    expect(() => cardA.compareWith({})).toThrowError('Not a Poker Card');
});

test('Card is same', ()=>{
    const cardA = new PokerCard('KS');
    const cardB = new PokerCard('KS');
    const cardC = new PokerCard('AD');

    expect(cardA.isSameCard(cardB)).toBe(true);
    expect(cardA.isSameCard(cardC)).toBe(false);
});