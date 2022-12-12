module.exports = {
    East,
    NorthEast,
    North,
    NorthWest,
    West,
    SouthWest,
    South,
    SouthEast
};

function East(word, cell, puzzleWidth, puzzleHeight) {
    return cell[0] + word.length <= puzzleWidth;
}

function NorthEast(word, cell, puzzleWidth, puzzleHeight) {
    return (North(word, cell, puzzleWidth, puzzleHeight) && East(word, cell, puzzleWidth, puzzleHeight));
}

function North(word, cell, puzzleWidth, puzzleHeight) {
    return cell[1] - word.length + 1 >= 0;
}

function NorthWest(word, cell, puzzleWidth, puzzleHeight) {
    return (North(word, cell, puzzleWidth, puzzleHeight) && West(word, cell, puzzleWidth, puzzleHeight));
}

function West(word, cell, puzzleWidth, puzzleHeight) {
    return cell[0] - word.length + 1 >= 0;
}

function SouthWest(word, cell, puzzleWidth, puzzleHeight) {
    return (South(word, cell, puzzleWidth, puzzleHeight) && West(word, cell, puzzleWidth, puzzleHeight));
}

function South(word, cell, puzzleWidth, puzzleHeight) {
    return cell[1] + word.length <= puzzleHeight;
}

function SouthEast(word, cell, puzzleWidth, puzzleHeight) {
    return (South(word, cell, puzzleWidth, puzzleHeight) && East(word, cell, puzzleWidth, puzzleHeight));
}