const isEqual = require("lodash.isequal");

function wordSearch(puzzle, ...words) {
    // Add your code here
    const results = {};

    const rows = puzzle.map(function (row) {
        return row.join('');
    });

    words.forEach(function (word) {
        for (let i = 0; i < rows.length; i++) {
            const index = rows[i].indexOf(word);
            if (index >= 0) {
                results[word] = [
                    [i, index],
                    [i, index + word.length - 1]
              ];
                break;
            }
        }
    });

    if (results.length === words.length) {
        return results;
    }

    const cols = [];


    // flipping the orientation of the array is cumbersome.
    for(let col = 0; col < puzzle[0].length; col++) {
        let colVal = [];
        for (let row = 0; row < puzzle.length; row++) {
            colVal.push(puzzle[row][col]);
        }

        cols.push(colVal.join(''));
    }

    words.forEach(function (word) {
        for (let i = 0; i < cols.length; i++) {
            const index = cols[i].indexOf(word);
            if (index >= 0) {
                results[word] = [
                    [index, i],
                    [index + word.length - 1, i]
                ];
                break;
            }
        }
    });

  return results;
}

module.exports = { wordSearch }
