const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

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


    // flipping the orientation of the array is hard.
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

const EASY_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "d", "e"],
  ["a", "b", "c", "b", "i", "n", "g", "o", "d", "e"],
  ["a", "h", "u", "m", "p", "t", "y", "o", "d", "e"],
  ["h", "b", "i", "n", "e", "a", "b", "c", "d", "e"],
  ["h", "b", "i", "b", "l", "u", "e", "y", "d", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "d", "e"],
];

const MEDIUM_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"],
  ["a", "i", "c", "b", "i", "n", "z", "p", "u", "e"],
  ["a", "n", "u", "m", "p", "t", "y", "o", "m", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"],
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"],
];

const HARD_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"],
  ["a", "i", "c", "b", "i", "o", "z", "p", "u", "e"],
  ["a", "g", "u", "m", "g", "t", "y", "o", "m", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"],
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"],
];

// Test cases
const easyPuzzleResult = wordSearch(
  EASY_WORD_PUZZLE,
  "humpty",
  "bingo",
  "bluey"
);

if (
  isEqual(
    wordSearch(EASY_WORD_PUZZLE, "humpty", "bingo", "bluey"),
    expects.easyPuzzleExpected
  )
) {
  console.log("SUCCESS: Easy puzzle solved");
} else {
  console.log("ERROR: Easy Puzzle failed");
  console.log("Expected:", expects.easyPuzzleExpected);
  console.log("Received:", easyPuzzleResult);
}

const mediumPuzzleResult = wordSearch(
  MEDIUM_WORD_PUZZLE,
  "humpty",
  "bingo",
  "bluey"
);

if (
  isEqual(
    wordSearch(MEDIUM_WORD_PUZZLE, "humpty", "bingo", "bluey"),
    expects.mediumPuzzleExpected
  )
) {
  console.log("SUCCESS: Medium puzzle solved");
} else {
  console.log("ERROR: Medium Puzzle failed");
  console.log("Expected:", expects.mediumPuzzleExpected);
  console.log("Received:", mediumPuzzleResult);
}
