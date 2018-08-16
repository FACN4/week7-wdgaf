
# Rate My Git 2.0 by We Don't Give a FAC - Ben, Suha & Matt

Rate My Git 2 >> https://rate-my-git-2.herokuapp.com/

This project is an extension on Team Awesome's project from Week 6. See the original site here >> https://rate-my-git.herokuapp.com/
See the original repository here >> https://github.com/FACN4/Week6-Rate-My-GIT

## Additional Features
  - **User signup and login page**
  - **Username and profile pic displayed in the top right of the main page**
  - **Each user can review their own voting history**

![](https://i.imgur.com/GHcn82q.png)

![](https://i.imgur.com/F9NmxY0.png)

## Preparation

### We had a great preparation session where we discussed ideas

![](https://i.imgur.com/dI3Hrpc.jpg)

### Created Wireframes

![](https://i.imgur.com/389OxWG.jpg)

### And Schemas...

![](https://i.imgur.com/JWx9o2R.jpg)

### Discussed this week's material and who wanted to work on what

![](https://i.imgur.com/mcOXTnN.jpg)

### And discussed ways of working as a team

![](https://i.imgur.com/xAmVhQw.jpg)

## New Code

### We used promises for the first time and found them much easier than callbacks

``` Javascript
const postRegisterHandler = (request, response) => {
  /* Using post method so data is coming in streams */
  let allData = '';
  request.on('data', (data) => {
    allData += data;
  });
  /* Method to trigger when all data has been received */
  request.on('end', () => {
    const userData = JSON.parse(allData);
    console.log(userData);
    bcrypt
      .hash(userData.password, 10)
      .then(hash => postNewUser(userData.email, hash, userData.git_username))
      .then(() => {
        console.log('success');
        response.writeHead(200);
        response.end();
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === '23505') {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Sorry, the email address already exists. Please choose another.');
        } else {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('error, could not succesfully add user. Please try again later.');
        }
      });
  });
};
```

### We served users different pages based on their cookie

``` javascript
if (url === '/') {
    if (request.headers.cookie) {
      const { jwt } = cookie.parse(request.headers.cookie);
      verify(jwt, SECRET, (err) => {
        if (err) {
          handlers.noCookieHandler(response);
        } else {
          handlers.homePageHandler(response);
        }
      });
    } else {
      handlers.noCookieHandler(response);
    }
  }
 
 ```

### And personalised their content based on their cookie

We did a simple XHR to the server which responded with..

![](https://i.imgur.com/mfDEmuV.png)

``` javascript
const cookie = require('cookie');
const { verify } = require('jsonwebtoken');

const getUserDataHandler = (request, response) => {
  if (request.headers.cookie) {
    const { jwt } = cookie.parse(request.headers.cookie);
    verify(jwt, SECRET, (err, username) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Sorry, unable to fulfil request' }));
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(username));
      }
    });
  }
};
```

## Learnings

### It's tough to work on an existing project

Taking on other people's work, learning it and building on it in a day and a half is a difficult but important skill

![](https://i.imgur.com/zfSYHkE.png)

### Promises are cool but be careful to understand what modules are returning by default..

https://media.giphy.com/media/l0K4fIEZ1FFiWFJPq/giphy.gif

We tried to use promises as much as possible however some modules support callbacks by default and you need a different version for promises e.g. PG & pgpromises. Make sure you're using the right version of modules if you want to use promises!!

BRING ON EXPRESS


