"use strict";

var email = document.getElementById("email");
var password = document.getElementById("password");
var alert = document.getElementById("span");
var form = document.getElementById("loginForm")[0];

var sendlogin = function sendlogin(event) {
  event.preventDefault();
  loginDetails = {
    email: email.value,
    password: password.value
  };
  loginPostXhr(loginDetails, function (err, res) {
    if (err) {
      alert.textContent("Sorry, your login failed, please try again");
    } else {
      console.log("login success!");
    }
  });
};

form.addEventListener("submit", sendLogin);