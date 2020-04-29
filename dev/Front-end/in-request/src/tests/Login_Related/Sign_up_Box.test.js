import React from "react";
import Enzyme from 'enzyme';
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import { Sign_up_Box } from '../../Components/Login_Related/Sign_up_Box.js';

const wrapper = shallow(<Sign_up_Box />);

describe('state test', function () {
  it('should be an object', function(){
    expect(wrapper.state())
        .to.be.a("object")
  });

  it('should have 4 elements', function () {
    expect(wrapper.state())
        .that.has.all.keys("Email", "Password1", "Password2", "Nickname")
  });
});
