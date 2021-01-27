## [Mor Bargig CV](https://mor-bargig-cv.herokuapp.com)

web site for my CV, so I can allway send the some CV link and my CV allways be up to date,
and i can update them every time from the internet in easy way.

[![Demo CountPages alpha](https://media.giphy.com/media/ReVsLYJBNg60DrEi8j/giphy.gif)](https://www.youtube.com/watch?v=AYlr8CLW-RA)

you want to use this website ? you welcome, run this command `git clone https://github.com/morbargig/Mor-Bargig-CV-Vue.js.git`

after you need to install all the libraries, run `npm install`

to start the website you will need to run `npm start`

you need to fill this fields with you firebase details 
in src/api/config
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

don't forget to send your CV :)


