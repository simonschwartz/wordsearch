# Word Search

Install Node https://nodejs.org/en/download/

Install dependencies with:

```
npm i
```

Update `index.js` and run

```
npm run start
```

# How does it do

## Horizontal

- Horizontal word search is easy using JS's array manipulation functions.
- First, flatten the 2D array into a string.
- Then do an Array.indexOf to find the target word.

## Vertical

- This is 90% the same as the horizontal word search
- Except that before doing the Array.indexOf, the array was rotated 90 degrees clockwise using Array splicing.

## Diagonal

- Idea 1 - shift + rotate array
- Idea 2 -
  - Created array of all diagonals -
   - [ 00,             ->
      10 01           ->
      20 11 02        ->
      30 21 12 03     ->
      40 31 22 13 04  ->
      50 41 32 23 14  ->
      51 42 33 24     ->
      52 43 34        ->
      53 35           ->
      55              ->
    ]
   - Unfinished.

# Limitations
- Heavy reliance on Array.indexOf function.
- Search directions is limited to W-E (horizontal), N-S (vertical)
-