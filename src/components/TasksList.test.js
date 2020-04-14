import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { TasksList } from './TasksList';
import { theme } from '../theme';
import { hexToRGB } from '../utils';

const props = {
    allTasks: {
        "1": [
            {
                id: "10",
                name: "Task 1",
                order: 1,
                completed: true
            },
            {
                id: "11",
                name: "Task 2",
                order: 2,
                completed: false
            }
        ],
    },
    selectedCategory: {
        id: "1",
        name: "Category 1",
        order: 1,
        completed: false
    },
    addTask: jest.fn(),
    newTask: "New Task"
};

const mountComponent = (category) =>
    mount(
        (
            <ThemeProvider theme={theme}>
                <TasksList
                    allTasks={props.allTasks}
                    selectedCategory={category || props.selectedCategory}
                    addTask={props.addTask}
                />
            </ThemeProvider>
        ),
        { theme }
    )

describe('Check Tasks List Section', () => {
    it('Check if container turns green when category is completed', () => {
        const category = { ...props.selectedCategory, completed: true };
        const wrapper = mountComponent(category);
        const component = wrapper.find(TasksList);
        const container = component.find("div").at(0);
        expect(getComputedStyle(container.getDOMNode()).getPropertyValue('background-color')).toBe(hexToRGB(theme.green));
    });

    it('Check if the category name is displayed correctly', () => {
        const wrapper = mountComponent();
        const component = wrapper.find(TasksList);
        const categoryName = component.find('div div').at(0);
        expect(categoryName.text()).toBe(props.selectedCategory.name);
    });

    it('Check add task', () => {
        const wrapper = mountComponent();
        const input = wrapper.find(TasksList).find('input');
        input.instance().value = props.newTask;
        input.props().onKeyUp({
            key: 'Enter',
            target: {
                value: props.newTask
            }
        });
        input.simulate('keyUp');
        expect(input.instance().value).toBe(props.newTask);
        expect(props.addTask).toHaveBeenCalledTimes(1);
    });
})

