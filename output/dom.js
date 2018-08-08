'use strict';

/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
var globalUsers = void 0;

var user1 = document.getElementById('user1');
var user1Img = document.getElementById('user1Img');
var user2 = document.getElementById('user2');
var user2Img = document.getElementById('user2Img');

// Fn to set up a new quiz on the screen
var newQuiz = function newQuiz() {
  getQuiz(function (err, userObjects) {
    if (err) {
      console.log('Error while getting quiz');
    } else {
      globalUsers = userObjects;
      // globalUserIndex holds the user's index within the globalUsers variable
      user1.setAttribute('globalUserIndex', 0);
      user1Img.src = userObjects.user1.git_photo_url;
      user2.setAttribute('globalUserIndex', 1);
      user2Img.src = userObjects.user2.git_photo_url;
    }
  });
};

// Fn to set up the wall of fame/shame
var newWalls = function newWalls() {
  getWalls(function (err, wallsObject) {
    if (err) {
      console.log('Error while getting walls');
    } else {
      var wallOfFame = wallsObject.wallOfFame,
          wallOfShame = wallsObject.wallOfShame;

      console.log('FAME');
      console.log(wallOfFame);
      console.log('SHAME');
      console.log(wallOfShame);
    }
  });
};

window.addEventListener('load', function () {
  newQuiz();
  newWalls();
});

var postQuizResults = function postQuizResults(clickEvent) {
  // Checks if the click event target has a globalUserIndex property
  if (Object.prototype.hasOwnProperty.call(clickEvent.target, 'globalUserIndex')) {
    var winnerIndex = clickEvent.target.globalUserIndex;
    // The only possible indexes are 0 and 1. We set the loser index based on the winner
    var loserIndex = winnerIndex === 0 ? 1 : 0;
    var winnerLoserObj = { winner: globalUsers[winnerIndex], loser: loserIndex[loserIndex] };
    postQuizRes(winnerLoserObj, function (err) {
      if (err) {
        console.log(err);
      }
    });
    newQuiz();
  } else {
    console.log('Sorry, there was a problem sending data to our servers.');
  }
};

user1.addEventListener('click', function (event) {
  return postQuizResults(event);
});
user2.addEventListener('click', function (event) {
  return postQuizResults(event);
});