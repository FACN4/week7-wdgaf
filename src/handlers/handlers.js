/* File to export all of the handlers to the router document */

const loginPageHandler = require('./loginPageHandler.js');
const notFoundHandler = require('./notFoundHandler.js');
const assetsHandler = require('./assetsHandler.js');
const postQuizHandler = require('./postQuizHandler.js');
const getQuizHandler = require('./getQuizHandler.js');
const getWallsHandler = require('./getWallsHandler.js');
const signUpHandler = require('./signUpHandler.js');
const homePageHandler = require('./homePageHandler.js');
const postRegisterHandler = require('./postRegisterHandler');
const postLoginHandler = require('./postLoginHandler');
const postLogoutHandler = require('./postLogoutHandler');

module.exports = {
  loginPageHandler,
  notFoundHandler,
  assetsHandler,
  postQuizHandler,
  getQuizHandler,
  getWallsHandler,
  signUpHandler,
  homePageHandler,
  postRegisterHandler,
  postLoginHandler,
  postLogoutHandler,
};
