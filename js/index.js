const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

const DIRECTIONS = {
  0: { xOffset: 1, yOffset: 0},
  45: { xOffset: 1, yOffset: -1},
  90: { xOffset: 0, yOffset: -1},
  135: { xOffset: -1, yOffset: -1},
  180: { xOffset: -1, yOffset: 0},
  225: { xOffset: -1, yOffset: 1},
  270: { xOffset: 0, yOffset: 1},
  315: { xOffset: 1, yOffset: 1}
}

function wordSearch(puzzle, ...words) {
  const searchResults = {}
  words.forEach(word => searchResults[word] = findWord(puzzle, word))
  return searchResults
}

/**
 * Scans an x by y puzzle for words.
 * @param {string[][]} puzzle The puzzle to scan for a word.
 * @param {string} word The word to find within the puzzle.
 * @return {Number[][]} Returns the start and end coordinates if found,
 *                        or undefined if not found.
 */
function findWord(puzzle, word) {
  for (let y = 0, columnLength = puzzle.length; y < columnLength; y++)
    for (let x = 0, rowLength = puzzle[y].length; x < rowLength; x++) {
      const wordRow = getWordLine(puzzle, word, x, y)
      if (wordRow)
        return wordRow
    }
}

/**
 * Scans each applicable direction in the puzzle, starting at coordinates x,y
 * for the word.
 * @param {string[][]} puzzle The puzzle to scan for a word.
 * @param {string} word The word to find within the puzzle.
 * @param {number} x The current X coordinate in the puzzle to append.
 * @param {number} y The current Y coordinate in the puzzle to append.
 * @return {Number[][]}} Returns the start and end coordinates if found,
 *                                  or undefined if not found.
 */
function getWordLine(puzzle, word, x, y) {
  // We're choosing y, x as our puzzle is laid out in this arrangement
  const candidateLetter = puzzle[y][x]
  const startingLetter = word.charAt(0)
  
  // Not an interesting letter to scan directions. Short-circuit here.
  if (candidateLetter!==startingLetter)
    return

  const wordLength = word.length - 1
  
  // Look for strings in each direction, starting with this letter
  for (direction in DIRECTIONS) {
    const candidateWord = getCandidateLine(puzzle, direction, x, y, wordLength)
    
    // If we have a match, then report it and return here.
    if (candidateWord === word) {
      const scanDirection = DIRECTIONS[direction]
      // Reporting y, x as our expects is laid out in this arrangement
      const start = [ y, x ]
      const end = [
        y + scanDirection.yOffset * wordLength,
        x + scanDirection.xOffset * wordLength
      ]
      return [start, end]
    }
    // Otherwise, we try the next direction.
  }
}

/**
 * Builds an N-letter string out of a straight line in the puzzle, based on the
 * directions specified in our DIRECTIONS constant above.
 * @param {string[][]} puzzle The puzzle to scan for a word.
 * @param {number} direction The angle to build a string from.
 * @param {number} x The current X coordinate in the puzzle to append.
 * @param {number} y The current Y coordinate in the puzzle to append.
 * @param {number} wordLengthRemaining The number of future characters to gather.
 * @param {string} candidateString The string built so far from the line.
 * @returns {string}  Returns the string formed from N number of letters in the
 *                    specified direction within the puzzle
 */
function getCandidateLine(puzzle, direction, x, y, wordLengthRemaining, candidateString = "") {
  // Short-circuit if this index does not exist in the puzzle
  // and return undefined as because we haven't satisfied our word length
  if (x < 0 || y < 0 || !puzzle[y] || !puzzle[y][x])
    return
  
  // If this coordinate is valid, append this character to our candidate string
  // Using y, x as our expects is laid out in this arrangement
  candidateString += puzzle[y][x]
  
  // Return here if we've found the right word length
  if (wordLengthRemaining === 0)
    return candidateString

  // OR
  // Figure out our next character to append based on the direction indicated
  const scanDirection = DIRECTIONS[direction]
  const xNext = x + scanDirection.xOffset
  const yNext = y + scanDirection.yOffset
  
  // Append the next character in our line recursively
  return getCandidateLine(
    puzzle,
    direction,
    xNext,
    yNext,
    wordLengthRemaining - 1,
    candidateString
  )
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
