const isEqual = require('lodash.isequal');
const wordSearch = require('./index.js').wordSearch;
const expects = require('./expects.js');

const failedTests = [];

const EASY_WORD_PUZZLE = [
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
    ['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e']
];

const MEDIUM_WORD_PUZZLE = [
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
    ['a', 'i', 'c', 'b', 'i', 'n', 'z', 'p', 'u', 'e'],
    ['a', 'n', 'u', 'm', 'p', 't', 'y', 'o', 'm', 'e'],
    ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
    ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e']
];

const HARD_WORD_PUZZLE = [
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
    ['a', 'i', 'c', 'b', 'i', 'o', 'z', 'p', 'u', 'e'],
    ['a', 'g', 'u', 'm', 'g', 't', 'y', 'o', 'm', 'e'],
    ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
    ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e']
];

// Test cases
(function () {
    const easyPuzzleResult = wordSearch(EASY_WORD_PUZZLE, 'humpty', 'bingo', 'bluey');

    test('Easy Word Puzzle', wordSearch(EASY_WORD_PUZZLE, 'humpty', 'bingo', 'bluey'), expects.easyPuzzleExpected);

    const mediumPuzzleResult = wordSearch(MEDIUM_WORD_PUZZLE, 'humpty', 'bingo', 'bluey');

    test(
        'Medium Word Puzzle',
        wordSearch(MEDIUM_WORD_PUZZLE, 'humpty', 'bingo', 'bluey'),
        expects.mediumPuzzleExpected
    );

    test('horizontal result', wordSearch(['matilda'.split('')], 'matilda'), {
        matilda: [
            [0, 0],
            [0, 6]
        ]
    });

    test('horizontal result 2', wordSearch(['matilda'.split('')], 'matilda', 'til'), {
        matilda: [
            [0, 0],
            [0, 6]
        ],
        til: [
            [0, 2],
            [0, 4]
        ]
    });

    if (failedTests.length > 0) {
        failedTests.forEach((failedTest) => console.error(JSON.stringify(failedTest)));

        process.exit(1);
    }

    console.log('Test successful');
    process.exit(0);
})();

function test(testName, expected, actual) {
    if (isEqual(expected, actual) === false) {
        failedTests.push([testName, expected, actual]);
    }
}
