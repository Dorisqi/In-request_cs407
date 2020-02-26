var admin = require("firebase-admin");
var firebase = require("firebase/app");
var auth = require("firebase/auth");
var serviceAccount = require("D:/Program Files/In-request_cs407/in-request-firebase-adminsdk-2upr0-5ef7c09bb5.json");

var firebaseConfig = {
  apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
  authDomain: "in-request.firebaseapp.com",
  databaseURL: "https://in-request.firebaseio.com",
  projectId: "in-request",
  storageBucket: "in-request.appspot.com"
};
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

module.exports = {

  signup: function(fb, db, email, password, name, nickname){

  },

  login: function(fb, db, email, password, name, nickname){
    fb.auth().signInWithEmailAndPassword(email, password).catch(error => {
      const ref = db.collection('users').doc('stevenhanmq');
      let getDoc = ref.get().then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              console.log('Data:', doc.data());
            }
          })
          .catch(err => {
            console.log('Error getting data', err);
          });
    });
  },

  logout: function(fb, db, email, password, name, nickname){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  },

  resetPassword: function(fb, email, password, name, nickname){

  },

  addTag: function(db, tag){

  },

  assignTag: function(){

  }

};

function login(fb, db, email, password, name, nickname){
  fb.auth().signInWithEmailAndPassword(email, password).then(error => {
    // log-in successful.
    const ref = db.collection('users').doc(email);
    ref.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        ref.update({
          LoginState: true
        }).then(() => {
          console.log('login successful');
          // console.log('Data:', doc.data());
        });
      }
    }).catch(err => {
      // An error happened.
      console.log('Error logging in', err);
    });
  });
}

function logout(fb, db, email, password, name, nickname){
  fb.auth().signOut().then(function() {
    // log-out successful.
    const ref = db.collection('users').doc(email);
    ref.update({
      LoginState: false
    }).then(() => {
      console.log('logout successful');
    });
  }).catch(err => {
    // An error happened.
    console.log('Error logging out', err);
  });
}

login(firebase, db, "stevenhanmq1@gmail.com", "123456", "Mingqi Han1", "Steven1");
// logout(firebase, db, "stevenhanmq@gmail.com", "123456", "Mingqi Han", "Steven");
