const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

function wordSearch(puzzle, ...words) {
  // Add your code here
  // Direction is stored as Y then X
  var direction = [
    [0, 1],
    [1, 1],
    [-1, 1],
    [1, 0],
  ];
  var resultsArr = {};

  words.forEach((word) => {
    for (let indexY = 0; indexY < puzzle.length; indexY++) {
      for (let indexX = 0; indexX < puzzle[indexY].length; indexX++) {
        direction.forEach((element) => {
          if (
            validateWordFits(
              element,
              indexX,
              indexY,
              puzzle[indexY].length,
              puzzle.length,
              word.length
            )
          ) {
            var start = [indexY, indexX];
            var currentX = indexX;
            var currentY = indexY;
            var foundWordFlag = true;
            for (let index = 0; index < word.length && foundWordFlag; index++) {
              if (foundWordFlag) {
                currentY = start[0] + index * element[0];
                currentX = start[1] + index * element[1];
              }
              foundWordFlag = word.charAt(index) == puzzle[currentY][currentX];
            }
            if (foundWordFlag) {
              resultsArr[word] = [start, [currentY, currentX]];
            }
          }
        });
      }
    }
  });

  console.log(resultsArr);
  return resultsArr;
}

function validateWordFits(
  direction,
  currentX,
  currentY,
  maxXLength,
  maxYLength,
  wordLength
) {
  var xMath = direction[1] * wordLength + currentX;
  var yMath = direction[0] * wordLength + currentY;
  return xMath <= maxXLength && yMath <= maxYLength && xMath >= 0 && yMath >= 0;
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
