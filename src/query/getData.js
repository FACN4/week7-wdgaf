const dbConnection = require('../database/dbconnection.js');

// Gets everything from the users table and returns it in a callback
const getUserData = (cb) => {
  dbConnection.query('SELECT * FROM git_profiles ORDER BY elo_ranking DESC', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

// Gets the user's hash from the db and returns it to postLoginHandler

const getHash = (cb, userName) => new Promise((resolve, reject) => {
  dbConnection.query(
    `SELECT password FROM users WHERE ${userName} ORDER BY elo_ranking DESC`,
    (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    },
  );
});

module.exports = { getUserData, getHash };
