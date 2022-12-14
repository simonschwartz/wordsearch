// General ideas
// Exit early - If we have found all words, immediately return the result
// Avoid checking a word if we know it will be out-of-bounds

use std::collections::HashMap;

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

fn find_words(puzzle: WordPuzzle, mut words: Vec<&str>) -> HashMap<String, SearchResult> {
    let mut results = HashMap::new();

    // Measure how many loops our function performs to find all words
    let mut loops: usize = 0;

    // scan the puzzle for letters that match the first character of the word we are searching for
    'scan: for row in 0..puzzle.len() {
        loops = loops + 1;
        for col in 0..puzzle[row].len() {
            loops = loops + 1;
            // If we have found all words, then break the entire loop
            if words.len() == 0 {
                break 'scan;
            }

            // Loop over each remaining word/s we are searching for
            for index in 0..words.len() {
                loops = loops + 1;
                let word = words[index];
                let first_char = word.chars().nth(0).unwrap();

                if first_char == puzzle[row][col] {
                    // Check the word would be in bounds before starting to walk
                    // This just checks the bounds horizontally, would need to update to check in othe directions for harder puzzles
                    if col + word.len() < puzzle[row].len() + 1 {
                        let rest_word: &str = &word[1..word.len()];
                        let char_vec: Vec<char> = rest_word.chars().collect();

                        let mut found = true;

                        for (i, character) in char_vec.iter().enumerate() {
                            loops = loops + 1;
                            // This just searches the word horizontally, would need to update to search in othe directions for harder puzzles
                            if puzzle[row][col + 1 + i] == *character {
                                continue;
                            } else {
                                found = false;
                                break;
                            }
                        }

                        // if we make it to this code block the walk has succesfully finished meaning we have found the word
                        if found {
                            words.remove(index);
                            results.insert(
                                String::from(word),
                                [[row, col], [row, col + word.len() - 1]],
                            );
                            break;
                        }
                    }
                }
            }
        }
    }

    if words.len() > 0 {
        println!("Could not find all words. Remaining words: {:?}", words);
    }

    println!("Performed {:?} loops to find all words", loops);
    return results;
}

fn main() {
    use std::time::Instant;
    let now = Instant::now();
    let words = vec!["bluey", "bingo", "humpty"];
    let results = find_words(EASY_WORD_PUZZLE, words);
    println!("Results: {:?}", results);
    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}

#[test]
fn word_search_test_easy() {
    let result = find_words(EASY_WORD_PUZZLE, vec!["bluey", "bingo", "humpty"]);
    let mut expected = HashMap::new();
    expected.insert("bluey".to_string(), [[4, 3], [4, 7]]);
    expected.insert("bingo".to_string(), [[1, 3], [1, 7]]);
    expected.insert("humpty".to_string(), [[2, 1], [2, 6]]);
    assert_eq!(result, expected);
}

// Not relevant, for now...

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
