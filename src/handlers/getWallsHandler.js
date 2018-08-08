const { getUserData } = require('../query/getData');

/* Function to return data for the wall of fame and wall of shame */

const sortByElo = (a, b) => {
  let comparison = 0;
  if (a.elo > b.elo) {
    comparison = 1;
  } else if (a.elo < b.elo) {
    comparison = -1;
  }
  return comparison;
};

const getWallsHandler = (request, response) => {
  getUserData((error, result) => {
    // Error message to send if the data doesn't send correctly
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Sorry, unable to fulfil request' }));
    } else {
      // sort the users by their elo score
      const sortedArray = result.sort(sortByElo);
      // slice the top 5 and lowest 5
      const wallOfFame = sortedArray.slice(0, 5);
      const wallOfShame = sortedArray.slice(-5);
      // Build object with the 2 users to respond to XHR request
      const res = {
        wallOfFame,
        wallOfShame,
      };
      // Send result to frontend
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(res));
    }
  });
};

module.exports = getWallsHandler;
