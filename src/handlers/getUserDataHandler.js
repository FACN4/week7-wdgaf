const cookie = require('cookie');
const { verify } = require('jsonwebtoken');

const SECRET = 'hcdcjdhcdcdchdohcioj';

const getUserDataHandler = (request, response) => {
  if (request.headers.cookie) {
    const { jwt } = cookie.parse(request.headers.cookie);
    verify(jwt, SECRET, (err, username) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Sorry, unable to fulfil request' }));
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(username));
      }
    });
  }
};

module.exports = getUserDataHandler;
