const bcrypt = require('bcrypt');
const qs = require('querystring');
const { sign } = require('jsonwebtoken');
const { getHash } = require('../query/getData');

const { SECRET } = process.env;

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
          if (res) {
            const cookie = sign(userData.email, SECRET);
            response.writeHead(302, {
              Location: '/',
              'Set-Cookie': `jwt=${cookie}; HttpOnly`,
            });
            response.end();
          } else {
            response.writeHead(302, { Location: '/login-failed' });
            response.end('');
          }
        })
        .catch((err2) => {
          response.writeHead(302, { Location: '/login-failed' });
          response.end('');
        });
    });
  });
};

module.exports = postLoginHandler;
