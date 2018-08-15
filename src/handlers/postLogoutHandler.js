const fs = require('fs');
const path = require('path');

/* Function to handle requests for the homePage and send back appropriate response */

const postLogoutHandler = (response) => {
  response.writeHead(302, {
    Location: '/',
    'Set-Cookie': 'jwt =0; Max-Age=0',
  });
  return response.end();
};

module.exports = postLogoutHandler;
