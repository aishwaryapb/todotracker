import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { hexToRGB } from '../utils';
import { DraggableList } from './DraggableList';

const props = {
    items: [
        {
            id: '1',
            name: 'List item 1',
            order: 1,
            completed: true,
            categoryId: '1'
        },
        {
            id: '2',
            name: 'List item 2',
            order: 2,
            completed: false,
            categoryId: '1'
        },
    ],
    reorder: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    toggleItem: jest.fn(),
    select: jest.fn()
}

const mountComponent = (isTasksList = false, items = props.items) => mount(
    <ThemeProvider theme={theme}>
        <DraggableList
            items={items}
            type="inherit"
            reorder={props.reorder}
            update={props.update}
            delete={props.delete}
            toggleItem={isTasksList ? props.toggleItem : undefined}
            select={isTasksList ? undefined : props.select}
        />
    </ThemeProvider>
)

describe('Check Draggable List', () => {
    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check if displayed only if items are there', () => {
        wrapper = mountComponent(false, []);
        let component = wrapper.find(DraggableList);
        expect(component.html()).toBe(null);
        wrapper.unmount();

        wrapper = mountComponent();
        component = wrapper.find(DraggableList);
        expect(component.html()).not.toBe(null);

    })

    it('Check if all the items are displayed', () => {
        wrapper = mountComponent();
        const component = wrapper.find(DraggableList);
        const listItems = component.find('li');
        expect(listItems).toHaveLength(props.items.length);
    })

    it('Check drag operations', () => {
        wrapper = mountComponent();
        const component = wrapper.find(DraggableList);
        const listItem = component.find('li').at(0);
        const otherListItem = component.find('li').at(1).find('div').at(0);

        otherListItem.props().onDragStart({
            dataTransfer: {
                effectAllowed: "move",
                setData: jest.fn(),
                setDragImage: jest.fn()
            },
            target: { parentNode: <div /> }
        })

        listItem.props().onDragOver();
        expect(props.update).toHaveBeenCalledTimes(1);

        otherListItem.props().onDragEnd();
        expect(props.reorder).toHaveBeenCalledTimes(1);
    })

    it('Check delete list item', () => {
        wrapper = mountComponent();
        const component = wrapper.find(DraggableList);
        const deleteIcon = component.find('svg.delete').at(0);
        deleteIcon.simulate('click');
        expect(props.delete).toHaveBeenCalledTimes(1);
    })

    it('Check item name', () => {
        wrapper = mountComponent();
        const component = wrapper.find(DraggableList);
        const listItem = component.find('li').at(0);
        const itemName = listItem.find('div').at(1);
        expect(itemName.text()).toBe(props.items[0].name);
    })

    it('Check toggling of item', () => {
        wrapper = mountComponent(true);
        const component = wrapper.find(DraggableList);
        const listItem = component.find('li').at(0);
        listItem.props().onClick();
        expect(props.toggleItem).toHaveBeenCalledTimes(1);
    })

    it('Check completed item style', () => {
        wrapper = mountComponent(true);
        const component = wrapper.find(DraggableList);
        const listItem = component.find('li').at(0);
        const hamburgerIcon = listItem.find('svg.hamburger');
        const deleteIcon = listItem.find('svg.delete');

        expect(getComputedStyle(listItem.getDOMNode()).getPropertyValue('background-color')).toBe(hexToRGB(theme.green));
        expect(hamburgerIcon).toHaveLength(0);
        expect(deleteIcon).toHaveLength(0);
    })

    it('Check item selection', () => {
        wrapper = mountComponent();
        const component = wrapper.find(DraggableList);
        const listItem = component.find('li').at(0);
        listItem.props().onClick();
        expect(props.select).toHaveBeenCalledTimes(1);
    })
})