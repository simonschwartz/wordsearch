const isEqual = require('lodash.isequal');
const expects = require('./expects.js');

function wordSearch(puzzle, ...words) {
	const puzzleWidth = puzzle[0].length;
	const puzzleHeight = puzzle.length;
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
			let firstLetterIdxY = 0;
			let firstLetterIdxX = 0;
			let lastLetterIdxY = 0;
			let lastLetterIdxX = 0;

			for (j = 0; j < puzzleHeight; j++) {
				const strArrDiagnalAlongYAxisUpwards = [];
				const strArrDiagnalAlongYAxisDownwards = [];
				for (k = 0; k <= j; k++) {
					if (k < puzzleWidth) {
						strArrDiagnalAlongYAxisUpwards.push(puzzle[j - k][k]);
						strArrDiagnalAlongYAxisDownwards.unshift(
							puzzle[j - k][puzzleWidth - k - 1]
						);
					}
				}
				const textUpwards = strArrDiagnalAlongYAxisUpwards.join('');
				const textDownwards = strArrDiagnalAlongYAxisDownwards.join('');

				if (textUpwards.includes(currWord)) {
					firstLetterIdxY = j - textUpwards.indexOf(currWord);
					firstLetterIdxX = textUpwards.indexOf(currWord);
					lastLetterIdxY = firstLetterIdxY - currWord.length + 1;
					lastLetterIdxX = firstLetterIdxX + currWord.length - 1;

					result[currWord] = [
						[firstLetterIdxY, firstLetterIdxX],
						[lastLetterIdxY, lastLetterIdxX],
					];
					break;
				}
				if (textDownwards.includes(currWord)) {
					firstLetterIdxY = j - textDownwards.indexOf(currWord) + 1;
					firstLetterIdxX = puzzleWidth - j - 1 + textUpwards.indexOf(currWord);
					lastLetterIdxY = firstLetterIdxY + currWord.length;
					lastLetterIdxX = firstLetterIdxX + currWord.length;

					result[currWord] = [
						[firstLetterIdxY, firstLetterIdxX],
						[lastLetterIdxY, lastLetterIdxX],
					];
					break;
				}
			}

			for (j = 1; j < puzzleWidth; j++) {
				const strArrDiagnalAlongXAxisUpwards = [];
				const strArrDiagnalAlongXAxisDownwards = [];

				for (k = 0; k < puzzleHeight; k++) {
					if (j + k < puzzleWidth)
						strArrDiagnalAlongXAxisUpwards.push(
							puzzle[puzzleHeight - k - 1][j + k]
						);
					strArrDiagnalAlongXAxisDownwards.unshift(
						puzzle[puzzleHeight - k - 1][puzzleWidth - j - k - 1]
					);
				}
				const textUpwards = strArrDiagnalAlongXAxisUpwards.join('');
				const textDownwards = strArrDiagnalAlongXAxisDownwards.join('');
				// console.log('textUpwards ', textUpwards);
				// console.log('textDownwards ', textDownwards);
				if (textUpwards.includes(currWord)) {
					firstLetterIdxY = puzzleHeight - textUpwards.indexOf(currWord) - 1;
					firstLetterIdxX = j + textUpwards.indexOf(currWord);
					lastLetterIdxY = puzzleHeight - firstLetterIdxY;
					lastLetterIdxX = textUpwards.indexOf(currWord) + currWord.length;

					result[currWord] = [
						[firstLetterIdxY, firstLetterIdxX],
						[lastLetterIdxY, lastLetterIdxX],
					];
					break;
				}

				if (textDownwards.includes(currWord)) {
					firstLetterIdxY = textUpwards.indexOf(currWord);
					firstLetterIdxX =
						puzzleWidth - puzzleHeight - 1 + textUpwards.indexOf(currWord);
					lastLetterIdxY = firstLetterIdxY + currWord.length;
					lastLetterIdxX = firstLetterIdxX + currWord.length;

					result[currWord] = [
						[firstLetterIdxY, firstLetterIdxX],
						[lastLetterIdxY, lastLetterIdxX],
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
	['h', 'b', 'i', 't', 'e', 'a', 'b', 'c', 'h', 'e'],
	['a', 'i', 's', 'b', 'i', 'o', 'z', 'p', 'u', 'e'],
	['a', 'a', 'u', 'm', 'g', 't', 'y', 'o', 'm', 'e'],
	['l', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
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
