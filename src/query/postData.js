const dbConnection = require('../database/dbconnection.js');

// Updates the elo score of the user, called in pushQuizHandler
const updateElo = (userId, eloNew, cb) => {
  // The maximum change in ELO ranking is 200. Additional conditions are put
  // in place to prevent malicous users from giving themselves higher ranking
  dbConnection.query('UPDATE users SET elo_ranking = $1 WHERE user_id = $2 AND elo_ranking + 200 > $1 AND elo_ranking - 200 < $1', [eloNew, userId], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

// Logs the event of a rating, called in pushQuizHandler
const logRating = (user1Id, user1Elo, user2Id, user2Elo, user1Wins, cb) => {
  dbConnection.query('INSERT INTO ratings (user1_id, user1_elo, user2_id, user2_elo,user1_wins) VALUES ($1, $2, $3, $4, $5)', [user1Id, user1Elo, user2Id, user2Elo, user1Wins], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

module.exports = { updateElo, logRating };
