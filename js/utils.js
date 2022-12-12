const nextCell = require("./nextCell.js");
const solutionFits = require("./solutionFits.js");
const logLevels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  WARN: 4,
  FATAL: 5
}
const debugLogLevel = logLevels.WARN; // <--- set debugging level here

var directions = {
  "East": {
    solutionFits: solutionFits.East,
    nextCell: nextCell.East,
  },
  "North East": {
    solutionFits: solutionFits.NorthEast,
    nextCell: nextCell.NorthEast,
  },
  "North": {
    solutionFits: solutionFits.North,
    nextCell: nextCell.North,
  },
  "North West": {
    solutionFits: solutionFits.NorthWest,
    nextCell: nextCell.NorthWest,
  },
  "West": {
    solutionFits: solutionFits.West,
    nextCell: nextCell.West,
  },
  "South West": {
    solutionFits: solutionFits.SouthWest,
    nextCell: nextCell.SouthWest,
  },
  "South": {
    solutionFits: solutionFits.South,
    nextCell: nextCell.South,
  },
  "South East": {
    solutionFits: solutionFits.SouthEast,
    nextCell: nextCell.SouthEast,
  },
};

module.exports = {
  directions,
  debugLog,
  logLevels
};

function debugLog(debugMessage, logLevel) {
  if (logLevel >= debugLogLevel) {
    console.log("DEBUG: " + debugMessage)
  }
}