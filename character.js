class Character{
    constructor(stats){
        this.LEVEL = 1;
        this.XP = 0;
        this.STRENGTH = stats.strength;
        this.DEXTERITY = stats.dexterity;
        this.CONSTITUTION = stats.constitution;
        this.INTELLIGENCE = stats.intelligence;
        this.WISDOM = stats.wisdom;
        this.CHARISMA = stats.charisma;
        this.NAME = stats.name;
        this.setACHP();
    }

    healthCheck(){
        if(this.HP <= 0){
            return "Game Over!";
        }
    }

    setACHP(){
        let mod = -(10-this.DEXTERITY);
        this.AC = 10 + mod;

        mod = -(10-this.CONSTITUTION);
        this.HP = 10 + mod;
    }

    setXPThreshold(){
        this.XP_THRESHOLD = (this.LEVEL * 200) * 1.1;
    }

    checkXP(){
        if(this.XP >= this.XP_THRESHOLD){
            this.LEVEL++;
            this.XP -= this.XP_THRESHOLD;
            this.setACHP();
            this.setXPThreshold();
            return `${this.name} leveled up! They are now level ${this.LEVEL}`;
        }
    }

    roll(min, max, type = "hit") {
        min = Math.ceil(min);
        max = Math.floor(max);
        let r = Math.floor(Math.random() * (max - min + 1)) + min;

        if(!this[type]){
            return r;
        }
        else{
            let mod = -(10-this[type]);
            return r + mod;
        }
    }
}

module.exports = {
    Character
}