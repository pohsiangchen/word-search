var fs = require('fs');
var path = require('path');
var readline = require('readline');

var get = require('lodash/get');
var size = require('lodash/size');

var promises = [];
var board2Ds = [];
var words = [];

var readFile = function(filePath, readingLineCb) {
  return new Promise(function(resolve, reject) {
    var lines = [];
    var rl = readline.createInterface({
      input: fs.createReadStream(filePath, {
        encoding: 'utf8'
      })
    });

    rl.on('line', function(line) {
      readingLineCb(line.trim());
      lines.push(line.trim());
    });

    rl.on('close', function() {
      resolve(lines);
    });
  });
};

// Initial board 2D-array
promises.push(
  readFile(path.resolve('board.txt'), function(line) {
    board2Ds.push(line.split(''));
  })
);

// Initial words array
var wordFilePath = process.argv[2];
console.log(wordFilePath);
console.log(path.resolve('word.txt'));
promises.push(
  readFile(wordFilePath || path.resolve('word.txt'), function(line) {
    words.push(line);
  })
);

Promise.all(promises)
  .then(function(data) {
    start(board2Ds, words);
  })
  .catch(function(err) {
    console.log(err);
  });

function start(board2Ds, words) {
  var result = [];
  words.forEach(function(word, idx) {
    result.push(isWordHitted(board2Ds, word));
    console.log(result[idx]);
  });
  return result;
}

function isWordHitted(board2Ds, word) {
  var hittingMap = {};
  return board2Ds.some(function(boards, boardsIdx) {
    return boards.some(function(letter, letterIdx) {
      // find first letter
      if (letter === word.charAt(0)) {
        hittingMap = {}; // reset hitting Map
        var combinedIdx = boardsIdx + '.' + letterIdx;
        hittingMap[combinedIdx] = letter;
        return checkAdjecentCells(
          board2Ds,
          word,
          hittingMap,
          boardsIdx,
          letterIdx
        );
      }
      return false;
    });
  });
}

function checkAdjecentCells(board2Ds, word, hittingMap, rowIdx, columnIdx) {
  var combinedIdx;
  var letter;
  // up
  combinedIdx = rowIdx - 1 + '.' + columnIdx;
  letter = get(board2Ds, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(
      board2Ds,
      word,
      hittingMap,
      rowIdx - 1,
      columnIdx
    );
  }
  // right
  combinedIdx = rowIdx + '.' + (columnIdx + 1);
  letter = get(board2Ds, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(
      board2Ds,
      word,
      hittingMap,
      rowIdx,
      columnIdx + 1
    );
  }
  // bottom
  combinedIdx = rowIdx + 1 + '.' + columnIdx;
  letter = get(board2Ds, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(
      board2Ds,
      word,
      hittingMap,
      rowIdx + 1,
      columnIdx
    );
  }
  // left
  combinedIdx = rowIdx + '.' + (columnIdx - 1);
  letter = get(board2Ds, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(
      board2Ds,
      word,
      hittingMap,
      rowIdx,
      columnIdx - 1
    );
  }

  if (word.length === size(hittingMap)) return true;
  return false;
}

module.exports = {
  start: start,
  isWordHitted: isWordHitted,
  checkAdjecentCells: checkAdjecentCells
};
