const test = require('tape');
const { calcNewElo } = require('../src/logic.js');

test('--------------logic_tests.js----------tape is working', (t) => {
  t.ok(true);
  t.end();
});

test('Testing rate calculate Elo', (t) => {
  t.equals(calcNewElo(1500, 1500, true, 200), 1600, 'The elo should increase by 100');
  t.equals(calcNewElo(1500, 1500, false, 200), 1400, 'The elo should decrease by 100');
  t.equals(calcNewElo(2000, 500, true, 200), 2040, 'The elo should increase by 40');
  t.equals(calcNewElo(2000, 500, false, 200), 1840, 'The elo should decrease by 160');
  t.equals(calcNewElo(500, 2000, true, 200), 660, 'The elo should increase by 160');
  t.equals(calcNewElo(500, 2000, false, 200), 460, 'The elo should decrease by 40');
  t.end();
});
