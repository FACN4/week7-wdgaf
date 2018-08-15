const bcrypt = require('bcrypt');

const { getHash } = require('../query/getData');

const postLoginHandler = (request, response) => {
  /* Using post method so data is coming in streams */
  let allData = '';
  request.on('data', (data) => {
    allData += data;
  });
  /* Method to trigger when all data has been received */
  request.on('end', () => {
    const userData = JSON.parse(allData);
    const hash = getHash(userData.username);
    bcrypt
      .compare(userData.password, hash)
      .then((res) => {
        console.log(res, "It works, now let's think about tokens!!");
      })
      .catch((err) => {
        console.log(err);
        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.end('Password is incorrect. Please try again');
      });
  });
};

module.exports = postLoginHandler;
