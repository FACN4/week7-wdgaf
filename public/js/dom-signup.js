/* function for checking the user's validation */
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const username = document.getElementById('gitUsername');
const signUpBtn = document.getElementById('signUpBtn');
const signupAlert = document.getElementById('signupAlert');
const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passwordErr');
const confirmErr = document.getElementById('confirmErr');
const form = document.getElementById('form');

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
    const signupDetails = {
      email: email.value,
      password: password.value,
      git_username: username.value,
    };
    signupPostXhr(signupDetails, (err) => {
      if (err) {
        signupAlert.textContent = 'Registration failed. Please try again';
      } else {
        console.log('success!');
        signupAlert.textContent = 'Registration success! Please go to the login page.';
      }
    });
  }
});
