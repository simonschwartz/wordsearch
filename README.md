# Word Search Challenge

## Running This Solution

To run the solution included in this update - from this directory:

```
cd js
npm run start
```

## More Details

For more details - see README [./js/README.md](README)

## Description Of Challenge

This challenge will require you to find words with a table of letters. The table is described as an array or arrays, where each array represents a row, and each item in the array represents a column eg:

```
[
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
  ['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
  ['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e'],
]
```

You will need to write a program that finds the following words in the table.

- humpty
- bluey
- bingo

There are 3 different tables with varying diffuclty

**Easy**: hidden words only go horizontally

```
[
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
  ['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
  ['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e'],
]
```

**Medium**: hidden words go horizontally and vertically

```
[
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
  ['a', 'i', 'c', 'b', 'i', 'n', 'z', 'p', 'u', 'e'],
  ['a', 'n', 'u', 'm', 'p', 't', 'y', 'o', 'm', 'e'],
  ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
  ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
]
```

**Hard**: hidden words go horizontally, vertically and diagonally

```
[
  ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'h', 'e'],
  ['a', 'i', 'c', 'b', 'i', 'o', 'z', 'p', 'u', 'e'],
  ['a', 'g', 'u', 'm', 'g', 't', 'y', 'o', 'm', 'e'],
  ['h', 'g', 'i', 'n', 'e', 'a', 'b', 'c', 'p', 'e'],
  ['h', 'o', 'i', 'b', 'l', 'u', 'e', 'y', 't', 'e'],
  ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'y', 'e'],
]
```

### Goal

Your function should accept the following arguments:

- word table(array)
- words to find(strings)

The function should return an object of the position in the table of the first and last letters of the found word.

Example:

```
wordSearch(
  [
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['a', 'b', 'c', 'b', 'i', 'n', 'g', 'o', 'd', 'e'],
    ['a', 'h', 'u', 'm', 'p', 't', 'y', 'o', 'd', 'e'],
    ['h', 'b', 'i', 'n', 'e', 'a', 'b', 'c', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'e', 'y', 'd', 'e'],
    ['h', 'b', 'i', 'b', 'l', 'u', 'o', 'z', 'd', 'e'],
  ],
  'humpty',
  'bluey',
  'bingo',
)
```

Should return:

```
{
  humpty: [[2, 1], [2, 6]],
  bluey: [[4, 3], [4, 7]],
  bingo: [[1, 3], [1, 7]],
}
```

Whats should I aim for?

Here are some suggestions in order of priority! And to help you challenge yourself

1. Make it work
2. Make it quick (How long does it take to run)
3. Make it concise (Can you do a clever one-liner? Can you make it as simple as possible?)
4. Make it scale (Can you make your own table that is significantly larger? Can you still make it run fast when parsing a larger table)

## Setup

You can choose to use the existing examples as a base. The examples are built in JavaScript. You can setup one in a seperate language using the above table data but if you can, choose a language you arent familar with to challenege yourself.

First, clone the repo:

```
git clone https://github.com/simonschwartz/wordsearch.git
```

Then create a new branch using your name:

```
git checkout -b fred-blogs
```
