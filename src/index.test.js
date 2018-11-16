var wordSearch = require('./index');

describe('WordSearch', () => {
  it('should not find match word in boards', () => {
    // start function
    var startResult = wordSearch.start(
      [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
      ['ASADB', 'ABCAED', 'ABCF']
    );
    expect(startResult).toEqual([false, false, false]);

    // isWordHitted function
    var isWordHittedResult = wordSearch.isWordHitted(
      [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
      'ASADB'
    );
    expect(isWordHittedResult).toEqual(false);
  });

  it('should find match word in boards', () => {
    // start function
    var startResult = wordSearch.start(
      [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
      ['CCFS', 'ABCCED', 'CFDAS']
    );
    expect(startResult).toEqual([true, true, true]);

    // isWordHitted function
    var isWordHittedResult = wordSearch.isWordHitted(
      [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
      'CFDAS'
    );
    expect(isWordHittedResult).toEqual(true);
  });
});
