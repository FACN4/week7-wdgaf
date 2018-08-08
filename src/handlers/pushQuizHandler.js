const { calcNewElo } = require('../logic.js');
const { updateElo, logRating } = require('../query/postData');

/* Function to update the database with the results of the quiz */
const pushQuizHandler = (request, response) => {
  /* Using post method so data is coming in streams */
  let allData = '';
  request.on('data', (data) => {
    allData += data;
  });
  /* Method to trigger when all data has been received */
  request.on('end', () => {
    const quizData = JSON.parse(allData);
    const { winner, loser } = quizData;
    // Calculate new elo scores
    const winnerNewElo = calcNewElo(winner.elo, loser.elo, true);
    const loserNewElo = calcNewElo(loser.elo, winner.elo, false);
    // Counter to make sure that all 3 callbacks have executed before responding
    let counter = 0;
    // Define callback function to be used later in this handler
    const eloCallBack = (err) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('error, could not update ELO rating in database');
      } else {
        counter += 1;
        if (counter > 2) {
          response.writeHead(200);
          response.end();
        }
      }
    };
    // Update ELO rating in both tables
    logRating(winner.id, winner.elo, loser.id, loser.elo, true, eloCallBack);
    updateElo(winner.id, winnerNewElo, eloCallBack);
    updateElo(loser.id, loserNewElo, eloCallBack);
  });
};
module.exports = pushQuizHandler;
