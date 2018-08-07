const dbConnection = require('../database/dbconnection.js');

const updateElo = (userId, eloNew, cb) => {
  dbConnection.query('UPDATE users SET elo_ranking = $1 WHERE user_id = $2', [eloNew, userId], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const logRating = (user1Id, user1Elo, user2Id, user2Elo, user1Wins, cb) => {
  dbConnection.query('INSERT INTO ratings (user1_id, user1_elo, user2_id, user2_elo,user1_wins) VALUES ($1, $2, $3, $4, $5)', [user1Id, user1Elo, user2Id, user2Elo, user1Wins], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = { updateElo, logRating };
