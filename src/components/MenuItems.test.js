import React from 'react';
import { mount } from 'enzyme';
import { MenuItems } from './MenuItems';
import { MemoryRouter } from 'react-router-dom';

const props = {
    logout: jest.fn(),
    location: { pathname: '/categories' }
}

describe('Check navigation menu', () => {
    it('Check initial menu item selection', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MenuItems location={props.location} />
            </MemoryRouter>
        );
        const link = wrapper.find(MenuItems).find(`a[href="${props.location.pathname}"]`);
        expect(getComputedStyle(link.getDOMNode()).getPropertyValue('font-weight')).toBe('bold');
    });

    it('Check navigation', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MenuItems location={props.location} />
            </MemoryRouter>
        );
        const linkIndex = 1;
        const link = wrapper.find(MenuItems).find('a').at(linkIndex);

        link.simulate('click');
        expect(wrapper.find(MenuItems).state('selectedKey')).toBe(linkIndex);
    });

    it('Check logout', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MenuItems location={props.location} logout={props.logout} />
            </MemoryRouter>
        );
        const button = wrapper.find(MenuItems).find('button');

        button.simulate('click');
        expect(props.logout).toHaveBeenCalledTimes(1);
    });
});