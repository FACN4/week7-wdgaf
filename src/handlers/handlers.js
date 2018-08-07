/* File to export all of the handlers to the router document */

const homePageHandler = require('./homePageHandler.js');
const notFoundHandler = require('./notFoundHandler.js');
const assetsHandler = require('./assetsHandler.js');
const pushQuizHandler = require('./pushQuizHandler.js');
const requestQuizHandler = require('./requestQuizHandler.js');
const requestWallsHandler = require('./requestWallsHandler.js');

module.exports = {
  homePageHandler,
  notFoundHandler,
  assetsHandler,
  pushQuizHandler,
  requestQuizHandler,
  requestWallsHandler,
};
