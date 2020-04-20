import React from 'react';
import { connect } from 'react-redux';

import DraggableList from './DraggableList';
import { ListInput, TasksContainer, CategoryName, Row, Col, Middle } from '../theme/components';
import { reorderTasks, updateTasks, deleteTask, addTask, toggleTask } from '../actions/tasks';
import { ReactComponent as Add } from "../assets/icons/add.svg";

export class TasksList extends React.Component {

    constructor(props) {
        super(props);
        this.newItemRef = React.createRef();
    }

    handleAddItem = (e) => {
        const { key, target: { value } } = e;
        if (key === "Enter" && value !== "") {
            this.props.addTask(value);
            e.target.value = "";
        }
        return;
    }

    handleAddBtnClick = () => {
        const { value } = this.newItemRef.current;
        if (value !== "") {
            this.props.addTask(value);
            this.newItemRef.current.value = "";
        }
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
                <Row justify="center">
                    <ListInput ref={this.newItemRef} type="text" placeholder="Add Task" onKeyUp={this.handleAddItem} width="54" />
                    <Col lg="6%" m="6%" sm="8vw" bg={"white"}>
                        <Middle><Add className='pointer add-btn' onClick={this.handleAddBtnClick} /></Middle>
                    </Col>
                </Row>

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