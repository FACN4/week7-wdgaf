'use strict';

var email = document.getElementById('email');
var password = document.getElementById('password');
var alert = document.getElementById('span');
var form = document.getElementById('loginForm');

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

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Made it!');
  event.preventDefault();
  var loginDetails = {
    email: email.value,
    password: password.value
  };
  loginPostXhr(loginDetails, function (err, res) {
    if (err) {
      alert.textContent('Sorry, your login failed, please try again');
    } else {
      console.log('login success!');
    }
  });
});

// form.addEventListener('submit', sendLogin);