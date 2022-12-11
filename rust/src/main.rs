use std::error::Error;

type WordPuzzle = [[char; 10]; 6];

const EASY_WORD_PUZZLE: WordPuzzle = [
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
    ['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e'],
];

type SearchResult = [[usize; 2]; 2];

#[derive(Debug, Clone, PartialEq)]
struct SearchResults {
    bluey: SearchResult,
    bingo: SearchResult,
    humpty: SearchResult,
}

type SurroundCoords = [[usize; 2]; 1];

fn walk(start: [usize; 2], end: [usize; 2], word: &str) {
    // dont need to do first or last
    let char_vec: Vec<char> = word.chars().collect();
    for c in char_vec {
        println!("{}", c);
    }
}

// 1. Walk the array to see if first letter of word exists
// 1. If we get a match then check if last letter of word exists in relevant position
// 2. If it does - walk each letter between first and last to confirm a match
fn check_surrounds(row: usize, col: usize, letter: char, length: usize) -> Result<SearchResult, dyn Error> {
    let word_length = length - 1;
    if col + word_length < 10 {
        let left_to_right = [row, col + word_length];
        let last_letter_maybe = EASY_WORD_PUZZLE[left_to_right[0]][left_to_right[1]];

        if last_letter_maybe == letter {
            println!(
                "last_letter_maybe {:?} {} {}",
                last_letter_maybe,
                row,
                col + word_length
            );
            let result =   walk([row, col], [row, col + word_length], "bluey");

            match result {
                Ok(coords) => coords,
                Err(e) => return Err(e),
            }
            // walk([row, col], [row, col + word_length], "bluey");
            // return Some([[row, col], [row, col + word_length]]);
        }
    }

    // return Some();
}

fn find_word(puzzle: WordPuzzle, word: &str) -> SearchResults {
    let first_char = word.chars().nth(0).unwrap();
    let last_char = word.chars().nth(0).unwrap();
    let word_length = word.chars().count();

    for row in 0..puzzle.len() {
        for col in 0..puzzle[row].len() {
            let letter = puzzle[row][col];
            // println!("{} {} {}", puzzle[i][n], row, col);
            if letter == first_char {
                // println!("rowsss");
                let b: SearchResult = check_surrounds(row, col, last_char, word_length);
                //println!("row {}", i);
                //println!("col {}", n);
                // println!("{}", puzzle[i][n]);
                // println!("left {} {}", b[0][0], b[0][1]);
                // break;
            }
        }
    }

    let result = SearchResults {
        bluey: [[2, 5], [1, 2]],
        bingo: [[2, 5], [1, 2]],
        humpty: [[2, 5], [1, 2]],
    };
    return result;
}

// const MEDIUM_WORD_PUZZLE: WordPuzzle = [
//     ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
//     ['a', 'i', 'c', 'b', 'i', 'n', 'z', 'p', 'u', 'e'],
//     ['a', 'n', 'u', 'm', 'p', 't', 'y', 'o', 'm', 'e'],
//     ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
//     ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
//     ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
// ];

// const HARD_WORD_PUZZLE: WordPuzzle = [
//     ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
//     ['a', 'i', 'c', 'b', 'i', 'o', 'z', 'p', 'u', 'e'],
//     ['a', 'g', 'u', 'm', 'g', 't', 'y', 'o', 'm', 'e'],
//     ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
//     ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
//     ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
// ];

fn main() {
    use std::time::Instant;
    let now = Instant::now();
    find_word(EASY_WORD_PUZZLE, "bluey");
    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}

#[test]
fn word_search_test_easy() {
    let result = word_search(EASY_WORD_PUZZLE);
    assert_eq!(
        result,
        SearchResult {
            bluey: [[2, 5], [1, 3]],
            bingo: [[2, 5], [1, 2]],
            humpty: [[2, 5], [1, 2]],
        }
    );
}

#[test]
fn word_search_test_medum() {
    let result = word_search(MEDIUM_WORD_PUZZLE);
    assert_eq!(
        result,
        SearchResult {
            bluey: [[2, 5], [1, 3]],
            bingo: [[2, 5], [1, 2]],
            humpty: [[2, 5], [1, 2]],
        }
    );
}

#[test]
fn word_search_test_hard() {
    let result = word_search(HARD_WORD_PUZZLE);
    assert_eq!(
        result,
        SearchResult {
            bluey: [[2, 5], [1, 3]],
            bingo: [[2, 5], [1, 2]],
            humpty: [[2, 5], [1, 2]],
        }
    );
}
