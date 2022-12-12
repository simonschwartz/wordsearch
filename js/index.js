const isEqual = require("lodash.isequal");
const expects = require("./expects.js");
const utils = require("./utils.js");

const log = utils.debugLog;

function wordSearch(puzzle, ...words) {
  log(`word search starting`, utils.logLevels.INFO);

  // create return result
  var returnResult = {};

  // traverse each cell in puzzle table
  var puzzleWidth = puzzle[0].length; // assume puzzle ot be rectangular
  var puzzleHeight = puzzle.length;

  log(`puzzleWidth: ${puzzleWidth} -- puzzleHeight: ${puzzleHeight}`, utils.logLevels.DEBUG);
  
  var currentXPos = 0;
  var currentYPos = 0;
  while (currentYPos < puzzleHeight) {
    while (currentXPos < puzzleWidth) {
      log(`checking position: ${currentXPos}, ${currentYPos}`, utils.logLevels.DEBUG);

      var initCellValue = puzzle[currentYPos][currentXPos];

      log(`initCellValue : ${initCellValue}`, utils.logLevels.DEBUG);

      // for each word in words
      words.forEach(function(word, _) {
        log(`word: ${word}`, utils.logLevels.DEBUG);

        // check whether cell is equal to first letter of word
        if (word.charAt(0) == initCellValue) {
          // if yes... store current cell values as current "starting point"
          var startingPoint = [currentXPos, currentYPos];

          log(`word: ${word} -- startingPoint: ${startingPoint}`, utils.logLevels.TRACE);

          //for each direction defined...
          for(var directionName in utils.directions) {
            var direction = utils.directions[directionName];
            log(`directionName: ${directionName}`, utils.logLevels.DEBUG);

            // check whether there is room in this direction to find solution
            if (direction.solutionFits(word, startingPoint, puzzleWidth, puzzleHeight)) {
              log(`solution fits -- word: ${word} -- startingPoint: ${startingPoint} -- directionName: ${directionName}`, utils.logLevels.TRACE);

              // if yes the check each character in that direction, until one fails
              isSolution = true; // <--- assume solution is valid until proved otherwise
              currentCell = startingPoint;
              for (var charPos = 1; charPos < word.length && isSolution; charPos++) {
                currentCell = direction.nextCell(currentCell);
                log(`solution fits -- word: ${word} -- startingPoint: ${startingPoint} -- directionName: ${directionName} -- currentCell: ${currentCell}`, utils.logLevels.DEBUG);
                currentCellValue = puzzle[currentCell[1]][currentCell[0]];
                if (currentCell[0] < 0 || currentCell[1] < 0 || currentCell[0] >= puzzleWidth || currentCell[1] >= puzzleHeight || word.charAt(charPos) != currentCellValue) {
                  isSolution = false;
                  continue
                };
              };

              // if you get to end of word, store current cell as "end point"
              log(`charPos: ${charPos} -- word length: ${word.length}`, utils.logLevels.TRACE);

              if (isSolution) {
                // store "starting point" and "end point" as solution against word in return object
                // NB: I had assumed in design that the points were in [x, y] format - bu it turns out it is in [y, x] format - so it needs to be sqapped at last moment
                // this could be tidied up if I had more time - i.e. you could design the whole thing to be [y, x] from the top down
                returnResult[word] = [[startingPoint[1], startingPoint[0]], [currentCell[1], currentCell[0]]];
              };
            } else {
              log(`solution does not fit -- word: ${word} -- startingPoint: ${startingPoint} -- direction: ${directionName}`, utils.logLevels.TRACE);
              // if no, stop this is not a solution
            }
          };
        } else {
          // if no, stop this cell is not the start of a solution
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

const EXTRA_HARD_WORD_PUZZLE = [
  ["h", "b", "i", "n", "e", "a", "b", "c", "y", "e"],
  ["a", "i", "c", "b", "i", "b", "z", "p", "t", "e"],
  ["a", "g", "u", "m", "i", "t", "y", "o", "p", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "m", "e"],
  ["h", "o", "g", "y", "e", "u", "l", "b", "u", "e"],
  ["h", "o", "i", "b", "l", "u", "o", "z", "h", "e"],
];

// Test case - easy
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

// Test case - medium
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

// Test case - hard
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

// Test case - extra hard
const extraHardPuzzleResult = wordSearch(
  EXTRA_HARD_WORD_PUZZLE,
  "humpty",
  "bingo",
  "bluey"
);

if (
  isEqual(
    wordSearch(EXTRA_HARD_WORD_PUZZLE, "humpty", "bingo", "bluey"),
    expects.extraHardPuzzleExpected
  )
) {
  console.log("SUCCESS: Extra Hard puzzle solved");
} else {
  console.log("ERROR: Extra Hard Puzzle failed");
  console.log("Expected:", expects.extraHardPuzzleExpected);
  console.log("Received:", extraHardPuzzleResult);
}