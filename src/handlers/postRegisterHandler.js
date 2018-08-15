const bcrypt = require('bcrypt');

const { postNewUser } = require('../query/postData');

const postRegisterHandler = (request, response) => {
  /* Using post method so data is coming in streams */
  let allData = '';
  request.on('data', (data) => {
    allData += data;
  });
  /* Method to trigger when all data has been received */
  request.on('end', () => {
    const userData = JSON.parse(allData);
    console.log(userData);
    bcrypt
      .hash(userData.password, 10)
      .then(hash => postNewUser(userData.email, hash, userData.git_username))
      .then(() => {
        console.log('success');
        response.writeHead(200);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('error, could not succesfully add user. Please try again later.');
      });
  });
};

module.exports = postRegisterHandler;
