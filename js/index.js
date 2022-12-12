const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

function wordSearch(puzzle, ...words) {
  // Add your code here
  // Direction is stored as Y then X
  // -1  search backwards
  // 0 does nothing
  // 1 search forwards
  var directions = [
    { y: 0, x: 1 },
    { y: 1, x: 1 },
    { y: -1, x: 1 },
    { y: 1, x: 0 },
  ];
  return wordSearchLoopBased(directions, puzzle, ...words);
}

function wordSearchLoopBased(directions, puzzle, ...words) {
  var resultsArr = {};
  // Time complexity worst case per word is O(D*R-len(W)*C-len(W)*len(W)).
  // D = Direction
  // R = Row
  // C = Column
  // W = Word
  words.forEach((word) => {
    directions.forEach((direction) => {
      let yValidLocations = identifyValidAxisStartEnd(
        direction.y,
        word.length,
        puzzle.length
      );
      for (
        let indexY = yValidLocations.start;
        indexY < yValidLocations.end;
        indexY++
      ) {
        let xValidLocations = identifyValidAxisStartEnd(
          direction.x,
          word.length,
          puzzle[indexY].length
        );
        for (
          let indexX = xValidLocations.start;
          indexX < xValidLocations.end;
          indexX++
        ) {
          var start = [indexY, indexX];
          var currentX = indexX;
          var currentY = indexY;
          var foundWordFlag = true;
          for (let index = 0; index < word.length && foundWordFlag; index++) {
            if (foundWordFlag) {
              currentY = start[0] + index * direction.y;
              currentX = start[1] + index * direction.x;
            }
            foundWordFlag = word.charAt(index) == puzzle[currentY][currentX];
          }
          if (foundWordFlag) {
            resultsArr[word] = [start, [currentY, currentX]];
          }
        }
      }
    });
  });
  return resultsArr;
}

/**
 * Function uses math to identify valid locations a word can exist in within an array
 *
 * @param {*} axisDirection x or y expected values 1 0 -1
 * @param {*} wordLength
 * @param {*} arrLength row or column length
 * @return {*}
 */
function identifyValidAxisStartEnd(axisDirection, wordLength, arrLength) {
  let axisDirectionLength = axisDirection * wordLength;
  let axisStartCalc = 0 - axisDirectionLength - 1;
  let axisStart = 0 < axisStartCalc ? axisStartCalc : 0;
  let axisEndCalc = arrLength - axisDirectionLength + 1;
  let axisEnd = arrLength > axisEndCalc ? axisEndCalc : arrLength;
  return { start: axisStart, end: axisEnd };
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
