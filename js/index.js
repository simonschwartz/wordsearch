const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

function checkVertical(puzzle, y, x, word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== puzzle[y][x]) {
      return 0
    }
    y++
  }
  return 1
}

function checkDiagonal(puzzle, y, x, word) {
  let n = 0
  //check up diagonal
  let flagup = 1
  //check down diagonal
  let flagdown = 1
  for (let i = 0; i < word.length; i++) {
    if (y + n >= puzzle.length || x + n >= puzzle[y + n].length || word[i] !== puzzle[y + n][x] || flagdown) {
      flagdown = 0
    }

    if (y - n < 0 || x + n >= puzzle.length || word[i] !== puzzle[y - n][x + n]) {
      flagup = 0
    }
    n++;
  }
  //to know which end index to compute
  return flagup ? 1 : (flagdown ? -1 : 0);
}
function wordSearch(puzzle, ...words) {
  const obj = {}

  words.forEach(w => {
    obj[w] = [];
    for (let n = 0; n < puzzle.length; n++) {
      const indices = getAllIndexes(puzzle[n], w[0])
      indices.forEach(i => {
        //horizontal
        if (i + w.length <= puzzle[n].length) {
          if (puzzle[n].slice(i, w.length + i).join("") === w) {
            obj[w].push([n, i], [n, i + w.length - 1])
          }
        }
        //vertical
        if (n + w.length <= puzzle.length) {
          if (checkVertical(puzzle, n, i, w)) {
            obj[w].push([n, i], [n + w.length - 1, i])
          }
        }
        //diagonal
        const res = checkDiagonal(puzzle, n, i, w)
        if (res == 1) {
          //down diagonal
          obj[w].push([n, i], [n - w.length + 1, i + w.length - 1])
        } else if (res == -1) {
          //down diagonal
          obj[w].push([n, i], [n + w.length - 1, i + w.length - 1])
        }
      })
    }
  })

  return obj;
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


const hardPuzzleResult = wordSearch(
  HARD_WORD_PUZZLE,
  "humpty",
  "bingo",
  "bluey"
);

if (
  isEqual(
    wordSearch(HARD_WORD_PUZZLE, "humpty", "bingo", "bluey"),
    expects.hardPuzzleExpected
  )
) {
  console.log("SUCCESS: Hard puzzle solved");
} else {
  console.log("ERROR: Hard Puzzle failed");
  console.log("Expected:", expects.hardPuzzleExpected);
  console.log("Received:", hardPuzzleResult);
}
