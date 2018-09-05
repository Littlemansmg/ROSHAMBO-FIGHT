//Modules
const fighters = require("./fighters");
const logic = require('./fightingLogic');
const util = require('util');
const readline = require('readline');
const event = require('events');
const emitter = new event.EventEmitter();

//create events
emitter.on('update', logic.healthUpdate);
emitter.on('hit', logic.tackle);

//Extra Stuff
const options = ['Rock', 'Paper', 'Scissors'];
const moves = ['Tackle', 'Defend'];

//Pick a fighter for both players.
let p1Character = fighters.option(options);
let p2Character = fighters.option(options);

//Get user input when needed.
function getUserInput() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
        });

        rl.on('line', (line) => {
            rl.close();
            resolve(line);
        });
    });
}

async function playGame(p1char){
    //get nickname
    console.log(util.format('What is the name of your %s?', p1char));
    let nick = await getUserInput();
    let p1fighter = fighters.getFighter(p1Character, nick);
    let p2fighter = fighters.getFighter(p2Character, 'Computer');

    while (true){
        emitter.emit('update', p1fighter, p2fighter);
        console.log("Pick your move. Tackle(0) or Defend(1)?");
        let p1move = await getUserInput();
        let p2move = fighters.option(moves);
        let p1damage = 0;
        let p2damage = 0;
        let p1defend = 0;
        let p2defend = 0;

        if (moves[p1move] === 'Tackle' && p2move === 'Tackle'){
            p1damage = logic.tackle(p1fighter, p2fighter.type);
            p2damage = logic.tackle(p2fighter, p1fighter.type);
            p1fighter.health = p1fighter.health - p2damage;
            p2fighter.health = p2fighter.health - p1damage;
            if(p1fighter.health <= 0 || p2fighter.health <= 0){
                emitter.emit('update', p1fighter, p2fighter);
                break;
            }
        }
        else if (moves[p1move] === 'Tackle' && p2move === 'Defend'){
            p1damage = logic.tackle(p1fighter, p2fighter.type);
            p2defend = logic.defend(p2fighter, p1fighter.type);
            if (p1damage - p2defend >= 0){
                p2fighter.health = p2fighter.health - (p1damage - p2defend);
            }
            if(p1fighter.health <= 0 || p2fighter.health <= 0){
                emitter.emit('update', p1fighter, p2fighter);
                break;
            }
        }
        else if (moves[p1move] === 'Defend' && p2move === 'Tackle'){
            p1defend = logic.defend(p1fighter, p2fighter.type);
            p2damage = logic.tackle(p2fighter, p1fighter.type);
            if (p2damage - p1defend >= 0){
                p1fighter.health = p1fighter.health - (p2damage - p1defend);
            }
            if(p1fighter.health <= 0 || p2fighter.health <= 0){
                emitter.emit('update', p1fighter, p2fighter);
                break;
            }

        }
        else {
            console.log("You both used defend! Nothing happened!");
        }

    }//end while

    console.log("Game Over!");
    process.exit()
}

playGame(p1Character);
