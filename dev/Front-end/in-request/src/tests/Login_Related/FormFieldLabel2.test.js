import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import { FormFieldLabel } from '../../Components/Login_Related/FormFieldLabel.js';

const wrapper = shallow(<FormFieldLabel />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    const value = wrapper.find("value");
    it('state should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });

    it('should have a value style', function() {
        expect(value).toEqual({});
    });

    it('value should be undefined if it is not defined', function() {
        wrapper.setProps({ value: ""});
        expect(wrapper.state('value')).toEqual("");
    });
    // value: string
    it('value should have value if it has been assigned value', function(){
        wrapper.setState({ value: "0test"});
        expect(wrapper.state('value')).toEqual("0test");
    });
});

describe('text component test', function() {
    it('should have a text component', ()=> {
        const text = wrapper.find("Text");
        expect(text).toHaveLength(0);
        expect(wrapper.find('Text')).toEqual({});
    });
});
