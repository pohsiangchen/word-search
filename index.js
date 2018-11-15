Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var grid2D = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
var hittingMap = {};
var word = 'CSEEDS';
var wordIdx = 0;
var rowIdx = 0;
var columnIdx = 0;

grid2D.forEach(function(grids, gridsIdx) {
	grids.forEach(function(letter, letterIdx) {
  	// find first letter
  	if (letter === word.charAt(wordIdx)) {
    	hittingMap = {}; // reset first
      rowIdx = gridsIdx;
			columnIdx = letterIdx;
    	var combinedIdx = gridsIdx + '.' + letterIdx;
    	hittingMap[combinedIdx] = letter;
      checkAdjecentCells(rowIdx, columnIdx);
      console.log(checkAdjecentCells(rowIdx, columnIdx));
    }
	});
});

function checkAdjecentCells(rowIdx, columnIdx) {
	var combinedIdx;
  var letter;
	// up
  combinedIdx = (rowIdx - 1) + '.' + columnIdx;
  letter = _.get(grid2D, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(Object.size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(rowIdx - 1, columnIdx);
  }
  // right
  combinedIdx = rowIdx + '.' + (columnIdx + 1);
  letter = _.get(grid2D, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(Object.size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(rowIdx, columnIdx + 1);
  }
  // bottom
  combinedIdx = (rowIdx + 1) + '.' + columnIdx;
  letter = _.get(grid2D, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(Object.size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(rowIdx + 1, columnIdx);
  }
  // left
  combinedIdx = rowIdx + '.' + (columnIdx - 1);
  letter = _.get(grid2D, combinedIdx);
  if (!hittingMap[combinedIdx] && letter === word.charAt(Object.size(hittingMap))) {
    hittingMap[combinedIdx] = letter;
    return checkAdjecentCells(rowIdx, columnIdx - 1);
  }
  
  if (word.length === Object.size(hittingMap)) return true;
  return false;
}