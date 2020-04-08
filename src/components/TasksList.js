import React from 'react';
import {connect} from 'react-redux';

import DraggableList from './DraggableList';
import {ListInput, TasksContainer,CategoryName} from '../theme/components';
import {reorderTasks, updateTasks, deleteTask, addTask, toggleTask} from '../actions/tasks';

class TasksList extends React.Component {

    handleAddItem = (e) => {
        const { key, target: { value } } = e;
        if (key === "Enter" && value !== "") {
            this.props.addTask(value);
            e.target.value = "";
        }
        return;
    }

    render() {
        const {tasks, toggleTask, reorderTasks, updateTasks, deleteTask, categories, selectedCategory} = this.props;
        return categories.length !== 0 &&  (
            <TasksContainer>
                    <CategoryName>{selectedCategory?.name}</CategoryName>
                    <DraggableList
                        toggleItem={toggleTask}
                        width="38"
                        type="inherit"
                        items={tasks}
                        reorder={reorderTasks}
                        update={updateTasks}
                        delete={deleteTask}
                    />
                    <ListInput type="text" placeholder="Add Task" onKeyUp={this.handleAddItem} width="60"/>
            </TasksContainer>
        );
    }
}

const mapStateToProps = ({tasks, categories}) => {
    return {
        tasks: tasks.data,
        selectedCategory: tasks.selectedCategory,
        categories
    }   
}

export default connect(
    mapStateToProps,
    {reorderTasks, updateTasks, deleteTask, addTask, toggleTask}
)(TasksList);