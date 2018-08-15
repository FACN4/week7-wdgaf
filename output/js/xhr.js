'use strict';

/* eslint-disable no-unused-vars */

/* Function to get a request from the server based on the user's input */
var postQuizRes = function postQuizRes(winnerLoserObj, cb) {
  var xhr = new XMLHttpRequest();
  var url = '/post-quiz-result';
  xhr.onreadystatechange = function () {
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

/* Function to get user details details */
var getUserInfo = function getUserInfo(cb) {
  var url = '/get-user-data';
  var errMessage = 'Sorry, we cannot update the user info.';
  xhrGET(url, errMessage, cb);
};

// Function to logout the current user//
var logoutPostXhr = function logoutPostXhr(cb) {
  var xhr = new XMLHttpRequest();
  var url = '/logout';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null);
      } else {
        cb(new Error('Your logout request could not be handled'));
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
};

/* Generic xhr function used lower in this file */
var xhrGET = function xhrGET(url, errMessage, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
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

var getQuiz = function getQuiz(cb) {
  var url = '/get-quiz';
  var errMessage = 'Sorry, we were unable to bring you more GITs to compare.';
  xhrGET(url, errMessage, cb);
};

var getWalls = function getWalls(cb) {
  var url = '/get-walls';
  var errMessage = 'Sorry, we were unable provide a wall of fame/shame.';
  xhrGET(url, errMessage, cb);
};