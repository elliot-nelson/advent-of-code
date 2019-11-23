class Day24 {
    constructor(input) {
        this.input = input;
    }

    estimatedDamage(attacker, defender) {
        if (defender.immunities.includes(attacker.attackType)) {
            return 0;
        } else if (defender.weaknesses.includes(attacker.attackType)) {
            return attacker.attack * attacker.units * 2;
        } else {
            return attacker.attack * attacker.units;
        }
    }

    selectTargets(armies) {
        let combined = armies[0].concat(armies[1]);
        combined = combined.sort((a, b) => {
            let s = b.units * b.attack - a.units * a.attack;
            if (s === 0) s = b.initiative - a.initiative;
            return s;
        });

        let chosen = [[], []];
        combined.forEach(group => {
            let targets = armies[(group.team + 1) % 2];
            targets = targets.sort((a, b) => {
                let s = this.estimatedDamage(group, b) - this.estimatedDamage(group, a);
                if (s === 0) s = b.units * b.attack - a.units * a.attack;
                if (s === 0) s = b.initiative - a.initiative;
                return s;
            });
            group.target = undefined;
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].units > 0 && this.estimatedDamage(group, targets[i]) > 0 && !chosen[group.team].includes(targets[i])) {
                    group.target = targets[i];
                    chosen[group.team].push(targets[i]);
                    break;
                }
            }
        });
    }

    attack(armies) {
        let combined = armies[0].concat(armies[1]);
        combined = combined.sort((a, b) => b.initiative - a.initiative);

        combined.forEach(group => {
            if (!group.target) return;

            let damage = this.estimatedDamage(group, group.target);
            if (damage > 0) {
                let unitsLost = Math.floor(damage / group.target.hp);
                group.target.units = Math.max(0, group.target.units - unitsLost);
                console.log(`${group.initiative} Group ${group.team}-${group.id} attacks ${group.target.team}-${group.target.id} for ${damage}, killing ${unitsLost} units`);
            }
        });
    }

    unitsAlive(armies) {
        let alive = [0, 0];
        armies[0].forEach(group => alive[0] += group.units);
        armies[1].forEach(group => alive[1] += group.units);
        return alive;
    }

    simulate(armies, boost) {
        armies = [
            armies[0].map(x => Object.assign({}, x)),
            armies[1].map(x => Object.assign({}, x))
        ];
        armies[0].forEach(group => group.attack += boost);

        let alive = this.unitsAlive(armies);
        while (alive[0] > 0 && alive[1] > 0) {
            this.selectTargets(armies);
            this.attack(armies);
            let prevAlive = alive;
            alive = this.unitsAlive(armies);
            console.log(alive);

            // I encountered this situation a couple times, and I don't THINK it's due to a bug
            // in my code. Handle this situation by making both teams lose immediately.
            if (alive[0] === prevAlive[0] && alive[1] === prevAlive[1]) {
                console.log('STALEMATE!');
                return [0, 0];
            }
        }

        return alive;
    }

    run() {
        let armies = [[], []];
        let team, match;

        this.input.forEach(line => {
            if ((match = line.match(/^Immune System:/))) {
                team = 0;
            } else if ((match = line.match(/^Infection:/))) {
                team = 1;
            } else if ((match = line.match(/(\d+) units each with (\d+) hit points (\(.+\)|) ?with an attack that does (\d+) (.+) damage at initiative (\d+)/))) {
                let group = {
                    units: parseInt(match[1], 10),
                    hp: parseInt(match[2], 10),
                    attack: parseInt(match[4], 10),
                    attackType: match[5],
                    initiative: parseInt(match[6], 10),
                    immunities: [],
                    weaknesses: [],
                    team: team,
                    id: armies[team].length
                };

                if (match[3]) {
                    match[3].slice(1, -1).split('; ').forEach(attr => {
                        if (attr.split(' to ')[0] === 'weak') {
                            group.weaknesses = group.weaknesses.concat(attr.split(' to ')[1].split(', '));
                        } else if (attr.split(' to ')[0] === 'immune') {
                            group.immunities = group.immunities.concat(attr.split(' to ')[1].split(', '));
                        } else throw new Error('Fuck');
                    });
                }

                armies[team].push(group);
            }
        });

        // Part 1

        this.simulate(armies, 0);

        // Part 2

        // The input is relatively small so it's probably not strictly necessary, but
        // we'll start by doubling up until we hit a successful boost, then we'll do
        // a normal scan.

        console.log('Finding smallest boost...');
        let range = [0, 2];
        let found = false;
        while (!found) {
            console.log(range);
            let result = this.simulate(armies, range[1]);
            if (result[0] === 0) {
                range[0] = range[1];
                range[1] *= 2;
            } else {
                found = true;
            }
        }
        console.log(range);
        for (let i = range[0]; i <= range[1]; i++) {
            let result = this.simulate(armies, i);
            if (result[0] > 0) {
                console.log("FOUND IT");
                console.log(i);
                break;
            }
        }
    }
}
module.exports = Day24;
