const handlers = require("./handlers/handlers.js");

const assetURLs = [
  "/index.html",
  "/dom.js",
  "/style.css",
  "/xhr.js",
  "/favicon.ico",
  "/supertest-500"
];

/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */
const router = (request, response) => {
  const { url } = request;
  console.log(url);
  if (url === "/") {
    handlers.loginPageHandler(response);
  } else if (url === "/indx.html") {
    handlers.homePageHandler(request, response);
  } else if (url === "/sign-up.html") {
    handlers.signUpHandler(response);
  } else if (url.includes("public")) {
    handlers.assetsHandler(url.substring(7), response);
  } else if (url.includes("get-quiz")) {
    handlers.getQuizHandler(request, response);
  } else if (url.includes("get-walls")) {
    handlers.getWallsHandler(request, response);
  } else if (url.includes("post-quiz-result")) {
    handlers.postQuizHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
