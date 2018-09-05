//Modules
let util = require('util');

//Moves
exports.tackle = function(fighter, othertype){
    let damage = Math.floor(Math.random()*10);
    if (fighter.advantage === othertype){
        damage += fighter.spAttack;
    }
    console.log(util.format('%s dealt %d damage!', fighter.nick, damage));
    return damage
};

exports.defend = function(fighter, othertype){
    let blocked = Math.ceil(Math.random()*4);
    if (fighter.advantage === othertype){
        blocked += fighter.spDefend;
    }
    console.log(util.format('%s blocked %d damage!', fighter.nick, blocked));
    return blocked
};

//Show updated help
exports.healthUpdate = function(p1, p2){
    let info = util.format(
        "Name: %s Type: %s Health: %d \t Name: %s Type: %s Health: %d",
        p1.nick, p1.type, p1.health,
        p2.nick, p2.type, p2.health
    );
    console.log(info)
};
