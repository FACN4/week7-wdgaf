const { getUserData } = require('../query/getData');

/* Function to produce a resposne for 2 random profiles for the quiz */
const getQuizHandler = (request, response) => {
  getUserData();
};

module.exports = getQuizHandler;
