class Day04 {
    constructor(input) {
        this.input = input;
    }

    run() {
        this.input = this.input.sort();

        let guard, match, schedule = {};
        let date, downTime, upTime;

        // Generate schedule

        this.input.forEach(entry => {
            if ((match = entry.match(/Guard #(\d+)/))) {
                guard = parseInt(match[1], 10);
                schedule[guard] = schedule[guard] || {
                    dates: {},
                    minutesSlept: 0
                };
            } else if ((match = entry.match(/\[(.+) 00:(\d+)\] falls asleep/))) {
                date = match[1];
                downTime = parseInt(match[2], 10);

                schedule[guard].dates[date] = schedule[guard].dates[date] || {
                    ranges: [],
                    sleeping: {}
                };
            } else if ((match = entry.match(/\[(.+) 00:(\d+)\] wakes up/))) {
                if (date != match[1]) throw new Error('Fuck!');
                upTime = parseInt(match[2], 10);

                schedule[guard].minutesSlept += (upTime - downTime);
                schedule[guard].dates[date].ranges.push([downTime, upTime]);
                for (let i = downTime; i < upTime; i++) {
                    schedule[guard].dates[date].sleeping[i] = 1;
                }
            }
        });

        // Track which minutes were sleepiest by guard

        Object.keys(schedule).forEach(guard => {
            schedule[guard].sleeping = {};
            Object.keys(schedule[guard].dates).forEach(date => {
                Object.keys(schedule[guard].dates[date].sleeping).forEach(minute => {
                    schedule[guard].sleeping[minute] = (schedule[guard].sleeping[minute] || 0) + 1;
                });
            });
            schedule[guard].sleepiestMinute = Object.keys(schedule[guard].sleeping).sort((a, b) => {
                return schedule[guard].sleeping[b] - schedule[guard].sleeping[a];
            })[0];
        });

        // Part 1

        let sleepiestGuard = Object.keys(schedule).sort((a, b) => {
            return schedule[b].minutesSlept - schedule[a].minutesSlept;
        })[0];
        console.log('Sleepiest guard: ' + sleepiestGuard);
        console.log('Best possible minute: ' + schedule[sleepiestGuard].sleepiestMinute);

        // Part 2

        let consistentGuard = Object.keys(schedule).sort((a, b) => {
            return schedule[b].sleeping[schedule[b].sleepiestMinute] -
                   schedule[a].sleeping[schedule[a].sleepiestMinute];
        })[0];
        console.log('Most consistent guard: ' + consistentGuard);
        console.log('Minute slept most: ' + schedule[consistentGuard].sleepiestMinute);
    }
}
module.exports = Day04;
