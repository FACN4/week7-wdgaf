const email = document.getElementById('email');
const password = document.getElementById('password');
const alert = document.getElementById('span');
const form = document.getElementById('loginForm');

// const sendLogin = (event) => {
//   event.preventDefault();
//   loginDetails = {
//     email: email.value,
//     password: password.value,
//   };
//
//   loginPostXhr(loginDetails, (err, res) => {
//     if (err) {
//       alert.textContent('Sorry, your login failed, please try again');
//     } else {
//       console.log('login success!');
//     }
//   });
// };

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Made it!');
  const loginDetails = {
    email: email.value,
    password: password.value,
  };
  loginPostXhr(loginDetails, (err, res) => {
    if (err) {
      alert.textContent('Sorry, your login failed, please try again');
    } else {
      console.log('login success!');
    }
  });
});

// form.addEventListener('submit', sendLogin);
