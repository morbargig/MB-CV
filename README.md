## [Mor Bargig CV](https://mor-bargig-cv.herokuapp.com)

web site for your Resume, so you can allway send the some CV link and your CV allways be up to date,
and you can update them every time from the internet in easy way.

[![Demo CountPages alpha](https://media.giphy.com/media/ReVsLYJBNg60DrEi8j/giphy.gif)](https://www.youtube.com/watch?v=AYlr8CLW-RA)

you want to use this website ? you welcome, run this command `git clone https://github.com/morbargig/MB-CV.git`

go inside the project folder `cd MB-CV`

to install all the libraries, run `npm install`

go to src/api/config/firebase.js
```javascript
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "???",
    authDomain: "???",
    databaseURL: "???",
    projectId: "???",
    storageBucket: "???",
    messagingSenderId: "???",
    appId: "???"
  };

class FirebaseApi {
  constructor() {
    this.firebase = firebase
    this.firebase.initializeApp(firebaseConfig);
    this.username = "???"
  }
  ...
```

you need to use your own firebase configuration and change the usernaame in the FirebaseApi api constructor!

or either use node.js exprees with local or remote mongoDB database and run it with `npm run startServer`

to start the project localy you will need to run `npm start`

to deploy it to heroku you will need to conect to your heroku project and run `npm run herokuPush`

to deploy it to github-pages you will need to set your own repository and run `npm run deploy` **(it don't going to work with the node.js express server and the mongoDB database, just with firebase configuration)

don't forget to send your CV :)


