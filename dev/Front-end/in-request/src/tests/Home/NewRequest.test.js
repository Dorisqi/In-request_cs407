import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import NewRequest from '../../Components/Home/NewRequest.js';

const wrapper = shallow(<NewRequest />);

const itemName =  wrapper.find("itemName");
const description =  wrapper.find("description");
const estimateVal =  wrapper.find("estimateVal");
const returnDate =  wrapper.find("returnDate");
const durationTime =  wrapper.find("durationTime");
const tagList =  wrapper.find("tagList");

const color1 =  wrapper.find("color1");
const color2 =  wrapper.find("color2");
const color3 =  wrapper.find("color3");
const color4 =  wrapper.find("color4");
const color5 =  wrapper.find("color5");
const color6 =  wrapper.find("color6");
const color7 =  wrapper.find("color7");
const color8 =  wrapper.find("color8");
const color9 =  wrapper.find("color9");
const color11 =  wrapper.find("color11");
const color12 =  wrapper.find("color12");

it('renders without crashing', () => {
    expect(true).toBeTruthy();
});

describe('state component test', function () {

    it('should be an object', function(){
        const state = wrapper.find("this.state");
        expect(state).toEqual({});
    });

    it('state should have components', ()=> {
        expect(wrapper.containsMatchingElement(itemName, description, estimateVal, returnDate, durationTime, tagList, color1, color2, color3, color4, color5, color6, color7, color8, color9, color11, color12));
    });

    // 1. itemName
    it('should have a itemName state', function(){
        expect(itemName).toEqual({});
    });

    // 2. description
    it('should have a description state', function(){
        expect(description).toEqual({});
    });

    // 3. estimateVal
    it('should have a estimateVal state', function(){
        expect(estimateVal).toEqual({});
    });

    // 4. returnDate
    it('should have a returnDate state', function(){
        expect(returnDate).toEqual({});
    });

    // 5. durationTime
    it('should have a durationTime state', function(){
        expect(durationTime).toEqual({});
    });

    // 6. tagList
    it('should have a tagList state', function(){
        expect(tagList).toEqual({});
    });

    // 7. color1
    it('should have a color1 state', function(){
        expect(color1).toEqual({});
    });

    // 8. color2
    it('should have a color2 state', function(){
        expect(color2).toEqual({});
    });

    // 9. color3
    it('should have a color3 state', function(){
        expect(color3).toEqual({});
    });

    // 10. color4
    it('should have a color4 state', function(){
        expect(color4).toEqual({});
    });

    // 11. color5
    it('should have a color5 state', function(){
        expect(color5).toEqual({});
    });

    // 12. color6
    it('should have a color6 state', function(){
        expect(color6).toEqual({});
    });

    // 13. color7
    it('should have a color7 state', function(){
        expect(color7).toEqual({});
    });

    // 14. color8
    it('should have a color8 state', function(){
        expect(color8).toEqual({});
    });

    // 15. color9
    it('should have a color9 state', function(){
        expect(color9).toEqual({});
    });

    // 16. color11
    it('should have a color11 state', function(){
        expect(color11).toEqual({});
    });

    // 17. color12
    it('should have a color12 state', function(){
        expect(color12).toEqual({});
    });

});

describe('tagList test', function(){
    //color1
    it('should check tagList value by color1', function(){
        if (color1 == 1) {
            expect(tagList).toEqual("HICKS");
        }
    });

    //color2    
    it('should check tagList value by color2', function(){
        if (color2 == 1) {
            expect(tagList).toEqual("LWSN");
        }
    });

    //color3
    it('should check tagList value by color3', function(){
        if (color3 == 1) {
            expect(tagList).toEqual("PMU");
        }
    });

    //color4
    it('should check tagList value by color4', function(){
        if (color4 == 1) {
            expect(tagList).toEqual("ECE");
        }
    });

    //color5
    it('should check tagList value by color5', function(){
        if (color5 == 1) {
            expect(tagList).toEqual("LEVEL1");
        }
    });

    //color6
    it('should check tagList value by color6', function(){
        if (color6 == 1) {
            expect(tagList).toEqual("LEVEL2");
        }
    });

    //color7
    it('should check tagList value by color7', function(){
        if (color7 == 1) {
            expect(tagList).toEqual("LEVEL3");
        }
    });

    //color8
    it('should check tagList value by color8', function(){
        if (color8 == 1) {
            expect(tagList).toEqual("Stationery");
        }
    });

    //color9
    it('should check tagList value by color9', function(){
        if (color9 == 1) {
            expect(tagList).toEqual("Commute");
        }
    });

    //color11
    it('should check tagList value by color11', function(){
        if (color11 == 1) {
            expect(tagList).toEqual("Living Essentials");
        }
    });

    //color12
    it('should check tagList value by color12', function(){
        if (color12 == 1) {
            expect(tagList).toEqual("Sports");
        }
    });
});

describe('button component test', function() {
    it('should have a Submit button component', ()=> {
        const button = wrapper.find("SUBMIT");
        expect(button).toHaveLength(0);
        expect(wrapper.find('SUBMIT')).toEqual({});
    });
});

describe('fdb collection test', function() {
    const title =  wrapper.find("title");
    const content =  wrapper.find("content");
    const price =  wrapper.find("price");
    const estReturn =  wrapper.find("estReturn");
    const drTime =  wrapper.find("drTime");
    const taglist =  wrapper.find("taglist");
    const borrower =  wrapper.find("borrower");
    const comments =  wrapper.find("comments");
    const status =  wrapper.find("status");

    it('should have a fdb collection', ()=> {
        const addDoc = wrapper.find("addDoc");
        expect(addDoc).toBeTruthy();
    });

    it('fdb collection should have components', ()=> {
        expect(wrapper.containsMatchingElement(title, content, price, estReturn, drTime, taglist, borrower, comments, status));
    });
    
});