/* eslint-disable no-console */
const fs = require('fs');
const dbConnection = require('./dbconnection');
const userData = require('./git_member_data.json');

const facData = [
  'FAC1',
  'FAC2',
  'FAC3',
  'FAC4',
  'FAC5',
  'FAC6',
  'FAC7',
  'FAC8',
  'FAC9',
  'FAC10',
  'FAC11',
  'FAC12',
  'FAC13',
  'FAC14',
  'FACN1',
  'FACN2',
  'FACN3',
  'FACN4',
];

const makeEmptyTables = fs.readFileSync(`${__dirname}/build.sql`, 'utf-8');

const runDbBuild = (cb) => {
  dbConnection.query(makeEmptyTables, (error) => {
    if (error) {
      console.log('Building DB error', error);
      cb(error);
    } else {
      userData.forEach((person) => {
        if (person.avatar_url) {
          const SQLquery = 'INSERT INTO git_profiles (git_username,git_profile_url,git_photo_url) VALUES ($1,$2,$3)';
          dbConnection.query(SQLquery, [person.login, person.html_url, person.avatar_url], (err) => {
            if (err) {
              cb(err);
            }
          });
        }
      });
      facData.forEach((cohort) => {
        const FACquery = 'INSERT INTO cohorts (fac_name) VALUES ($1)';
        dbConnection.query(FACquery, [cohort], (err) => {
          if (err) {
            cb(err);
          }
        });
      });

      cb(null);
    }
  });
};

if (process.argv[2] === 'run') {
  runDbBuild(console.log);
}
module.exports = runDbBuild;
