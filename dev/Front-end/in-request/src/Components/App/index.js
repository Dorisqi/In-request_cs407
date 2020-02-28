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

class App extends Component {

  render() {

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
          <Log_Page db={this.db} firebase={this.firebase}/>
        </Route>
      </Switch>
    </div>
  </Router>
    );
  }
}
export default App;
