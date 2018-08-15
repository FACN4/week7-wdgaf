const bcrypt = require('bcrypt');
const qs = require('querystring');
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const { getHash } = require('../query/getData');

const SECRET = 'hcdcjdhcdcdchdohcioj';
const postLoginHandler = (request, response) => {
  /* Using post method so data is coming in streams */
  let allData = '';
  request.on('data', (data) => {
    allData += data;
  });
  /* Method to trigger when all data has been received */
  request.on('end', () => {
    const userData = qs.parse(allData);
    getHash(userData.email, (err, hash) => {
      bcrypt
        .compare(userData.password, hash)
        .then((res) => {
          if (res === true) {
            console.log('here');
            const cookie = sign(userData.email, SECRET);
            response.writeHead(302, { Location: '/', 'Set-Cookie': `jwt=${cookie}; HttpOnly` });
            response.end();
          } else {
            response.writeHead(302, { Location: '/login_failed' });
            response.end('');
          }
        })
        .catch((err2) => {
          console.log('failed');

          response.writeHead(401, { 'Content-Type': 'text/plain' });
          response.end('Password is incorrect. Please try again');
        });
    });
  });
};

module.exports = postLoginHandler;
