const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test('--------------router_tests.js----------tape is working', (t) => {
  t.ok(true);
  t.end();
});

/* Supertest Tests on the frontend responses */

test('Home route returns a 302 when not logged in Ok', (t) => {
  supertest(router)
    .get('/')
    .expect(302)
    .end((err) => {
      t.error(err);
      t.end();
    });
});

// /* Testing that pages not found return a 404 response code */

test('A URL not found returns 404', (t) => {
  supertest(router)
    .get('/this_is_a_404_error')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.text,
        '<h1>Sorry, Page Not Found</h1>',
        "response should contain 'Sorry, Page Not Found'",
      );
      t.end();
    });
});

/* Testing that JavaScript files return a 200 */

test('JavaScript files should return a 200', (t) => {
  supertest(router)
    .get('/js/dom.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end((err) => {
      t.error(err);
      t.end();
    });
});

// /* Testing that CSS files return a 200 */

test('CSS files should return a 200', (t) => {
  supertest(router)
    .get('/style.css')
    .expect(200)
    .expect('Content-Type', /css/)
    .end((err) => {
      t.error(err);
      t.end();
    });
});

/* Testing that 500 errors return a 500 status code */

test('Unfound file paths should return a 500 error', (t) => {
  supertest(router)
    .get('/supertest-500')
    .expect(500)
    .expect('Content-Type', /html/)
    .end((err) => {
      t.error(err);
      t.end();
    });
});
