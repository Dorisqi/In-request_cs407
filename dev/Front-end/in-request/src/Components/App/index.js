import React, { Component } from 'react';
import './style.css';
// import Home from './../Home';
import Log_Page from './../Login_Related/Log_Page.js';
import SideBar from '../Shared/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
  messagingSenderId: "566878675007",
  appId: "1:566878675007:web:234477171d4f9c7311d88a",
  measurementId: "G-5PRZRKXFQ2"
};

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
//
// // This part is for firebase-cloud firestore setup
// const admin = require('firebase-admin');
//
// const serviceAccount = require('./in-request-firebase-adminsdk-2upr0-a94880f19f.json');
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
//
// const db = admin.firestore();

class App extends Component {

  render() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // This part is for firebase-cloud firestore setup
    const admin = require('firebase-admin');

    const serviceAccount = require('./in-request-firebase-adminsdk-2upr0-a94880f19f.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();
    return (

  <Router>
    <div>
      <ul>
        <li>
          <Link to="/posts">Home</Link>

        </li>
      </ul>

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>

        <Route path="/posts">
          <SideBar/>
        </Route>
      </Switch>
    </div>
  </Router>
    );
  }
}
export default App;
