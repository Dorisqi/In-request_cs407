import React from "react";
import Enzyme from 'enzyme';
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Upload from '../../Components/Home/uploadimg.js';

const wrapper = shallow(<Upload />);

describe('state test', function () {
  it('should be an object', function(){
    expect(wrapper.state())
        .to.be.a("object")
  });

  it('should have 2 elements', function () {
    expect(wrapper.state())
        .that.has.all.keys("image", "url", "imgName")
  });
});
