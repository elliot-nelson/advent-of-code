class Day07 {
    constructor(input) {
        this.input = input;
    }

    ready(graph, completed) {
        let result = [];
        Object.keys(graph).forEach(key => {
            if (completed[key]) return;

            for (let i = 0; i < graph[key].prev.length; i++) {
                if (!completed[graph[key].prev[i]]) return;
            }

            result.push(key);
        });

        return result;
    }

    timeToComplete(key) {
        return 61 + (key.charCodeAt(0) - 'A'.charCodeAt(0));
    }

    run() {
        let graph = {};
        let completed = {};
        this.input.forEach(line => {
            let match = line.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./);
            if (!graph[match[1]]) { graph[match[1]] = { prev: [], next: [] }; }
            if (!graph[match[2]]) { graph[match[2]] = { prev: [], next: [] }; }

            graph[match[1]].next.push(match[2]);
            graph[match[2]].prev.push(match[1]);
        });

        // Part 1

        let totalKeys = Object.keys(graph).length;
        let finished = [];

        while (finished.length < totalKeys) {
            let next = this.ready(graph, completed).sort()[0];
            completed[next] = true;
            finished.push(next);
            console.log(finished.join(''));
        }

        // Part 2
        let pending = graph;
        let time = -1;
        let workers = [null, null, null, null, null];

        completed = {};
        finished = [];

        while (finished.length < totalKeys) {
            time++;

            for (let i = 0; i < workers.length; i++) {
                if (workers[i] && time >= workers[i][1]) {
                    completed[workers[i][0]] = true;
                    finished.push(workers[i][0]);
                    workers[i] = null;
                }
            }

            let ready = this.ready(pending, completed).sort();

            for (let i = 0; i < workers.length; i++) {
                if (!workers[i] && ready.length > 0) {
                    workers[i] = [
                        ready[0],
                        time + this.timeToComplete(ready[0])
                    ];
                    delete pending[ready[0]];
                    ready.shift();
                }
            }

            console.log([time, finished.join(''), workers]);
        }

        console.log(finished.join(''));
        console.log(time);
    }
}
module.exports = Day07;
