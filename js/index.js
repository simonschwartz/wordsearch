const isEqual = require("lodash.isequal");
const expects = require("./expects.js");

function debug(...s){
  return
  console.log('DEBUG:',...s)
}

function wordSearch(puzzle, ...words) {
  const xLen = puzzle[0].length
  const yLen = puzzle.length

  // populate answer array: { bluey: null, chilli: null, humpty: null }
  expected = {}
  words.forEach(word => expected[word] = null)

  // horizontal - easy
  // - Flatten array
  // - Word search (flattenedArray.indexOf(targetWord))
  const flattenedArrHorizontal = puzzle.flat().join('');

  // vertical - medium
  // - Rotate the array 90 degrees clockwise
  // - Flatten array.
  // - Word search (flattenedArray.indexOf(targetWord))
  let puzzleRotated = []
  const puzzleCopy = puzzle.map(x => x.slice());
  for (let i = 0; i < xLen; i++){
    puzzleRotated = puzzleRotated.concat(puzzleCopy.map(row => row.shift()))
  }
  flattenedArrVertical = puzzleRotated.flat().join('')

  // find words - for the easy + med puzzle
  words.forEach(word => {
    found = flattenedArrHorizontal.indexOf(word);
    debug('finding:h:', word, found)
    if (found !== -1){
      row = Math.floor(found/xLen)
      col = found % xLen
      expected[word] = [[ row, col ], [row, col + word.length - 1]]
      return
    }

    // vertical
    found = flattenedArrVertical.indexOf(word)
    debug('finding:v:', word, found)
    if (found !== -1) {
      row = Math.floor(found/yLen) // which col is it in
      col = found % yLen // which row is it in
      expected[word] = [[col, row], [col + word.length -1 , row ]]
    }
  })

  // find words - for the hard puzzle.
  // - ss

  return expected;
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
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"], // shift -5, row.slice(5).concat(row.slice(0,5))
  ["a", "i", "c", "b", "i", "o", "z", "p", "u", "e"], // shift -4, row.slice(4).concat(row.slice(0,4))
  ["a", "g", "u", "m", "g", "t", "y", "o", "m", "e"], // shift -3, row.slice(3).concat(row.slice(0,3))
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"], // shift -2, row.slice(2).concat(row.slice(0,2))
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"], // shift -1, row.slice(1).concat(row.slice(0,1))
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"],
// sh-0, sh-1, sh2, sh-3...
];

// Test cases
const testcases = [
  // { name: 'easy', tc: EASY_WORD_PUZZLE, expected: expects.easyPuzzleExpected, got: null },
  // { name: 'medium', tc: MEDIUM_WORD_PUZZLE, expected: expects.mediumPuzzleExpected, got: null },
  { name: 'hard', tc: HARD_WORD_PUZZLE, expected: expects.hardPuzzleExpected, got: null }
]
testcases.forEach((tc) => {
  result = wordSearch( tc.tc, "humpty", "bingo", "bluey");
  if (
    isEqual(
      result,
      tc.expected
    )
  ) {
    console.log(`SUCCESS: ${tc.name} puzzle solved`);
  } else {
    console.log(`ERROR: ${tc.name} Puzzle failed`);
    console.log("Expected:", tc.expected);
    console.log("Received:", result);
  }
})