import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import { NavigationMenu } from './NavigationMenu';

const props = {
    loggedIn: true
};

const mountComponent = (loggedIn = props.loggedIn) => mount(
    <Provider store={createStore(reducers)}>
        <MemoryRouter>
            <NavigationMenu loggedIn={loggedIn} />
        </MemoryRouter>
    </Provider>
)

describe('Check Navigation Bar for Desktop and Mobile', () => {
    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check if menu items are displayed only when logged in', () => {
        // Not logged in
        wrapper = mountComponent(false);
        let component = wrapper.find(NavigationMenu);
        let menu = component.find('div div');
        expect(menu).toHaveLength(0);
        wrapper.unmount();

        // Logged in
        wrapper = mountComponent();
        component = wrapper.find(NavigationMenu);
        menu = component.find('div div');
        expect(menu).not.toHaveLength(0);

    })

    it('Check toggling of mobile menu icon', () => {
        wrapper = mountComponent();
        let component = wrapper.find(NavigationMenu);
        let hamburger = component.find('svg[children="hamburger.svg"]');
        expect(component.html()).not.toContain("close");
        expect(component.html()).toContain("hamburger");

        hamburger.props().onClick();
        expect(component.html()).not.toContain("hamburger");
        expect(component.html()).toContain("close");

    })

    it('Check if mobile menu is open only when logged in and state is open', () => {
        wrapper = mountComponent();
        const component = wrapper.find(NavigationMenu);
        let mobileMenu = component.find('div');
        expect(mobileMenu).toHaveLength(3);

        component.setState({ open: true });
        wrapper.update();
        let updatedComponent = wrapper.find(NavigationMenu);
        expect(updatedComponent.find('div')).toHaveLength(4);
    })
})