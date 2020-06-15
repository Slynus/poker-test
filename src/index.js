const chalk = require('chalk');
const PokerHand = require('./models/PokerHand');

function displayResultMessage(handA, handB) {

    console.log(chalk.red(`Main A : ${handA} | Main B : ${handB}`));

    const compareWithRes = handA.compareWith(handB);
    console.log(chalk.blue(`Résultat du compareWith : ${compareWithRes}`));
    if (compareWithRes === 1) {
        console.log(chalk.green("La Main A l'emporte"));
    } else if (compareWithRes === 2) {
        console.log(chalk.green("La Main B l'emporte"));
    } else {
        console.log(chalk.green("Egalité !"));
    }
}

const handA = new PokerHand('KS KH 3C JS 6D'); // Deux Paires 
const handB = new PokerHand('KC KD 2C JD 7D'); // Deux Paires

const handC = new PokerHand('KS 2C 3C 6S 7D'); // Meilleure Carte 
const handD = new PokerHand('AC QD JC 8D 5D');

const handE = new PokerHand('KS KH KC KD 6D'); // Carre
const handF = new PokerHand('KC KD KS 7H 7D'); // Full

const handG = new PokerHand('KS KH 3C JS 6D'); // Une Paires 
const handH = new PokerHand('KC KD 2C 2D 7D'); // Deux Paires

const handI = new PokerHand('KS QH JC TS 9D'); // Suites 
const handJ = new PokerHand('QC KC 2C JC 7C'); // Couleur

console.log(chalk.white("Jeu 1 : "));
displayResultMessage(handA, handB);
console.log(chalk.white('\n', "Jeu 2 : "));
displayResultMessage(handC, handD);
console.log(chalk.white('\n', "Jeu 3 : "));
displayResultMessage(handE, handF);
console.log(chalk.white('\n', "Jeu 4 : "));
displayResultMessage(handG, handH);
console.log(chalk.white('\n', "Jeu 5 : "));
displayResultMessage(handI, handJ);

