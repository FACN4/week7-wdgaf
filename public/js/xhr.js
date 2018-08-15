/* eslint-disable no-unused-vars */

/* Function to get a request from the server based on the user's input */
const postQuizRes = (winnerLoserObj, cb) => {
  const xhr = new XMLHttpRequest();
  const url = '/post-quiz-result';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null);
      } else {
        cb(new Error('Sorry, your quiz response could not be handled.'));
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(winnerLoserObj));
};

/* Function to send signup details */
const signupPostXhr = function registerPostXhr(signupDetails, cb) {
  const xhr = new XMLHttpRequest();
  const url = '/sign-up';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null);
      } else {
        cb(new Error('Your register request could not be handled'));
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(signupDetails));
};

/* Function to send login deatails.. */
const loginPostXhr = function loginrPostXhr(loginDetails, cb) {
  const xhr = new XMLHttpRequest();
  const url = '/login';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null);
      } else {
        cb(new Error('Your login request could not be handled'));
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(loginDetails));
};
/* Generic xhr function used lower in this file */
const xhrGET = (url, errMessage, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        cb(new Error(errMessage));
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

const getQuiz = (cb) => {
  const url = '/get-quiz';
  const errMessage = 'Sorry, we were unable to bring you more GITs to compare.';
  xhrGET(url, errMessage, cb);
};

const getWalls = (cb) => {
  const url = '/get-walls';
  const errMessage = 'Sorry, we were unable provide a wall of fame/shame.';
  xhrGET(url, errMessage, cb);
};
