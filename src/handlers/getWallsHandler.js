const { getUserData } = require('../query/getData');

/* Function to return data for the wall of fame and wall of shame */

const getWallsHandler = (request, response) => {
  getUserData((error, result) => {
    // Error message to send if the data doesn't send correctly
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Sorry, unable to fulfil request' }));
    } else {
      const wallOfFame = result.slice(0, 5);
      const wallOfShame = result.slice(-5).reverse();
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
