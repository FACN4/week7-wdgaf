const fs = require('fs');
const dbConnection = require('./dbconnection');
const userData = require('./git_member_data.json');

const makeEmptyTables = fs.readFileSync(`${__dirname}/build.sql`, 'utf-8');

dbConnection.query(makeEmptyTables, (error) => {
  if (error) {
    console.log('Building DB error', error);
  } else {
    console.log('Buiding DB success');
    userData.forEach((person) => {
      const SQLquery = 'INSERT INTO users (git_username,git_profile_url,git_photo_url) VALUES ($1,$2,$3)';
      dbConnection.query(SQLquery, [person.login, person.html_url, person.avatar_url], (err) => {
        if (err) {
          console.log('Filling DB error', err);
        } else {
          console.log('Filling DB success');
        }
      });
    });
  }
});
