'use strict';

/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
var globalUsers = void 0;

var user1 = document.getElementById('user1');
var user1Img = document.getElementById('user1Img');
var user1Name = document.getElementById('user1').getElementsByTagName('h2')[0];
var user2 = document.getElementById('user2');
var user2Img = document.getElementById('user2Img');
var user2Name = document.getElementById('user2').getElementsByTagName('h2')[0];

var warningMessage = function warningMessage(text, delay) {
  var warningBar = document.getElementById('alert');
  var warningText = warningBar.childNodes[1];
  warningText.textContent = text;
  warningBar.style.visibility = 'visible';
  if (delay) {
    setTimeout(function () {
      warningBar.style.visibility = 'hidden';
    }, delay);
  }
};

// Fn to set up a new quiz on the screen
var newQuiz = function newQuiz() {
  getQuiz(function (err, userObjects) {
    if (err) {
      warningMessage('Error while getting quiz', 2000);
    } else {
      globalUsers = userObjects;
      // globaluserindex holds the user's index within the globalUsers variable
      user1.setAttribute('globaluserindex', '0');
      user1Name.textContent = userObjects.user1.git_username;
      user1Img.src = userObjects.user1.git_photo_url;
      user2.setAttribute('globaluserindex', '1');
      user2Name.textContent = userObjects.user2.git_username;
      user2Img.src = userObjects.user2.git_photo_url;
    }
  });
};

// Fn to set up the wall of fame/shame
var generateWallHTML = function generateWallHTML(wallObj, ulId) {
  wallObj.forEach(function (user) {
    var node = document.createElement('LI'); // Create a <li> node
    var textnode = document.createTextNode(user.git_username); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    ulId.appendChild(node);
  });
};

var newWalls = function newWalls() {
  getWalls(function (err, wallsObject) {
    if (err) {
      warningMessage('Error while getting walls', 2000);
    } else {
      var wallOfFame = wallsObject.wallOfFame,
          wallOfShame = wallsObject.wallOfShame;

      var wallOfFameUL = document.getElementById('wall-of-fame');
      var wallOfShameUL = document.getElementById('wall-of-shame');
      generateWallHTML(wallOfFame, wallOfFameUL);
      generateWallHTML(wallOfShame, wallOfShameUL);
    }
  });
};

window.addEventListener('load', function () {
  newQuiz();
  newWalls();
});

var postQuizResults = function postQuizResults(winnerProp) {
  // The only possible properties are user1 and user2
  var loserProp = winnerProp === 'user1' ? 'user2' : 'user1';
  var winnerLoserObj = { winner: globalUsers[winnerProp], loser: globalUsers[loserProp] };
  postQuizRes(winnerLoserObj, function (err) {
    if (err) {
      warningMessage('Sorry, there was a problem with sending your answer', 3000);
    }
  });
  newQuiz();
};

user1.addEventListener('click', function () {
  return postQuizResults('user1');
}, true);
user2.addEventListener('click', function () {
  return postQuizResults('user2');
}, true);