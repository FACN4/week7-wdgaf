'use strict';

/* eslint-disable no-unused-vars */

/* Function to get a request from the server based on the user's input */
var xhrPOST = function xhrPOST(url, body, cb) {
  var xhr = new XMLHttpRequest();
  var urlExtension = url;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null);
      } else {
        cb(new Error('Sorry, your quiz response could not be handled.'));
      }
    }
  };
  xhr.open('POST', urlExtension, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};

var postQuizRes = function postQuizRes(url, body, cb) {
  xhrPOST(url, body, cb);
};

// Function to logout the current user//

var logoutPostXhr = function logoutPostXhr(url, cb) {
  xhrPOST(url, null, cb);
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

/* Function to get user details details */
var getUserInfo = function getUserInfo(cb) {
  var url = '/get-user-data';
  var errMessage = 'Sorry, we cannot update the user info.';
  xhrGET(url, errMessage, cb);
};