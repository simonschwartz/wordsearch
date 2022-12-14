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

fn walk(start: [usize; 2], end: [usize; 2], amputated: &str) -> SearchResult {
    let char_vec: Vec<char> = amputated.chars().collect();
    for (i, c) in char_vec.iter().enumerate() {
        let start_row = start[0];
        let start_col = start[1];
        if EASY_WORD_PUZZLE[start_row][start_col + 1 + i] == *c {
            continue;
        }
        return [[0, 0], [0, 0]];
    }

    return [start, end];
}

// 1. Walk the array to see if first letter of word exists
// 1. If we get a match then check if last letter of word exists in relevant position
// 2. If it does - walk each letter between first and last to confirm a match
fn check_surrounds(
    position: [usize; 2],
    last_char: char,
    amputated: &str,
    word_length: usize,
) -> SearchResult {
    if position[1] + word_length < 10 {
        let left_to_right = [position[0], position[1] + word_length - 1];
        // let top_to_bottom = [position[0] + word_length - 1, position[1]];
        let last_letter = EASY_WORD_PUZZLE[left_to_right[0]][left_to_right[1]];
        if last_char == last_letter {
            let result = walk(
                [position[0], position[1]],
                [position[0], position[1] + word_length - 1],
                amputated,
            );
            return result;
        }
    }

    return [[0, 0], [0, 0]];
}

fn check(row: usize, col: usize, words: Words, puzzle: WordPuzzle) -> SearchResult {
    for word in words {
        let first_char = word.chars().nth(0).unwrap();
        if first_char == puzzle[row][col] {
            println!("Match {}", word);
        }
    }

    return [[0, 0], [0, 0]];
}

type Words<'a> = [&'a str; 3];

fn find_words(puzzle: WordPuzzle, word: &str) -> SearchResult {
    // works
    let first_char = word.chars().nth(0).unwrap();
    let last_char = word.chars().last().unwrap();
    let word_length = word.len();
    let amputated: &str = &word[1..word_length - 1];

    // let mut words: Words = [
    //     "bluey",
    //     "bingo",
    //     "humpty"
    // ];

    // scan the puzzle for letters that match the first character of the word we are searching for
    for row in 0..puzzle.len() {
        for col in 0..puzzle[row].len() {
            let letter = puzzle[row][col];

            // let result = check(row, col, words, puzzle);
            // works
            if letter == first_char {
                // When we find the first letter, scan its surrounds to see if we have a match
                let result: SearchResult =
                    check_surrounds([row, col], last_char, amputated, word_length);
                if result == [[0, 0], [0, 0]] {
                    continue;
                } else {
                    return result;
                }
            }
        }
    }

    return [[0, 0], [0, 0]];
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

fn main(puzzle: WordPuzzle) -> SearchResults {
    use std::time::Instant;
    let now = Instant::now();
    let bingo = find_words(puzzle, "bingo");
    let bluey = find_words(puzzle, "bluey");
    let humpty = find_words(puzzle, "humpty");
    let result = {
        SearchResults {
            bluey: bluey,
            bingo: bingo,
            humpty: humpty,
        }
    };
    println!("Result: {:?}", result);
    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
    return result;
}

#[test]
fn word_search_test_easy() {
    let result = main(EASY_WORD_PUZZLE);
    assert_eq!(
        result,
        SearchResults {
            bluey: [[4, 3], [4, 7]],
            bingo: [[1, 3], [1, 7]],
            humpty: [[2, 1], [2, 6]],
        }
    );
}

// #[test]
// fn word_search_test_medum() {
//     let result = word_search(MEDIUM_WORD_PUZZLE);
//     assert_eq!(
//         result,
//         SearchResult {
//             bluey: [[2, 5], [1, 3]],
//             bingo: [[2, 5], [1, 2]],
//             humpty: [[2, 5], [1, 2]],
//         }
//     );
// }

// #[test]
// fn word_search_test_hard() {
//     let result = word_search(HARD_WORD_PUZZLE);
//     assert_eq!(
//         result,
//         SearchResult {
//             bluey: [[2, 5], [1, 3]],
//             bingo: [[2, 5], [1, 2]],
//             humpty: [[2, 5], [1, 2]],
//         }
//     );
// }
