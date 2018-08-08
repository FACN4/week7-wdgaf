const { getUserData } = require('../query/getData');

/* Function to produce a response for 2 random profiles for the quiz */
const getQuizHandler = (request, response) => {
  getUserData((error, result) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Issues getting data from el database' }));
    } else {
      const numberOfUsers = parseInt(result.row.length, 10);
      const user1 = Math.floor(Math.random() * numberOfUsers) + 1;
      const user2 = Math.floor(Math.random() * numberOfUsers) + 1;
      const res = {
        user1: result.row[user1],
        user2: result.row[user2],
      };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(res));
    }
  });
};

module.exports = getQuizHandler;
