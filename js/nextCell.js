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

function East(cell) {
    return [cell[0]+1, cell[1]];
}

function NorthEast(cell) {
    return [cell[0]+1, cell[1]-1];
}

function North(cell) {
    return [cell[0], cell[1]-1];
}

function NorthWest(cell) {
    return [cell[0]-1, cell[1]-1];
}

function West(cell) {
    return [cell[0]-1, cell[1]];
}

function SouthWest(cell) {
    return [cell[0]-1, cell[1]+1];
}

function South(cell) {
    return [cell[0], cell[1]+1];
}

function SouthEast(cell) {
    return [cell[0]+1, cell[1]+1];
}
