const fs = require("fs");
const path = require("path");

/* Function to handle requests for the assets e.g. css, images, javascript pages
and send back the appropriate response */

const assetsHandler = (url, response) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png",
    json: "application/json"
  };
  const filePath = path.join(__dirname, "..", "..", "output", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>sorry, something went wrong</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

module.exports = assetsHandler;
