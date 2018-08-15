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

const getHash = (userEmail, cb) => {
  dbConnection.query(`SELECT password FROM users WHERE email = '${userEmail}'`, (err, res) => {
    if (err || res.rows.length === 0) {
      console.log('reject');
      cb(err);
    } else {
      cb(null, res.rows[0].password);
    }
  });
};

module.exports = { getUserData, getHash };
