const isEqual = require('lodash.isequal');
const expects = require('./expects.js');

function wordSearch(puzzle, ...words) {
	// Add your code here
	// console.log('Hello puzzle>>>');
	// console.log(puzzle);
	const result = {};
	// Horizontal:
	for (i = 0; i < words.length; i++) {
		const currWord = words[i];
		for (j = 0; j < puzzle.length; j++) {
			const text = puzzle[j].join('');
			if (text.includes(currWord)) {
				result[currWord] = [
					[j, text.indexOf(currWord)],
					[j, text.indexOf(currWord) + currWord.length - 1],
				];
				break;
			}
		}
	}

	const resultAfterHorizontalCheck = Object.keys(result);
	const wordsAfterHorizontalCheck = [];
	for (i = 0; i < words.length; i++) {
		if (resultAfterHorizontalCheck.indexOf(words[i]) === -1) {
			wordsAfterHorizontalCheck.push(words[i]);
		}
	}

	// Vertial:
	if (wordsAfterHorizontalCheck.length > 0) {
		for (i = 0; i < wordsAfterHorizontalCheck.length; i++) {
			const currWord = wordsAfterHorizontalCheck[i];
			const puzzleWidth = puzzle[0].length;
			const puzzleHeight = puzzle.length;
			for (j = 0; j < puzzleWidth; j++) {
				const strArr = [];
				for (k = 0; k < puzzleHeight; k++) {
					strArr.push(puzzle[k][j]);
				}
				const text = strArr.join('');
				if (text.includes(currWord)) {
					result[currWord] = [
						[text.indexOf(currWord), j],
						[text.indexOf(currWord) + currWord.length - 1, j],
					];
					break;
				}
			}
		}
	}

	const resultAfterVertialCheck = Object.keys(result);
	const wordsAfterVertialCheck = [];
	for (i = 0; i < words.length; i++) {
		if (resultAfterVertialCheck.indexOf(words[i]) === -1)
			wordsAfterVertialCheck.push(words[i]);
	}
	// console.log('wordsAfterVertialCheck >>>>>>>> ', wordsAfterVertialCheck);

	// Diagnal
	if (wordsAfterVertialCheck.length > 0) {
		for (i = 0; i < wordsAfterVertialCheck.length; i++) {
			const currWord = wordsAfterVertialCheck[i];
			const puzzleWidth = puzzle[0].length;
			const puzzleHeight = puzzle.length;

			for (j = 0; j < puzzleHeight; j++) {
				const strArrDiagnalLeftFirst = [];
				for (k = 0; k <= j; k++) {
					if (k < puzzleWidth) strArrDiagnalLeftFirst.push(puzzle[j - k][k]);
				}
				const text = strArrDiagnalLeftFirst.join('');

				if (text.includes(currWord)) {
					result[currWord] = [
						[j - text.indexOf(currWord), text.indexOf(currWord)],
						[
							j - text.indexOf(currWord) - currWord.length + 1,
							text.indexOf(currWord) + currWord.length - 1,
						],
					];
					break;
				}
			}

			for (j = 1; j < puzzleWidth; j++) {
				const strArrDiagnalBtmFirst = [];
				for (k = 0; k < puzzleHeight; k++) {
					strArrDiagnalBtmFirst.push(puzzle[puzzleHeight - k - 1][j + k]);
				}
				const text = strArrDiagnalBtmFirst.join('');
				// console.log('text diagnal >>> ', text);
				if (text.includes(currWord)) {
					result[currWord] = [
						[k - 1, j],
						[puzzleHeight - k + 1, text.indexOf(currWord) + currWord.length],
					];
					break;
				}
			}
		}
	}

	return result;
}

const EASY_WORD_PUZZLE = [
	['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
	['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
	['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
	['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
	['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
	['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e'],
];

const MEDIUM_WORD_PUZZLE = [
	['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
	['a', 'i', 'c', 'b', 'i', 'n', 'z', 'p', 'u', 'e'],
	['a', 'n', 'u', 'm', 'p', 't', 'y', 'o', 'm', 'e'],
	['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
	['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
	['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
];

const HARD_WORD_PUZZLE = [
	['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
	['a', 'i', 'c', 'b', 'i', 'o', 'z', 'p', 'u', 'e'],
	['a', 'g', 'u', 'm', 'g', 't', 'y', 'o', 'm', 'e'],
	['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
	['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
	['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
];

// Test cases
const hardPuzzleResult = wordSearch(
	HARD_WORD_PUZZLE,
	'humpty',
	'bingo',
	'bluey'
);

if (
	isEqual(
		wordSearch(HARD_WORD_PUZZLE, 'humpty', 'bingo', 'bluey'),
		expects.hardPuzzleExpected
	)
) {
	console.log('SUCCESS: Hard puzzle solved');
} else {
	console.log('ERROR: Hard Puzzle failed');
	console.log('Expected:', expects.hardPuzzleExpected);
	console.log('Received:', hardPuzzleResult);
}
