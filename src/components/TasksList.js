import React from 'react';
import { connect } from 'react-redux';

import DraggableList from './DraggableList';
import { ListInput, TasksContainer, CategoryName } from '../theme/components';
import { reorderTasks, updateTasks, deleteTask, addTask, toggleTask } from '../actions/tasks';

export class TasksList extends React.Component {

    handleAddItem = (e) => {
        const { key, target: { value } } = e;
        if (key === "Enter" && value !== "") {
            this.props.addTask(value);
            e.target.value = "";
        }
        return;
    }

    render() {
        const { allTasks, toggleTask, reorderTasks, updateTasks, deleteTask, selectedCategory, loading } = this.props;
        const tasks = allTasks[selectedCategory?.id];
        return (
            <TasksContainer isCompleted={selectedCategory?.completed}>
                <CategoryName>{selectedCategory?.name}</CategoryName>
                <DraggableList
                    toggleItem={toggleTask}
                    width="38"
                    type="inherit"
                    items={tasks}
                    reorder={reorderTasks}
                    update={updateTasks}
                    delete={deleteTask}
                    loading={loading}
                />
                <ListInput type="text" placeholder="Add Task" onKeyUp={this.handleAddItem} width="60" />
            </TasksContainer>
        );
    }
}

const mapStateToProps = ({ tasks, common }) => {
    return {
        allTasks: tasks.data,
        selectedCategory: tasks.selectedCategory,
        loading: common.btnLoading
    }
}

export default connect(
    mapStateToProps,
    { reorderTasks, updateTasks, deleteTask, addTask, toggleTask }
)(TasksList);