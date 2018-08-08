const { getUserData } = require('../query/getData');

/* Function to produce a response for 2 random profiles for the quiz */
const getQuizHandler = (request, response) => {
  getUserData((error, result) => {
    // Error message to send if the data doesn't send correctly
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Sorry, unable to fulfil request' }));
    } else {
      // get Number of users of the database
      const numberOfUsers = parseInt(result.row.length, 10);
      // generate two random numbers between 1 and number of users length for user 1 and user 2
      const user1 = Math.floor(Math.random() * numberOfUsers) + 1;
      let user2 = Math.floor(Math.random() * numberOfUsers) + 1;
      while (user1 === user2) {
        user2 = Math.floor(Math.random() * numberOfUsers) + 1;
      }
      // Build object with the 2 users to respond to XHR request
      // WARNING, PUT IN AN IF STATMENT TO CHECK IF THE SAME USER WAS SELECTED RANDOMLY
      const res = {
        user1: result.row[user1],
        user2: result.row[user2],
      };
      // Send result to frontend
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(res));
    }
  });
};

module.exports = getQuizHandler;
