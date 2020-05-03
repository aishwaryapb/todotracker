import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { createStore } from 'redux';
import { Tracker } from './Tracker';

const props = {
    fetchCategories: () => new Promise((res) => res()),
    clearTracker: jest.fn(),
    categories: ['Test'],
    testClearTracker: jest.fn(),
}

const mountComponent = (loggedIn = true, categories = props.categories, clearTracker) => mount(
    <Provider store={createStore(reducers)}>
        <MemoryRouter>
            <Tracker
                loggedIn={loggedIn}
                fetchCategories={props.fetchCategories}
                categories={categories}
                clearTracker={clearTracker || props.clearTracker}
            />
        </MemoryRouter>
    </Provider>
)

describe('Check Tracker page', () => {

    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check conditional display based on user login', () => {
        // Not logged in
        wrapper = mountComponent(false);
        expect(wrapper.find(Tracker).html()).toHaveLength(0);

        // Logged in
        wrapper = mountComponent(true);
        expect(wrapper.find(Tracker).html()).not.toHaveLength(0);
    })

    it('Check conditional display based on number of categories', () => {
        // No categories
        let wrapper = mountComponent(true, []);
        expect(wrapper.find(Tracker).html()).toContain('img');
        wrapper.unmount();

        // With atleast one category
        wrapper = mountComponent();
        expect(wrapper.find(Tracker).html()).not.toContain('img');
    })

    it('Check clearing on unmount', () => {
        wrapper = mountComponent(true, props.categories, props.testClearTracker);
        wrapper.unmount();
        expect(props.testClearTracker).toHaveBeenCalledTimes(1);
    })
})