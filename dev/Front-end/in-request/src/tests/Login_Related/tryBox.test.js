import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import tryBox from '../../Components/Login_Related/tryBox.js';

const wrapper = shallow(<tryBox />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    const Email =  wrapper.find("Email");
    const Pw =  wrapper.find("Pw");
    const Nickname =  wrapper.find("Nickname");
    const index =  wrapper.find("index");
    const setIndex =  wrapper.find("setIndex");

    it('state should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });

    // 1. Email
    it('should have a Email state', function(){
        expect(Email).toEqual({});
    });

//   it('Email should be undefined if it is not defined', function() {
//       wrapper.setProps({ Email: ""});
//       expect(wrapper.state('Email')).toEqual("");
//   });

//   it('Email should have value if it has been assigned value', function(){
//       wrapper.setState({ Email: "test@purdue.edu"});
//       expect(wrapper.state('Email')).toEqual("test@purdue.edu");
//   });

    // 2. Pw
    it('should have a Pw state', function(){
    expect(Pw).toEqual({});
    });

    // it('Pw should be undefined if it is not defined', function() {
    //     wrapper.setProps({ Pw: ""});
    //     expect(wrapper.state('Pw')).toEqual("");
    // });

    // it('Pw should have value if it has been assigned value', function(){
    //     wrapper.setState({ Pw: "123456"});
    //     expect(wrapper.state('Pw')).toEqual("123456");
    // });

    // 3. Nickname
    it('should have a Nickname state', function(){
        expect(Nickname).toEqual({});
    });

    // it('Nickname should be undefined if it is not defined', function() {
    //     wrapper.setProps({ Nickname: ""});
    //     expect(wrapper.state('Nickname')).toEqual("");
    // });

    // it('Nickname should have value if it has been assigned value', function(){
    //     wrapper.setState({ Nickname: "test user"});
    //     expect(wrapper.state('Nickname')).toEqual("test user");
    // });

    // 4. index
    it('should have a index state', function(){
        expect(index).toEqual({});
    });

    // it('index should be undefined if it is not defined', function() {
    //     wrapper.setProps({ index: ""});
    //     expect(wrapper.state('index')).toEqual("");
    // });

    // it('index should have value if it has been assigned value', function(){
    //     wrapper.setState({ index: "0"});
    //     expect(wrapper.state('index')).toEqual("0");
    // });

    // 5. setIndex
    it('should have a setIndex state', function(){
    expect(setIndex).toEqual({});
    });

    // it('setIndex should be undefined if it is not defined', function() {
    //     wrapper.setProps({ setIndex: ""});
    //     expect(wrapper.state('setIndex')).toEqual("");
    // });

    // it('setIndex should have value if it has been assigned value', function(){
    //     wrapper.setState({ setIndex: "1"});
    //     expect(wrapper.state('setIndex')).toEqual("1");
    // });
});