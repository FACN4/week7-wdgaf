/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
let globalUsers;

const user1 = document.getElementById('user1');
const user1Img = document.getElementById('user1Img');
const user1Name = document.getElementById('user1').getElementsByTagName('h2')[0];
const user2 = document.getElementById('user2');
const user2Img = document.getElementById('user2Img');
const user2Name = document.getElementById('user2').getElementsByTagName('h2')[0];


const warningMessage = (text, delay) => {
  const warningBar = document.getElementById('alert');
  const warningText = warningBar.childNodes[1];
  warningText.textContent = text;
  warningBar.style.visibility = 'visible';
  if (delay) {
    setTimeout(() => {
      warningBar.style.visibility = 'hidden';
    }, delay);
  }
};

// Fn to set up a new quiz on the screen
const newQuiz = () => {
  getQuiz((err, userObjects) => {
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
const generateWallHTML = (wallObj, ulId) => {
  wallObj.forEach((user, counter) => {
    const node = document.createElement('LI'); // Create a <li> node
    const image = document.createElement('IMG');
    const header = document.createElement('h3');
    header.textContent = `${counter + 1}.  ${user.git_username}`;
    image.src = user.git_photo_url;
    node.appendChild(image);
    node.appendChild(header); // Append the text to <li>
    ulId.appendChild(node);
  });
};


const newWalls = () => {
  getWalls((err, wallsObject) => {
    if (err) {
      warningMessage('Error while getting walls', 2000);
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

const postQuizResults = (winnerProp) => {
  // The only possible properties are user1 and user2
  const loserProp = winnerProp === 'user1' ? 'user2' : 'user1';
  const winnerLoserObj = { winner: globalUsers[winnerProp], loser: globalUsers[loserProp] };
  postQuizRes(winnerLoserObj, (err) => {
    if (err) {
      warningMessage('Sorry, there was a problem with sending your answer', 3000);
    }
  });
  newQuiz();
};

user1.addEventListener('click', () => postQuizResults('user1'), true);
user2.addEventListener('click', () => postQuizResults('user2'), true);
