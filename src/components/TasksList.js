import React from 'react';
import {connect} from 'react-redux';

import DraggableList from './DraggableList';
import {ListInput} from '../theme/components';
import {reorderTasks, updateTasks, deleteTask, addTask} from '../actions/tasks';

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
        const {tasks} = this.props;
        return (
            <React.Fragment>
                    <DraggableList
                        width="38"
                        type="inherit"
                        items={tasks}
                        reorder={this.props.reorderTasks}
                        update={this.props.updateTasks}
                        delete={this.props.deleteTask}
                    />
                    <ListInput type="text" placeholder="Add Task" onKeyUp={this.handleAddItem} width="60"/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({tasks}) => {
    return {
        tasks: tasks.data,
        category: tasks.selectedCategory
    }
}

export default connect(
    mapStateToProps,
    {reorderTasks, updateTasks, deleteTask, addTask}
)(TasksList);