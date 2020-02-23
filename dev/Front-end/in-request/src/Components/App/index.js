import React, { Component } from 'react';
import './style.css';
import Home from './../Home';

import SideBar from '../Shared/SideBar';

class App extends Component {
  render() {
    return (
  <div>
    <SideBar/>
    <Home/>
  </div>
    );
  }
}
export default App;
