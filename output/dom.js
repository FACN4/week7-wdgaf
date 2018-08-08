'use strict';

/* global getQuiz postQuizRes getWalls */

var user1 = document.getElementById('user1');
var user1Img = document.getElementById('user1Img');
var user2 = document.getElementById('user2');
var user2Img = document.getElementById('user2Img');

var newQuiz = function newQuiz() {
  getQuiz(function (err, userObjects) {
    if (err) {
      console.log('Error while getting quiz');
    } else {
      console.log(userObjects);
      user1.setAttribute('userID', userObjects.user1.user_id);
      user1Img.src = userObjects.user1.git_photo_url;
      user2.setAttribute('userID', userObjects.user2.user_id);
      user2Img.src = userObjects.user2.git_photo_url;
    }
  });
};

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

// const postQuizResults = (clickEvent) => {
//   const winnerUserID = clickEvent.target.userID;
//   const loserUserID = clickEvent.target.userID;
//   const winnerLoserObj = { winner: winnerUserID, loser: loserUserID };
//   postQuizRes(winnerLoserObj, console.log);
//   newQuiz();
// };
//
// user1.addEventListener('click', event => postQuizResults(event));
// user2.addEventListener('click', event => postQuizResults(event));