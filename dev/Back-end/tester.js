const myserver = require('./server.js');

//***********************************************************************************************
//This part is for firebase authentication, firebase SDK

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
  authDomain: "in-request.firebaseapp.com",
  databaseURL: "https://in-request.firebaseio.com",
  projectId: "in-request",
  storageBucket: "in-request.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//***********************************************************************************************


//***********************************************************************************************
// This part is for firebase-cloud firestore setup
const admin = require('firebase-admin');

let serviceAccount = require('./in-request-firebase-adminsdk-2upr0-c8dc9153f9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//***********************************************************************************************

//first create some user's profile, in both auth and clouddb

firebase.auth().createUserWithEmailAndPassword('stevenhanmq@gmail.com', '123456').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

const userRef = db.collection('users');

let setSf = userRef.doc('stevenhanmq@gmail.com').set({
  name: 'Mingqi Han', nickname: 'Steven', email: 'stevenhanmq@gmail.com',
  LoginState: true, photostate: false
});


console.log(myserver.signup(firebase, db, 'stevenhanmq1@gmail.com', '123456', 'Mingqi Han1', 'Steven1'));

myserver.postRequest(db, "some title", "some description", "stevenhanmq@gmail.com");

myserver.addTag(db, '1', 'tag1');
myserver.addTag(db, '2', 'tag2');
myserver.addTag(db, '3', 'tag3');
myserver.addTag(db, '4', 'tag4');
myserver.addTag(db, '5', 'tag5');

var words;
console.log(words);
myserver.getAllTags(db, words);

console.log(words);
setTimeout(function(){ console.log(words); }, 3000);
