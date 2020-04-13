import React from 'react';
import { mount } from 'enzyme';
import { Categories } from './Categories';
import { MemoryRouter } from 'react-router-dom';

const props = {
    fetchCategories: jest.fn(),
    addCategory: jest.fn(),
    testCategory: 'Test'
}

describe('Check Categories Page', () => {
    it('Check fetching categories if logged in', () => {
        // Not logged in
        mount(<MemoryRouter><Categories loggedIn={false} fetchCategories={props.fetchCategories} /></MemoryRouter>);
        expect(props.fetchCategories).toHaveBeenCalledTimes(0);

        // Logged in
        mount(<MemoryRouter><Categories loggedIn={true} fetchCategories={props.fetchCategories} /></MemoryRouter>);
        expect(props.fetchCategories).toHaveBeenCalledTimes(1);
    });
    it('Check conditional display', () => {
        // Not logged in
        let wrapper = mount(<MemoryRouter><Categories loggedIn={false} /></MemoryRouter>);
        expect(wrapper.find(Categories).html()).toBe('');

        // Logged in
        wrapper = mount(<MemoryRouter><Categories loggedIn={true} fetchCategories={props.fetchCategories} /></MemoryRouter>);
        expect(wrapper.find(Categories).html()).toContain('</div>');
    });
    it('Check add category', () => {
        const wrapper = mount(<MemoryRouter><Categories loggedIn={true} fetchCategories={props.fetchCategories} addCategory={props.addCategory} /></MemoryRouter>);
        const input = wrapper.find(Categories).find('input');
        input.instance().value = props.testCategory;
        input.props().onKeyUp({
            key: 'Enter',
            target: {
                value: props.testCategory
            }
        });
        input.simulate('keyUp');
        expect(input.instance().value).toBe(props.testCategory);
        expect(props.addCategory).toHaveBeenCalledTimes(1);
    });
})