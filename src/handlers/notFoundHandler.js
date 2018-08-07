/* Function to handle 404 Pages (Pages not found) and return the appropriate
response code and content */

const notFoundHandler = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>Sorry, Page Not Found</h1>');
};

module.exports = notFoundHandler;
