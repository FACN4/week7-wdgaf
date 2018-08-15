const dbConnection = require('../database/dbconnection.js');

// Updates the elo score of the user, called in pushQuizHandler
const updateElo = (userId, eloNew, cb) => {
  // The maximum change in ELO ranking is 200. Additional conditions are put
  // in place to prevent malicous users from giving themselves higher ranking
  const queryString = `UPDATE git_profiles SET elo_ranking = $1
                      WHERE user_id = $2
                      AND elo_ranking + 200 > $1
                      AND elo_ranking - 200 < $1`;
  dbConnection.query(queryString, [eloNew, userId], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

// Logs the event of a rating, called in pushQuizHandler
const logRating = (user1Id, user1Elo, user2Id, user2Elo, cb) => {
  const queryString = 'INSERT INTO ratings (winner_id, winner_elo, loser_id, loser_elo) VALUES ($1, $2, $3, $4)';
  dbConnection.query(queryString, [user1Id, user1Elo, user2Id, user2Elo], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

// Adds a user to the database called in pushRegisterHandler

const newUser = (email, salt, passhash, git_username = '', cb) => {
  const queryString = 'INSERT INTO users (email, salt, passhash, git_username) VALUES ($1, $2, $3, $4)';
  dbConnection.query(queryString, [email, salt, passhash, git_username], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

module.exports = { updateElo, logRating, newUser };
