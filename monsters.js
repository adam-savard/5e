const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Monster{
    constructor(stats){
        this.HP = stats.hp;
        this.ATTACK = stats.attack;
        this.WEAKNESS = stats.weakness;
        this.WEAKNESS_AC = stats.weakness_ac;
    }
}

class Spider extends Monster{
   constructor(){
       super({
           hp: getRandomInt(5, 10),
           attack: getRandomInt(1, 4),
           weakness: "STRENGTH",
           weakness_ac: getRandomInt(1,20)
       })
   } 
}

class Wraith extends Monster{
    constructor(){
        super({
            hp: getRandomInt(8, 15),
            attack: getRandomInt(5, 10),
            weakness: "WISDOM",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Skeleton extends Monster{
    constructor(){
        super({
            hp: getRandomInt(7, 10),
            attack: getRandomInt(1, 6),
            weakness: "CONSTITUTION",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Slime extends Monster{
    constructor(){
        super({
            hp: getRandomInt(1, 20),
            attack: getRandomInt(1, 3),
            weakness: "INTELLIGENCE",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Golem extends Monster{
    constructor(){
        super({
            hp: getRandomInt(10, 30),
            attack: getRandomInt(8, 10),
            weakness: "CHARISMA",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Bandit extends Monster{
    constructor(){
        super({
            hp: getRandomInt(1, 12),
            attack: getRandomInt(1, 8),
            weakness: "DEXTERITY",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Barbarian extends Monster{
    constructor(){
        super({
            hp: getRandomInt(6, 18),
            attack: getRandomInt(1, 8),
            weakness: "INTELLIGENCE",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Soldier extends Monster{
    constructor(){
        super({
            hp: getRandomInt(1, 10),
            attack: getRandomInt(1, 8),
            weakness: "WISDOM",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Wizard extends Monster{
    constructor(){
        super({
            hp: getRandomInt(1, 10),
            attack: getRandomInt(1, 8),
            weakness: "CHARISMA",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

class Unicorn extends Monster{
    constructor(){
        super({
            hp: getRandomInt(1, 10),
            attack: getRandomInt(1, 10),
            weakness: "CONSTITUTION",
            weakness_ac: getRandomInt(1,20)
        })
    } 
}

module.exports = {
    Monster,
    Spider,
    Wraith,
    Skeleton,
    Slime,
    Golem,
    Bandit,
    Barbarian,
    Soldier,
    Unicorn,
    Wizard
}