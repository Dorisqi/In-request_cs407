import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Posts from '../../Components/Home/Posts';

const wrapper = shallow(<Posts />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    it('should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });
});

// describe('state test', function () {
//     it('should be an object', function(){
//         expect(wrapper.state())
//             .to.be.a("object")
//     });
//
//     it('should have 2 elements', function () {
//         expect(wrapper.state())
//             .that.has.all.keys("post_list", "fdb")
//     });
// });

