import React from 'react';
import { mount } from 'enzyme';
import { MenuItems } from './MenuItems';
import { MemoryRouter } from 'react-router-dom';

const props = {
    logout: jest.fn(),
    location: { pathname: '/categories' }
}

const mountComponent = () => mount(
    <MemoryRouter>
        <MenuItems location={props.location} logout={props.logout} />
    </MemoryRouter>
);

describe('Check navigation menu', () => {

    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check initial menu item selection', () => {
        wrapper = mountComponent();
        const link = wrapper.find(MenuItems).find(`a[href="${props.location.pathname}"]`);
        expect(getComputedStyle(link.getDOMNode()).getPropertyValue('font-weight')).toBe('bold');
    })

    it('Check navigation', () => {
        wrapper = mountComponent();
        const linkIndex = 1;
        const link = wrapper.find(MenuItems).find('a').at(linkIndex);

        link.simulate('click');
        expect(wrapper.find(MenuItems).state('selectedKey')).toBe(linkIndex);
    })

    it('Check logout', () => {
        wrapper = mountComponent();
        const button = wrapper.find(MenuItems).find('button');

        button.simulate('click');
        expect(props.logout).toHaveBeenCalledTimes(1);
    })
})