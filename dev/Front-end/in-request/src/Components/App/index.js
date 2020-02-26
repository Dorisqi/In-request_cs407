import React, { Component } from 'react';
import './style.css';
// import Home from './../Home';
import Log_Page from './../Login_Related/Log_Page.js';
import SideBar from '../Shared/SideBar';
import { makeStyles } from '@material-ui/core/styles';


class App extends Component {
  render() {
    return (
  <div>
      <Log_Page/>
  </div>
    );
  }
}
export default App;
