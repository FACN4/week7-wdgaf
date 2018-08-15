/* global getQuiz postQuizRes getWalls */

// Define a global variable of the users currently on screen
let globalUsers;

const generateUserData = () => {
  getUserInfo((err, userData) => {
    username.textContent = userData;
  });
};

window.addEventListener('load', () => {
  generateUserData();
});
