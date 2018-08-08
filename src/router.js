const handlers = require('./handlers/handlers.js');

const assetURLs = ['/index.html', '/dom.js', '/style.css', '/xhr.js', '/favicon.ico', '/supertest-500'];

/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */
const router = (request, response) => {
  const { url } = request;
  if (url === '/') {
    handlers.homePageHandler(response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, response);
  } else if (url.includes('/request-quiz')) {
    handlers.quizResultHandler(request, response);
  } else if (url.includes('/request-walls')) {
    handlers.wallsResultHandler(request, response);
  } else if (url.includes('/push-quiz-result')) {
    handlers.quizPushHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
