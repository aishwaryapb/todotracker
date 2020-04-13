import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { createStore } from 'redux';
import { Tracker } from './Tracker';

const props = {
    fetchCategories: jest.fn(),
    clearTracker: jest.fn(),
    categories: ['Test']
}

describe('Check Tracker page', () => {
    it('Check fetching categories if logged in', () => {
        // Not logged in
        mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker loggedIn={false} fetchCategories={props.fetchCategories} />
                </MemoryRouter>
            </Provider>
        );
        expect(props.fetchCategories).toHaveBeenCalledTimes(0);

        //Logged in
        mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker loggedIn={true} fetchCategories={props.fetchCategories} categories={props.categories} />
                </MemoryRouter>
            </Provider>
        );;
        expect(props.fetchCategories).toHaveBeenCalledTimes(1);
    });

    it('Check conditional display based on user login', () => {
        // Not logged in
        let wrapper = mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker loggedIn={false} />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(Tracker).html()).toBe('');

        // Logged in
        wrapper = mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker loggedIn={true} fetchCategories={props.fetchCategories} categories={props.categories} />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(Tracker).html()).toContain('</div>');
    });

    it('Check conditional display based on number of categories', () => {
        // No categories
        let wrapper = mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker
                        loggedIn={true}
                        fetchCategories={props.fetchCategories}
                        categories={[]}
                    />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(Tracker).html()).toContain('img');

        // With atleast one category
        wrapper = mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker
                        loggedIn={true}
                        fetchCategories={props.fetchCategories}
                        categories={props.categories}
                    />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(Tracker).html()).not.toContain('img');
    });

    it('Check clearing on unmount', () => {
        const wrapper = mount(
            <Provider store={createStore(reducers)}>
                <MemoryRouter>
                    <Tracker
                        loggedIn={true}
                        fetchCategories={props.fetchCategories}
                        categories={props.categories}
                        clearTracker={props.clearTracker}
                    />
                </MemoryRouter>
            </Provider>
        );
        wrapper.unmount();
        expect(props.clearTracker).toHaveBeenCalledTimes(1);
    });
});