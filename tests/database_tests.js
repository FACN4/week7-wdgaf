const test = require('tape');
const runDbBuild = require('../src/database/build.js');
const { getUserData } = require('../src/query/getData.js');

test('--------------database_tests.js----------tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.equal(process.env.NODE_ENV, 'test', 'The process.env.NODE_ENV environment should be test');
  t.end();
});

test('runDbBuild works', (t) => {
  runDbBuild((err) => {
    t.error(err, 'runDB should return a null error');
    t.end();
  });
});

test('testing getData', (t) => {
  runDbBuild(() => {
    getUserData((err, users) => {
      t.error(err, 'getData should return a null error');
      t.ok(users.length > 0, true, 'The table should have a length > 0');
      t.end();
    });
  });
});
