/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
let globalUsers;

const user1 = document.getElementById('user1');
const user1Img = document.getElementById('user1Img');
const user2 = document.getElementById('user2');
const user2Img = document.getElementById('user2Img');

// Fn to set up a new quiz on the screen
const newQuiz = () => {
  getQuiz((err, userObjects) => {
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
const newWalls = () => {
  getWalls((err, wallsObject) => {
    if (err) {
      console.log('Error while getting walls');
    } else {
      const { wallOfFame, wallOfShame } = wallsObject;
      console.log('FAME');
      console.log(wallOfFame);
      console.log('SHAME');
      console.log(wallOfShame);
    }
  });
};

window.addEventListener('load', () => {
  newQuiz();
  newWalls();
});

const postQuizResults = (clickEvent) => {
  // Checks if the click event target has a globalUserIndex property
  if (Object.prototype.hasOwnProperty.call(clickEvent.target, 'globalUserIndex')) {
    const winnerIndex = clickEvent.target.globalUserIndex;
    // The only possible indexes are 0 and 1. We set the loser index based on the winner
    const loserIndex = winnerIndex === 0 ? 1 : 0;
    const winnerLoserObj = { winner: globalUsers[winnerIndex], loser: loserIndex[loserIndex] };
    postQuizRes(winnerLoserObj, (err) => {
      if (err) {
        console.log(err);
      }
    });
    newQuiz();
  } else {
    console.log('Sorry, there was a problem sending data to our servers.');
  }
};

user1.addEventListener('click', event => postQuizResults(event));
user2.addEventListener('click', event => postQuizResults(event));
