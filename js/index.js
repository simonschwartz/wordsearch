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

  // Each puzzle relied on popuating a flattened string and then
  // doing an Array.indexOf over the string.

  // horizontal - easy
  const flattenedArrHorizontal = puzzle.flat().join('');

  // vertical - medium
  let puzzleRotated = []
  const puzzleCopy = puzzle.map(x => x.slice());
  for (let i = 0; i < xLen; i++){
    puzzleRotated = puzzleRotated.concat(puzzleCopy.map(row => row.shift()))
  }
  flattenedArrVertical = puzzleRotated.flat().join('')

  // // diagonal
  // let diagonalCoordArray = []
  // let flattenedArrDiagonal = '';
  // for (let i = 0; i< yLen-1; i++){
  //   let xId = i
  //   let yId = 0
  //   let tmpArr = []
  //   while (xId >= 0){
  //     diagonalCoordArray.push([xId,yId])
  //     tmpArr.push([xId,yId])
  //     flattenedArrDiagonal += puzzle[xId,yId]
  //     xId = xId - 1
  //     yId = yId + 1
  //   }
  //   console.log(tmpArr)
  // }
  // console.log('-')
  // for (let i = 0; i< yLen-1; i++){
  //   let xId = yLen-i-1;
  //   let yId = i
  //   let tmpArr = [];

  //   while (xId > 0){
  //     diagonalCoordArray.push([yLen-1, yId])
  //     tmpArr.push([yLen-1, yId])
  //     flattenedArrDiagonal += puzzle[yLen-1, yId]
  //     xId = xId - 1;
  //     yId = yId + 1
  //   }
  //   console.log(tmpArr)
  // }

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
  ["h", "b", "i", "n", "e", "a", "b", "c", "h", "e"],
  ["a", "i", "c", "b", "i", "o", "z", "p", "u", "e"],
  ["a", "g", "u", "m", "g", "t", "y", "o", "m", "e"],
  ["h", "g", "i", "n", "e", "a", "b", "c", "p", "e"],
  ["h", "o", "i", "b", "l", "u", "e", "y", "t", "e"],
  ["h", "b", "i", "b", "l", "u", "o", "z", "y", "e"],
];

// Test cases
const testcases = [
  { name: 'easy', tc: EASY_WORD_PUZZLE, expected: expects.easyPuzzleExpected, got: null },
  { name: 'medium', tc: MEDIUM_WORD_PUZZLE, expected: expects.mediumPuzzleExpected, got: null },
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