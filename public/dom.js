/* global getQuiz postQuizRes getWalls */

const user1 = document.getElementById('user1');
const user1Img = document.getElementById('user1Img');
const user1Name = document.getElementById('user1').getElementsByTagName('h2')[0];
const user2 = document.getElementById('user2');
const user2Img = document.getElementById('user2Img');
const user2Name = document.getElementById('user2').getElementsByTagName('h2')[0];

const newQuiz = () => {
  getQuiz((err, userObjects) => {
    if (err) {
      console.log('Error while getting quiz');
    } else {
      console.log(userObjects);
      user1.setAttribute('userID', userObjects.user1.user_id);
      user1Name.textContent = userObjects.user1.git_username;
      user1Img.src = userObjects.user1.git_photo_url;
      user2.setAttribute('userID', userObjects.user2.user_id);
      user2Name.textContent = userObjects.user2.git_username;
      user2Img.src = userObjects.user2.git_photo_url;
    }
  });
};

const generateWallHTML = (wallObj, ulId) => {
  wallObj.forEach((user) => {
    const node = document.createElement('LI'); // Create a <li> node
    const textnode = document.createTextNode(user.git_username); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    ulId.appendChild(node);
  });
};

const newWalls = () => {
  getWalls((err, wallsObject) => {
    if (err) {
      console.log('Error while getting walls');
    } else {
      const { wallOfFame, wallOfShame } = wallsObject;
      const wallOfFameUL = document.getElementById('wall-of-fame');
      const wallOfShameUL = document.getElementById('wall-of-shame');
      generateWallHTML(wallOfFame, wallOfFameUL);
      generateWallHTML(wallOfShame, wallOfShameUL);
    }
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
