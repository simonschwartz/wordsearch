const isEqual = require("lodash.isequal");
const expects = require("./expects.js");
const utils = require("./utils.js");

const log = utils.debugLog;

// init vars
var returnResult = {};
var directionName = "";
var isSolution = true;
var currentCell = [];
var charPos = 0;
var currentCellValue = "";

function wordSearch(puzzle, ...words) {
  const puzzleWidth = puzzle[0].length; // assume puzzle ot be rectangular
  const puzzleHeight = puzzle.length;

  var currentXPos = 0;
  var currentYPos = 0;

  log(`word search starting`, utils.logLevels.INFO);

  // traverse each cell in puzzle array
  log(`puzzleWidth: ${puzzleWidth} -- puzzleHeight: ${puzzleHeight}`, utils.logLevels.DEBUG);
  while (currentYPos < puzzleHeight) {
    while (currentXPos < puzzleWidth) {
      const initCellValue = puzzle[currentYPos][currentXPos];
      log(`initCellValue : ${initCellValue} -- checking position: ${currentXPos}, ${currentYPos}`, utils.logLevels.DEBUG);

      // for each word in words
      words.forEach(function(word, _) {
        log(`word: ${word}`, utils.logLevels.DEBUG);

        // check whether cell is equal to first letter of word
        if (word.charAt(0) === initCellValue) {
          // if yes... store current cell values as current "starting point"
          const startingPoint = [currentXPos, currentYPos];

          log(`word: ${word} -- startingPoint: ${startingPoint}`, utils.logLevels.TRACE);

          //for each direction defined
          for (directionName in utils.directions) {
            const direction = utils.directions[directionName];
            log(`directionName: ${directionName}`, utils.logLevels.DEBUG);

            // check whether there is room in this direction to find solution
            if (direction.solutionFits(word, startingPoint, puzzleWidth, puzzleHeight)) {
              log(`solution fits -- word: ${word} -- startingPoint: ${startingPoint} -- directionName: ${directionName}`, utils.logLevels.TRACE);

              // if yes the check each character in that direction, until one fails
              isSolution = true; // <--- assume solution is valid until proved otherwise
              currentCell = startingPoint;
              for (charPos = 1; charPos < word.length && isSolution; charPos += 1) {
                currentCell = direction.nextCell(currentCell);
                log(`solution fits -- word: ${word} -- startingPoint: ${startingPoint} -- directionName: ${directionName} -- currentCell: ${currentCell}`, utils.logLevels.DEBUG);
                currentCellValue = puzzle[currentCell[1]][currentCell[0]];
                if (currentCell[0] < 0 || currentCell[1] < 0 || currentCell[0] >= puzzleWidth || currentCell[1] >= puzzleHeight || word.charAt(charPos) !== currentCellValue) {
                    isSolution = false;
                }
              }

              // if you get to end of word, store current cell as "end point"
              log(`charPos: ${charPos} -- word length: ${word.length}`, utils.logLevels.TRACE);

              if (isSolution) {
                // store "starting point" and "end point" as solution against word in return object
                // NB: I had assumed in design that the points were in [x, y] format - bu it turns out it is in [y, x] format - so it needs to be swapped at last moment
                // this could be tidied up if I had more time - i.e. you could design the whole thing to be [y, x] from the top down
                returnResult[word] = [[startingPoint[1], startingPoint[0]], [currentCell[1], currentCell[0]]];
              }
            } else {
              log(`solution does not fit -- word: ${word} -- startingPoint: ${startingPoint} -- directionName: ${directionName}`, utils.logLevels.TRACE);
              // if no, stop this is not a solution
            }
          }
        }
      });
      currentXPos += 1;
    }
    currentXPos = 0;
    currentYPos += 1;
  }
  log(`word search ending`, utils.logLevels.INFO);

  return returnResult;
}

// tests - puzzle 2D arrays
const EASY_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "d", "e"],
  ["a", "b", "c", "b", "i", "n", "g", "o", "d", "e"],
  ["a", "h", "u", "m", "p", "t", "y", "o", "d", "e"],
  ["h", "b", "i", "n", "e", "a", "b", "c", "d", "e"],
  ["h", "b", "i", "b", "l", "u", "e", "y", "d", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "d", "e"]
];

const MEDIUM_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"],
  ["a", "i", "c", "b", "i", "n", "z", "p", "u", "e"],
  ["a", "n", "u", "m", "p", "t", "y", "o", "m", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"],
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"]
];

const HARD_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"],
  ["a", "i", "c", "b", "i", "o", "z", "p", "u", "e"],
  ["a", "g", "u", "m", "g", "t", "y", "o", "m", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"],
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"]
];

const EXTRA_HARD_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "y", "e"],
  ["a", "i", "c", "b", "i", "b", "z", "p", "t", "e"],
  ["a", "g", "u", "m", "i", "t", "y", "o", "p", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "m", "e"],
  ["h", "o", "g", "y", "e", "u", "l", "b", "u", "e"],
  ["h", "o", "i", "b", "l", "u", "o", "z", "h", "e"]
];

// tests - words
const testWords = [
  "humpty",
  "bingo",
  "bluey"
];

// tests - list
const tests = [
  {
    description: "Easy",
    expected: expects.easyPuzzleExpected,
    puzzle: EASY_WORD_PUZZLE
  },
  {
    description: "Medium",
    expected: expects.mediumPuzzleExpected,
    puzzle: MEDIUM_WORD_PUZZLE
  },
  {
    description: "Hard",
    expected: expects.hardPuzzleExpected,
    puzzle: HARD_WORD_PUZZLE
  },
  {
    description: "Extra Hard",
    expected: expects.extraHardPuzzleExpected,
    puzzle: EXTRA_HARD_WORD_PUZZLE
  }
];

// tests - run thwm
function runTest(item, _) {
  const puzzleResult = wordSearch(
    EASY_WORD_PUZZLE,
    ...testWords
  );

  if (isEqual(
      wordSearch(item.puzzle, "humpty", "bingo", "bluey"),
      item.expected
    )
  ) {
    console.log(`SUCCESS: ${item.description} puzzle solved`);
  } else {
    console.log(`ERROR: ${item.description} Puzzle failed`);
    console.log("Expected:", item.expected);
    console.log("Received:", puzzleResult);
  }
}

tests.forEach(runTest);