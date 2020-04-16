import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { Modal } from './Modal';
import { theme } from '../theme';
import { hexToRGB } from '../utils';

const props = {
    heading: "Heading",
    body: "Body",
    onClose: jest.fn()
}

const mountComponent = (visible, error) => mount(
    <ThemeProvider theme={theme}>
        <Modal
            heading={props.heading}
            body={props.body}
            error={error}
            visible={visible}
            onClose={props.onClose}
        />
    </ThemeProvider>
);

describe('Check Modal', () => {
    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check modal visibility', () => {
        // When visible is false
        wrapper = mountComponent(false, false);
        let component = wrapper.find(Modal);
        expect(component.html()).toBe(null);
        wrapper.unmount();

        // When visible is true
        wrapper = mountComponent(true, false);
        component = wrapper.find(Modal);
        expect(component.html()).not.toBe(null);
    })

    it('Check modal contents', () => {
        wrapper = mountComponent(true, false);
        const component = wrapper.find(Modal);
        const heading = component.find('h2');
        const body = component.find('p');

        expect(heading.text()).toBe(props.heading);
        expect(body.text()).toBe(props.body);
    })

    it('Check modal style based on type', () => {
        // When error is false
        wrapper = mountComponent(true, false);
        let component = wrapper.find(Modal);
        let headerContainer = component.find('div div div').at(0);
        expect(getComputedStyle(headerContainer.getDOMNode()).getPropertyValue('background-color')).toBe(hexToRGB(theme.green));
        wrapper.unmount();

        //When error is true
        wrapper = mountComponent(true, true);
        component = wrapper.find(Modal);
        headerContainer = component.find('div div div').at(0);
        expect(getComputedStyle(headerContainer.getDOMNode()).getPropertyValue('background-color')).toBe(hexToRGB(theme.red));
    })

    it('Check modal close', () => {
        wrapper = mountComponent(true, false);
        const component = wrapper.find(Modal);
        const close = component.find('span');
        close.simulate('click');
        expect(props.onClose).toHaveBeenCalledTimes(1);
    })
})