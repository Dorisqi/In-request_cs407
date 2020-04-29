import React from "react";
import Enzyme from 'enzyme';
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import { FormFieldLabel } from '../../Components/Login_Related/FormFieldLabel.js';

const wrapper = shallow(<FormFieldLabel />);

describe('state test', function () {
    it('should be an object', function(){
        expect(wrapper.state())
            .to.be.a("object")
    });

    it('should have 1 elements', function () {
        expect(wrapper.state())
            .that.has.all.keys("value")
    });
});

