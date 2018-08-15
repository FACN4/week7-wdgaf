'use strict';

/* function for checking the user's validation */
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');
var username = document.getElementById('gitUsername');
var signupAlert = document.getElementById('signupAlert');
var emailErr = document.getElementById('emailErr');
var passwordErr = document.getElementById('passwordErr');
var confirmErr = document.getElementById('confirmErr');
var form = document.getElementById('form');

var checkEmail = function checkEmail() {
  if (email.validity.typeMismatch) {
    console.log(email.validity.typeMismatch);
    displayErr(emailErr, 'Please enter a valid email address');
  } else if (email.validity.valueMissing) {
    displayErr(emailErr, 'Please enter an email address');
  } else {
    displayErr(emailErr, '');
    return true;
  }
};

var checkPw = function checkPw() {
  if (password.validity.patternMismatch) {
    displayErr(passwordErr, 'Password must contain at least eight characters, including one letter and one number');
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
  } else {
    displayErr(passwordErr, '');
    return true;
  }
};

var checkConfirmPw = function checkConfirmPw() {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, 'Passwords do not match');
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, 'Please confirm your password');
  } else {
    displayErr(confirmErr, '');
    return true;
  }
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPw);
confirmPassword.addEventListener('focusout', checkConfirmPw);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Made it!');
  if (!checkEmail()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  } else {
    var signupDetails = {
      email: email.value,
      password: password.value,
      git_username: username.value
    };
    signupPostXhr(signupDetails, function (err) {
      if (err) {
        signupAlert.textContent = err;
      } else {
        console.log('success!');
        signupAlert.textContent = 'Registration success! Please go to the login page.';
      }
    });
  }
});