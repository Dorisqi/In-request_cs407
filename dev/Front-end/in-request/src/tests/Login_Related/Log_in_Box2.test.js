import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import { Log_in_Box } from '../../Components/Login_Related/Log_in_Box.js';

const wrapper = shallow(<Log_in_Box />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    const Email =  wrapper.find("Email");
    const Password1 =  wrapper.find("Password1");
    const Password2 =  wrapper.find("Password2");
    const Open =  wrapper.find("Open");

    it('state should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });
    // 1. Email
    it('should have a Email state', function(){
        expect(Email).toEqual({});
    });

    it('Email should be undefined if it is not defined', function() {
        wrapper.setProps({ Email: ""});
        expect(wrapper.state('Email')).toEqual("");
    });

    it('Email should have value if it has been assigned value', function(){
        wrapper.setState({ Email: "test@purdue.edu"});
        expect(wrapper.state('Email')).toEqual("test@purdue.edu");
    });

    // 2. Password1
    it('should have a Password1 state', function(){
        expect(Password1).toEqual({});
    });

    it('Password1 should be undefined if it is not defined', function() {
        wrapper.setProps({ Password1: ""});
        expect(wrapper.state('Password1')).toEqual("");
    });

    it('Password1 should have value if it has been assigned value', function(){
        wrapper.setState({ Password1: "123456"});
        expect(wrapper.state('Password1')).toEqual("123456");
    });

    // 3. Password2 should equal to Password1
    it('should have a Password2 state', function(){
        expect(Password2).toEqual({});
    });

    it('Password2 should be undefined if it is not defined', function() {
        wrapper.setProps({ Password2: ""});
        expect(wrapper.state('Password2')).toEqual("");
    });

    it('Password1 should have value if it has been assigned value', function(){
        wrapper.setState({ Password2: Password1});
        expect(wrapper.state('Password2')).toEqual(Password1);
    });

    // 4. Open
    it('should have a Open state', function(){
        expect(Password2).toEqual({});
    });

    it('Open should be undefined if it is not defined', function() {
        wrapper.setProps({ Open: false});
        expect(wrapper.state('Open')).toEqual(false);
    });

    it('Open should have value if it has been assigned value', function(){
        wrapper.setState({ Open: true});
        expect(wrapper.state('Open')).toEqual(true);
    });
});

// describe('text component test', function() {
//     it('should have a text component', ()=> {
//         const text = wrapper.find("Text");
//         expect(text).toHaveLength(0);
//         expect(wrapper.find('Text')).toEqual({});
//     });
// });
