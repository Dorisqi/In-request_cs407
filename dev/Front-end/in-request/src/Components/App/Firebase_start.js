import firebase from "firebase/app"
import admin from "firebase-admin"
import serviceAccount from './in-request-firebase-adminsdk-2upr0-a94880f19f.json'
import "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
  authDomain: "in-request.firebaseapp.com",
  databaseURL: "https://in-request.firebaseio.com",
  projectId: "in-request",
  storageBucket: "in-request.appspot.com",
  messagingSenderId: "566878675007",
  appId: "1:566878675007:web:234477171d4f9c7311d88a",
  measurementId: "G-5PRZRKXFQ2"
};
//const firebase = require("firebase/app");
firebase.initializeApp(firebaseConfig);
const auth= firebase.auth()
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export {db,firebase as default} 


// This part is for firebase-cloud firestore setup
//const admin = require('firebase-admin');
