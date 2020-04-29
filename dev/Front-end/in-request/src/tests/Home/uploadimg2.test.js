import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Upload from '../../Components/Home/uploadimg.js';

const wrapper = shallow(<Upload />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    it('state should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });

    //1. image
    it('image should be undefined if it is not defined', function() {
        expect(wrapper.setProps({ image: null}));
        expect(wrapper.state('image')).toEqual("");
    });
    
    //2. url
    it('url should be undefined if it is not defined', function() {
        expect(wrapper.setProps({ url: ""}));
        expect(wrapper.state('url')).toEqual(undefined);
    });
});

describe('button component test', function() {
    it('should have a button component', ()=> {
        const button = wrapper.find("Button");
        expect(button).toHaveLength(0);
        expect(wrapper.find('Button')).toEqual({});
    });
});

describe("style component test", function() {
    const height = wrapper.find("height");
    const display = wrapper.find("display");
    const flexDirection = wrapper.find("flexDirection");
    const alignItems =  wrapper.find("alignItems");

    //1. height
    it('should have a height style', function() {
        expect(height).toEqual({});
    });

    it('height should be undefined if it is not defined', function() {
        wrapper.setProps({ height: ""});
        expect(wrapper.state('height')).toEqual(undefined);
    });

    it('height should have value if it has been assigned value', function(){
        wrapper.setState({ height: "100vh"});
        expect(wrapper.state('height')).toEqual("100vh");
    });
    
    //2. display
    it('should have a display style', function() {
        expect(display).toEqual({});
    });

    it('display should be undefined if it is not defined', function() {
        wrapper.setProps({ display: ""});
        expect(wrapper.state('display')).toEqual(undefined);
    });

    it('display should have value if it has been assigned value', function(){
        wrapper.setState({ display: "flex"});
        expect(wrapper.state('display')).toEqual("flex");
    });

    //3. flexDirection
    it('should have a flexDirection style', function() {
        expect(flexDirection).toEqual({});
    });

    it('flexDirection should be undefined if it is not defined', function() {
        wrapper.setProps({ flexDirection: ""});
        expect(wrapper.state('flexDirection')).toEqual(undefined);
    });

    it('flexDirection should have value if it has been assigned value', function(){
        wrapper.setState({ flexDirection: "column"});
        expect(wrapper.state('flexDirection')).toEqual("column");
    });

    //4. alignItems
    it('should have a alignItems style', function(){
        expect(alignItems).toEqual({});
    });

    it('alignItems should be undefined if it is not defined', function() {
        wrapper.setProps({ alignItems: ""});
        expect(wrapper.state('alignItems')).toEqual(undefined);
    });

    it('alignItems should have value if it has been assigned value', function(){
        wrapper.setState({ alignItems: "center"});
        expect(wrapper.state('alignItems')).toEqual("center");
    });
});
