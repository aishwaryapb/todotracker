import React from 'react';
import {connect} from 'react-redux';

import DraggableList from './DraggableList';
import {ListInput} from '../theme/components';
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
        const {tasks, toggleTask, reorderTasks, updateTasks, deleteTask} = this.props;
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({tasks}) => {
    return {
        tasks: tasks.data
    }
}

export default connect(
    mapStateToProps,
    {reorderTasks, updateTasks, deleteTask, addTask, toggleTask}
)(TasksList);