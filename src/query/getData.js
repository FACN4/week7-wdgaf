const dbConnection = require('../database/dbconnection.js');

// Gets everything from the users table and returns it in a callback
const getUserData = (cb) => {
  dbConnection.query('SELECT * FROM users ORDER BY elo_ranking DESC', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = { getUserData };
