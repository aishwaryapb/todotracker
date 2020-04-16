import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { CategoryTiles } from './CategoryTiles';
import { hexToRGB } from '../utils';
import { theme } from '../theme';

const props = {
    categories: [
        {
            id: "1",
            name: 'Test 1',
            order: 1,
            completed: true
        },
        {
            id: "2",
            name: 'Test 2',
            order: 2,
            completed: false
        }
    ],
    selectCategory: jest.fn(),
    fetchAllTasks: jest.fn()
};

const mountComponent = () => mount(
    <ThemeProvider theme={theme}>
        <CategoryTiles
            categories={props.categories}
            selectCategory={props.selectCategory}
            fetchAllTasks={props.fetchAllTasks}
        />
    </ThemeProvider>,
    { theme }
);

describe('Check Category Tiles Section', () => {

    let wrapper;

    afterEach(() => wrapper?.exists() && wrapper.unmount())

    it('Check if tasks are loaded on mount/update only when no category is selected', () => {
        wrapper = mountComponent();

        // Mount
        expect(props.selectCategory).toHaveBeenCalledTimes(1);
        expect(props.fetchAllTasks).toHaveBeenCalledTimes(1);

        // state.selected is undefined
        wrapper.find(CategoryTiles).setState({ selected: undefined });
        expect(props.selectCategory).toHaveBeenCalledTimes(2);
        expect(props.fetchAllTasks).toHaveBeenCalledTimes(2);

        // state.selected is defined
        wrapper.find(CategoryTiles).setState({ selected: '1' });
        expect(props.selectCategory).toHaveBeenCalledTimes(2);
        expect(props.fetchAllTasks).toHaveBeenCalledTimes(2);
    })

    it('Check if category is selected on click of the tile', () => {
        wrapper = mountComponent();
        const component = wrapper.find(CategoryTiles);
        const tile = component.find('div div').at(2);

        // Tile unclicked
        expect(getComputedStyle(tile.getDOMNode()).getPropertyValue('margin')).toBe('auto');

        tile.props().onClick(props.categories[1]);

        // Tile clicked
        expect(component.state('selected')).toBe(props.categories[1].id);
        expect(props.selectCategory).toHaveBeenCalledTimes(4);
        expect(getComputedStyle(tile.getDOMNode()).getPropertyValue('margin')).toBe('0px');
    })

    it('Check if correct number of connectors are displayed', () => {
        wrapper = mountComponent();
        const component = wrapper.find(CategoryTiles);
        let connectors = [];
        component.find('div div').forEach((node, index) => {
            if (index % 2 !== 0) connectors.push(node);
        })
        expect(connectors).toHaveLength(1);
    })

    it('Check if tick is displayed on category completion', () => {
        wrapper = mountComponent();
        const component = wrapper.find(CategoryTiles);
        const tile = component.find('div div').at(0);
        expect(tile.html()).toContain('svg');
        expect(getComputedStyle(tile.getDOMNode()).getPropertyValue('background-color')).toBe(hexToRGB(theme.green));
    })
})

