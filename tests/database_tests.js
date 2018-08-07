const test = require('tape');
// const runDbBuild = require("../src/database/db_build");
// const getData = require("../src/queries/getData");
// const postData = require("../src/queries/postData");

test('--------------database_tests.js----------tape is working', (t) => {
  t.ok(true);
  t.end();
});

// test('tape is working', (t) => {
//   t.equals(1, 1, 'one equals one');
//   t.end();
// });
//
// test('runDbBuild works', (t) => {
//   runDbBuild((err, res) => {
//     t.equals(err, null, 'runDB should return a null error');
//     t.end();
//   });
// });
//
// test('testing getData', (t) => {
//   runDbBuild((err, res) => {
//     getData((err, users) => {
//       t.error(err, 'getData should return a null error');
//       t.equals(users.length, 1, 'The length of the initial table should be 1');
//       t.end();
//     });
//   });
// });
//
// test('what you are going to test', (t) => {
//   runDbBuild((err, res) => {
//     postData('noor', 'naz', (err, res) => {
//       t.error(err, 'postData should return a null error');
//
//       getData((err, users) => {
//         t.equals(
//           users.length,
//           2,
//           'The length of the adjusted table should be 2',
//         );
//         t.end();
//       });
//     });
//   });
// });
