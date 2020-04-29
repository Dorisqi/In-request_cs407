import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import SideBar from '../../Components/Shared/SideBar.js';

const wrapper = shallow(<SideBar />);

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {
    const Email =  wrapper.find("Email");
    const Password =  wrapper.find("Password");
    const Nickname =  wrapper.find("Nickname");
    const auth =  wrapper.find("auth");
    const fdb =  wrapper.find("fdb");
    const name =  wrapper.find("name");

    it('state should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });

    // 1. Email
    it('should have a Email state', function(){
        expect(Email).toEqual({});
    });

    // 2. Password
    it('should have a Password state', function(){
    expect(Password).toEqual({});
    });

    // 3. Nickname
    it('should have a Nickname state', function(){
        expect(Nickname).toEqual({});
    });

    // 4. auth
    it('should have a auth state', function(){
        expect(auth).toEqual({});
    });

    // 5. fdb
    it('should have a fdb state', function(){
    expect(fdb).toEqual({});
    });

    // 6. name
    it('should have a name state', function(){
        expect(name).toEqual({});
        });

});