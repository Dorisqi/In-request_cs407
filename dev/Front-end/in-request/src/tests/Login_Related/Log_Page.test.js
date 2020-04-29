import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Login from '../../Components/Login_Related/Log_Page.js';

const wrapper = shallow(<Login />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
  it('should be an object', function(){
      const state = wrapper.find("this.state");
      expect(state).toEqual({});
  });
});

// describe('state component test', function () {
//   const Email =  wrapper.find("Email");
//   const Password =  wrapper.find("Password");
//   const Nickname =  wrapper.find("Nickname");
//   const auth =  wrapper.find("auth");
//   const fdb =  wrapper.find("fdb");
//   const name =  wrapper.find("name");
//   const index =  wrapper.find("index");
//   const tab_f =  wrapper.find("tab_f");
//   const success_open =  wrapper.find("success_open");

//   it('state should be an object', function(){
//       const state = wrapper.find("this.state");
//       expect(state).toEqual({});
//   });

//   // 1. Email
//   it('should have a Email state', function(){
//       expect(Email).toEqual({});
//   });

//   it('Email should be undefined if it is not defined', function() {
//       wrapper.setProps({ Email: ""});
//       expect(wrapper.state('Email')).toEqual("");
//   });

//   it('Email should have value if it has been assigned value', function(){
//       wrapper.setState({ Email: "test@purdue.edu"});
//       expect(wrapper.state('Email')).toEqual("test@purdue.edu");
//   });

//   // 2. Password
//   it('should have a Password1 state', function(){
//       expect(Password).toEqual({});
//   });

//   it('Password1 should be undefined if it is not defined', function() {
//       wrapper.setProps({ Password: ""});
//       expect(wrapper.state('Password')).toEqual("");
//   });

//   it('Password1 should have value if it has been assigned value', function(){
//       wrapper.setState({ Password: "123456"});
//       expect(wrapper.state('Password')).toEqual("123456");
//   });

//   // 3. Nickname
//   it('should have a Nickname state', function(){
//       expect(Nickname).toEqual({});
//   });

//   it('Nickname should be undefined if it is not defined', function() {
//       wrapper.setProps({ Nickname: ""});
//       expect(wrapper.state('Nickname')).toEqual("");
//   });

//   it('Nickname should have value if it has been assigned value', function(){
//       wrapper.setState({ Nickname: "test"});
//       expect(wrapper.state('Nickname')).toEqual("test");
//   });

//   // 4. auth
//   it('should have a auth state', function(){
//       expect(auth).toEqual({});
//   });

//   it('auth should be undefined if it is not defined', function() {
//       wrapper.setProps({ auth: this.auth});
//       expect(wrapper.state('auth')).toEqual(this.auth);
//   });
// });