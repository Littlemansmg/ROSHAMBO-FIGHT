
exports.option = function(option){
    //var = lowest_whole_value(random number between 0 and 1 * length of option list)
    let randOption = Math.floor(Math.random()*option.length);
    return option[randOption];
};

function OBJRock(nick){
    this.type = 'Rock';
    this.nick = nick;
    this.health = 30;
    this.spAttack = 5;
    this.spDefend = 5;
    this.advantage = 'Scissors';
}

function OBJPaper(nick){
    this.type = 'Paper';
    this.nick = nick;
    this.health = 20;
    this.spAttack = 5;
    this.spDefend = 5;
    this.advantage = 'Rock';
}

function OBJScissors(nick){
    this.type = 'Scissors';
    this.nick = nick;
    this.health = 25;
    this.spAttack = 5;
    this.spDefend = 5;
    this.advantage = 'Paper';
}

exports.getFighter = function(fighter, nick){
    let Rock = new OBJRock();
    let Paper = new OBJPaper();
    let Scissors = new OBJScissors();
    switch(fighter){
        case Rock.type:
            return new OBJRock(nick);
        case Paper.type:
            return new OBJPaper(nick);
        case Scissors.type:
            return new OBJScissors(nick);
    }
};

exports.reset = function(obj){
    if (obj.type === 'Rock'){
        obj.health = 30;
    }
    if (obj.type === 'Paper'){
        obj.health = 20;
    }
    if (obj.type === 'Scissors'){
        obj.health = 25;
    }
    return obj
};
