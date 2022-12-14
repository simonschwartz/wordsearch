const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

const checkHorizontal = (word, puzzle) => {
  const horizontalWordIndex = puzzle.flat().join('').indexOf(word);

  if (horizontalWordIndex !== -1) {
    // // Calc position from table dimensions - CAVEAT: doesn't validate no-wrap
    const numColumns = puzzle[0].length;
    const rowIndex = Math.floor(horizontalWordIndex / numColumns);
    const startColIndex = horizontalWordIndex % numColumns;
    const endColIndex = startColIndex + word.length - 1;

    // // Safer but slower method - does validate no-wrap
    // const rowIndex = puzzle.map(row => row.join('')).findIndex(rowString => rowString.indexOf(word) !== -1);
    // const startColIndex = puzzle[rowIndex].join('').indexOf(word);
    // const endColIndex = startColIndex + word.length - 1;

    return {
      horizontalWord: word,
      horizontalStartPos: [rowIndex, startColIndex],
      horizontalEndPos: [rowIndex, endColIndex]
    }
  }
  return null;
}

const checkVertical = (word, puzzle) => {
  const columnStrings = {}
  let hasVerticalWord = false,
      columnIndex,
      startRowIndex,
      endRowIndex;

  // Add column index properties and generate values
  for (const [key, val] of puzzle.flat().entries()) {
    // console.log(key, val);
    const column = key % puzzle[0].length;
    columnStrings[column] = columnStrings[column] ? columnStrings[column] + val : val;
  }

  // Check columns (strings) for word match
  for (const [key, val] of Object.entries(columnStrings)) {
    if (val.indexOf(word) !== -1) {
      hasVerticalWord = true;
      columnIndex = Number(key);
      startRowIndex = val.indexOf(word);
      endRowIndex = startRowIndex + word.length -1;
    }
  }

  if (hasVerticalWord) {
    return {
    verticalWord: word,
    verticalStartPos: [startRowIndex, columnIndex],
    verticalEndPos: [endRowIndex, columnIndex]
    }
  }
  return null;
}

function wordSearch(puzzle, ...words) {
  const results = {};

  words.forEach(word => {
    // Check horizontal
    const {horizontalWord,horizontalStartPos,horizontalEndPos} = checkHorizontal(word, puzzle) || {};
    if (horizontalWord) {
      return results[horizontalWord] = [horizontalStartPos, horizontalEndPos];
    }

    // Check vertical
    const {verticalWord, verticalStartPos, verticalEndPos} = checkVertical(word, puzzle) || {};
    if (verticalWord) {
      return results[verticalWord] = [verticalStartPos, verticalEndPos];
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

// const hardPuzzleResult = wordSearch(
//     HARD_WORD_PUZZLE,
//     "humpty",
//     "bingo",
//     "bluey"
// );

// if (
//     isEqual(
//         wordSearch(HARD_WORD_PUZZLE, "humpty", "bingo", "bluey"),
//         expects.hardPuzzleExpected
//     )
// ) {
//   console.log("SUCCESS: Hard puzzle solved");
// } else {
//   console.log("ERROR: Hard Puzzle failed");
//   console.log("Expected:", expects.hardPuzzleExpected);
//   console.log("Received:", hardPuzzleResult);
// }
