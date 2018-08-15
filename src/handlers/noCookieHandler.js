const fs = require('fs');
const path = require('path');

/* Function to handle requests for the homePage and send back appropriate response */

const noCookieHandler = (response) => {
  response.writeHead(302, {
    Location: '/login',
  });
  return response.end();
};

module.exports = noCookieHandler;
