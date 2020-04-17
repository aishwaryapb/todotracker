import React from 'react';
import { mount } from 'enzyme';
import { Categories } from './Categories';
import { MemoryRouter } from 'react-router-dom';

const props = {
    fetchCategories: jest.fn(),
    addCategory: jest.fn(),
    testCategory: 'Test',
    selectCategory: jest.fn(),
    fetchAllTasks: jest.fn()
}

const mountComponent = (loggedIn = true) => mount(
    <MemoryRouter>
        <Categories
            loggedIn={loggedIn}
            fetchCategories={props.fetchCategories}
            addCategory={props.addCategory}
            selectCategory={props.selectCategory}
            fetchAllTasks={props.fetchAllTasks}
        />
    </MemoryRouter>
)

describe('Check Categories Page', () => {

    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check fetching categories if logged in', () => {
        // Not logged in
        wrapper = mountComponent(false);
        expect(props.fetchCategories).toHaveBeenCalledTimes(0);
        wrapper.unmount();

        // Logged in
        wrapper = mountComponent();
        expect(props.fetchCategories).toHaveBeenCalledTimes(1);
    })

    it('Check conditional display', () => {
        // Not logged in
        wrapper = mountComponent(false);
        expect(wrapper.find(Categories).html()).toHaveLength(0);
        wrapper.unmount();

        // Logged in
        wrapper = mountComponent();
        expect(wrapper.find(Categories).html()).not.toHaveLength(0);
    })

    it('Check add category', () => {
        wrapper = mountComponent()
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
    })

    it('Check handle select of category', () => {
        wrapper = mountComponent();
        wrapper.find(Categories).instance().handleSelect();
        expect(props.selectCategory).toHaveBeenCalledTimes(1);
        expect(props.fetchAllTasks).toHaveBeenCalledTimes(1);
    })
})