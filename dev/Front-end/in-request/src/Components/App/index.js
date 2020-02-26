import React, { Component } from 'react';
import './style.css';
// import Home from './../Home';
import Log_Page from './../Login_Related/Log_Page.js';
import SideBar from '../Shared/SideBar';
import { makeStyles } from '@material-ui/core/styles';

const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
  authDomain: "in-request.firebaseapp.com",
  databaseURL: "https://in-request.firebaseio.com",
  projectId: "in-request",
  storageBucket: "in-request.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This part is for firebase-cloud firestore setup
const admin = require('firebase-admin');

const serviceAccount = require('./in-request-firebase-adminsdk-2upr0-a94880f19f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class App extends Component {

  render() {
    return (
  <div>
      <Log_Page db = {db} firebase={firebase}/>
  </div>
    );
  }
}
export default App;
