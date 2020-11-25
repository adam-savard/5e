const MONSTERS = require('./monsters');
const CHARACTER = require('./character').Character.INST;

const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class EncounterGenerator{
    static currentMonsters = [];
    static generateEncounter(){
        let _inst = EncounterGenerator;
        _inst.currentMonsters = [];
        let monsters = getRandomInt(0, CHARACTER.LEVEL);

        for(let i = 0; i < monsters; i++){
            _inst.currentMonsters.push(_inst.randomMonster());
        }

        if(monsters == 0){
            return _inst.goodEncounter();
        }
        else{
            return _inst.getStatsForAll();
        }
    }

    static goodEncounter(){
        CHARACTER.HP = CHARACTER.MAX_HP;

        return `${CHARACTER.NAME} didn't find any monsters. Got to rest!`;
    }

    static randomMonster(){
        let ms = Object.keys(MONSTERS);

        let mIndex = getRandomInt(0, ms.length -1);

        return new MONSTERS[ms[mIndex]]();
    }

    static getStatsForAll(){
        let _inst = EncounterGenerator;
        let stats = ``;
        _inst.currentMonsters.forEach(m =>{
            stats += `${m.toStringStatus()} \n`;
        })

        return stats;
    }

    static monsterAttack(){
        let _inst = EncounterGenerator;
        let status = ``;
        _inst.currentMonsters.forEach((m,index) =>{
            if(m.HP > 0){
                let r = m.roll(1, 20, "hit");

                status += `${m.constructor.name} (slot ${index + 1}) rolls for ${r} vs AC of ${CHARACTER.AC}.\n\n`;
    
                if(r >= CHARACTER.AC){
                    let dmg = m.roll(1,m.ATTACK,"damage");
                    CHARACTER.HP -= dmg;
                    status += `${m.constructor.name} hits! Damage dealt is ${dmg}.\n\n${CHARACTER.NAME} has ${CHARACTER.HP} HP left. ${CHARACTER.healthCheck()}\n\n`;
                }
                else{
                    status += `${m.constructor.name} misses!\n\n`;
                }
            }
        })

        return status;
    }

    static playerAttack(index){
        let m = EncounterGenerator.currentMonsters[index];

        let status = ``;

        let atk = CHARACTER.roll(1,20);

        status += `${CHARACTER.NAME} rolls to attack ${m.constructor.name} (slot ${index}). Rolls ${atk}.\n\n`;

        if(m.AC <= atk){
            let dmg = CHARACTER.roll(1,20,"ATTACK");
            m.HP -= dmg;
            if(m.HP < 0) m.HP = 0;

            status += `${CHARACTER.NAME} deals ${dmg} damage. ${m.toStringStatus()}\n\n`;
        }
        else{
            status += `Missed!\n\n`;
        }

        return status;
    }

    static playerExploit(index, type){
        let m = EncounterGenerator.currentMonsters[index];

        let status = ``;

        status += CHARACTER.getActivity() + `\n\n`;

        let multiplier = 0.5;
        let AC = m.WEAKNESS_AC;
        if(m.WEAKNESS == type){
            multiplier = 2;
        }else{
            AC += m.roll(1,10);
        }

        //roll for hit then damage
        let h = CHARACTER.roll(1,20);

        if(h >= AC){
            let dmg = CHARACTER.roll(1,20,"ATTACK");
            dmg *= multiplier;
            m.HP -= dmg;
            if(m.HP < 0) m.HP = 0;
            status += `${CHARACTER.NAME} deals ${dmg} damage. ${m.toStringStatus()}\n\n`;
        }
        else{
            status += `${m.constructor.name} is unimpressed. ${m.toStringStatus()}\n\n`;
        }

        return status;
    }
}