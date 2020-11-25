class Character{
    static INST;
    constructor(stats){
        this.LEVEL = 1;
        this.XP = 0;
        this.ATTACK = this.roll(1,4);
        this.STRENGTH = stats.strength;
        this.DEXTERITY = stats.dexterity;
        this.CONSTITUTION = stats.constitution;
        this.INTELLIGENCE = stats.intelligence;
        this.WISDOM = stats.wisdom;
        this.CHARISMA = stats.charisma;
        this.NAME = stats.name;
        this.MAX_HP = this.HP;
        this.setACHP();
        this.setAtk();
    }

    healthCheck(){
        if(this.HP <= 0){
            return `Game Over!`;
        }

        return ``;
    }

    setACHP(){
        let mod = -(10-this.DEXTERITY);
        this.AC = 10 + mod;

        mod = -(10-this.CONSTITUTION);
        this.HP = 10 + mod;
        this.MAX_HP = this.HP;
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
            this.setAtk();
            return `${this.name} leveled up! They are now level ${this.LEVEL}`;
        }
    }

    setAtk(){
        this.ATTACK = this.ATTACK + this.roll(1,this.LEVEL, `STRENGTH`);
    }

    roll(min, max, type = `hit`) {
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

    getActivity(stat){
        let randomIndex = this.roll(0,4);
        let activityArray;

        switch(stat){
            case `STRENGTH`:
                activityArray = [`You crack your knuckles menacingly.`, `You swing your weapon around, only dropping it once.`, `You bench press a large rock. Correction, a VERY large rock.`, `You do a handstand on your thumb.`, `You brag about the size of your biceps.`];
                break;
            case `DEXTERITY`:
                activityArray = [`You do a backflip. Twice.`, `You take a ready stance.`, `You set up a tightrope and walk it.`, `You avoid falling on your face.`, `You flourish your hands wildly.`];
                break;
            case `CONSTITUTION`:
                activityArray = [`You flex harder than you've ever flexed before.`, `You attempt to bench press the monster.`, `You drink over a gallon of milk without throwing up.`, `You watch all the Lord of the Rings movies in a row. The extended editions.`, `You start a staring contest. You win.`];
                break;
            case `INTELLIGENCE`:
                activityArray = [`You read an entire book. Menacingly.`, `You ask the monster what the square root of its face is.`, `You publish an academic journal on monster slaying.`, `You attempt to convince the monster it's actually a newt.`, `You try to impress the monster with how big your brain is by showing it your head.`];
                break;
            case `WISDOM`:
                activityArray = [`You quote a proverb while trimming a bonzai tree.`, `You achieve inner zen.`, `You make a sound investment towards retirement.`, `You cast a spell in a wise way.`, `You go to sleep at a reasonable hour.`];
                break;
            case `CHARISMA`:
                activityArray = [`You smile, showing your excellent teeth`, `You attempt to convince the monster it's a good member of society.`, `You set up a psychatric help booth. The monster pays 5 copper to attend.`, `You engage in a discussion about the monster's feelings. Yes, feelings.`, `You ask the monster to consider surrendering. With a pretty please. With sugar on top.`];
                break;
        }

        return activityArray[randomIndex];
    }
}

module.exports = {
    Character
}