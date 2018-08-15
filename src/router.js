const handlers = require('./handlers/handlers.js');

const assetURLs = [
  '/index.html',
  '/js/dom.js',
  '/js/dom-signup.js',
  '/js/dom-login.js',
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
    handlers.homePageHandler(response);
  } else if (url.includes('/login-failed') && request.method === 'GET') {
    handlers.loginPageHandler(response);
  } else if (url.includes('/login-failed') && request.method === 'POST') {
    handlers.postLoginHandler(request, response);
  } else if (url.includes('/login') && request.method === 'GET') {
    handlers.loginPageHandler(response);
  } else if (url.includes('/login') && request.method === 'POST') {
    handlers.postLoginHandler(request, response);
  } else if (url.includes('/sign-up') && request.method === 'GET') {
    handlers.signUpHandler(response);
  } else if (url.includes('/sign-up') && request.method === 'POST') {
    handlers.postRegisterHandler(request, response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, response);
  } else if (url.includes('get-quiz')) {
    handlers.getQuizHandler(request, response);
  } else if (url.includes('get-walls')) {
    handlers.getWallsHandler(request, response);
  } else if (url.includes('post-quiz-result')) {
    handlers.postQuizHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
