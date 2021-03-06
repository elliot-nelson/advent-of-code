// Advent of Code 2018 Day xxa

module.exports = {
    mdSum: 0,

    read(data) {
        let childCount = data.shift();
        let mdCount = data.shift();

        let node = {
            children: [],
            metadata: []
        };
        for (let i = 0; i < childCount; i++) {
            node.children.push(this.read(data));
        }
        for (let i = 0; i < mdCount; i++) {
            let md = data.shift();
            this.mdSum += md;
            node.metadata.push(md);
        }
        return node;
    },

    value(node) {
        if (node.value !== undefined) return node.value;

        if (node.children.length === 0) {
            node.value = 0;
            node.metadata.forEach(md => node.value += md);
        } else {
            node.value = 0;
            node.metadata.forEach(md => {
                if (md > 0 && node.children[md - 1]) node.value += this.value(node.children[md - 1]);
            });
        }

        return node.value;
    },

    run(input) {
        let data = input[0].split(' ').map(x => parseInt(x, 10));
        let root = this.read(data);

        console.log(root);
        console.log(this.mdSum);
        console.log(this.value(root));
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
