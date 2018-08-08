/* File to export all of the handlers to the router document */

const homePageHandler = require('./homePageHandler.js');
const notFoundHandler = require('./notFoundHandler.js');
const assetsHandler = require('./assetsHandler.js');
const postQuizHandler = require('./postQuizHandler.js');
const getQuizHandler = require('./getQuizHandler.js');
const getWallsHandler = require('./getWallsHandler.js');

module.exports = {
  homePageHandler,
  notFoundHandler,
  assetsHandler,
  postQuizHandler,
  getQuizHandler,
  getWallsHandler,
};
