'use strict';

/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
var globalUsers = void 0;

var generateUserData = function generateUserData() {
  getUserInfo(function (err, userData) {
    username.textContent = userData;
  });
};

window.addEventListener('load', function () {
  generateUserData();
});