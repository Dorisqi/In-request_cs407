import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import profile from '../../Components/Home/profile.js';

const wrapper = shallow(<profile />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    it('should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });
});