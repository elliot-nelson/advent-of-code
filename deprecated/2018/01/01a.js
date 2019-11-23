// Advent of Code 2018 01a+b
//
// TODO: Someday, fix this sloppy code ¯\_(ツ)_/¯

var x = require('fs').readFileSync('input.txt', 'utf8').split('\n')
var lines = x;
var y = 0;
var hash = {};
for (var i = 0; i <1000; i++) {
    lines.map(x => parseInt(x, 10)).forEach(x => {
        console.log(x);
        if (x) {
            y+=x;
            hash[y] = (hash[y]||0) + 1;
            if (hash[y] > 1) {
                console.log(" = " + y);
                process.exit(1);
            }
        }
    });
}
console.log(y);
