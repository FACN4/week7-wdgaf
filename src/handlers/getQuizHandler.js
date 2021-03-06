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
      const numberOfUsers = parseInt(result.length, 10);
      // generate two random numbers between 1 and number of users length for user 1 and user 2
      const user1 = Math.floor(Math.random() * numberOfUsers);
      let user2 = Math.floor(Math.random() * numberOfUsers);
      /* Check to ensure the two numbers are not the same, if they are,
      create a new number until they're not */
      while (user1 === user2) {
        user2 = Math.floor(Math.random() * numberOfUsers);
      }
      const res = {
        user1: result[user1],
        user2: result[user2],
      };
      // Send result to frontend
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(res));
    }
  });
};

module.exports = getQuizHandler;
