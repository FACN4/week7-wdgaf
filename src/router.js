const cookie = require('cookie');
const { verify } = require('jsonwebtoken');
const handlers = require('./handlers/handlers.js');

const { SECRET } = process.env;

const assetURLs = [
  '/index.html',
  '/js/dom.js',
  '/js/dom-signup.js',
  '/js/dom-login.js',
  '/js/dom-votehistory.js',
  '/style.css',
  '/js/xhr.js',
  '/favicon.ico',
  '/supertest-500',
];

/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */
const router = (request, response) => {
  const { url } = request;
  if (url === '/') {
    if (request.headers.cookie) {
      const { jwt } = cookie.parse(request.headers.cookie);
      verify(jwt, SECRET, (err) => {
        if (err) {
          handlers.noCookieHandler(response);
        } else {
          handlers.homePageHandler(response);
        }
      });
    } else {
      handlers.noCookieHandler(response);
    }
  } else if (url === '/login-failed' && request.method === 'GET') {
    handlers.loginFailedPageHandler(response);
  } else if (url === '/login-failed' && request.method === 'POST') {
    handlers.postLoginHandler(request, response);
  } else if (url.includes('/login-failed') && request.method === 'GET') {
    handlers.loginPageHandler(response);
  } else if (url.includes('/login-failed') && request.method === 'POST') {
    handlers.postLoginHandler(request, response);
  } else if (url === '/login' && request.method === 'GET') {
    handlers.loginPageHandler(response);
  } else if (url === '/login' && request.method === 'POST') {
    handlers.postLoginHandler(request, response);
  } else if (url.includes('/sign-up') && request.method === 'GET') {
    handlers.signUpHandler(response);
  } else if (url.includes('/sign-up') && request.method === 'POST') {
    handlers.postRegisterHandler(request, response);
  } else if (url.includes('/logout') && request.method === 'POST') {
    handlers.postLogoutHandler(response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, response);
  } else if (url.includes('get-quiz')) {
    handlers.getQuizHandler(request, response);
  } else if (url.includes('vote-history')) {
    handlers.getVoteHistoryHandler(request, response);
  } else if (url.includes('get-user-data')) {
    handlers.getUserDataHandler(request, response);
  } else if (url.includes('get-walls')) {
    handlers.getWallsHandler(request, response);
  } else if (url.includes('post-quiz-result')) {
    handlers.postQuizHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
