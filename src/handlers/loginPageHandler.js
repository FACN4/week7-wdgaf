const fs = require('fs');
const path = require('path');

/* Function to handle requests for the homePage and send back appropriate response */

const loginPageHandler = (response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'login.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>Sorry, something went wrong</h1>');
    } else {
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.end(file);
    }
  });
};

module.exports = loginPageHandler;
