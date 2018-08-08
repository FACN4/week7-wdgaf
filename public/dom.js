/* global getQuiz postQuizRes getWalls */

const user1 = document.getElementById('user1');
const user1Img = document.getElementById('user1Img');
const user2 = document.getElementById('user2');
const user2Img = document.getElementById('user2Img');

const newQuiz = () => {
  getQuiz((userObjects) => {
    user1.setAttribute('userID', userObjects.user1.user_id);
    user1Img.src = userObjects.user1.git_photo_url;
    user2.setAttribute('userID', userObjects.user2.user_id);
    user2Img.src = userObjects.user2.git_photo_url;
  });
};

const newWalls = () => {
  getWalls((wallsObject) => {
    const { wallOfFame, wallOfShame } = wallsObject;
    console.log('FAME');
    console.log(wallOfFame);
    console.log('SHAME');
    console.log(wallOfShame);
  });
};

window.addEventListener('load', () => {
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
