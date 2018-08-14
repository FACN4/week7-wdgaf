/* function for checking the user's validation */
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementsByTagName('form')[0];

const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passwordErr');
const confirmErr = document.getElementById('confirmErr');

const checkEmail = function () {
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

const checkPw = function () {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      'Password must contain at least eight characters, including one letter and one number',
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
  } else {
    displayErr(passwordErr, '');
    return true;
  }
};

const checkConfirmPw = function () {
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

form.addEventListener('submit', (event) => {
  if (!checkEmail()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  }
});
