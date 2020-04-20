import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    fetchCategories,
    reorderCategories,
    addCategory,
    updateCategories,
    deleteCategory
} from '../actions/categories';
import { selectCategory, fetchAllTasks } from '../actions/tasks';
import { Center, CategoriesContainer, ListInput, Row, Col, Middle } from '../theme/components';
import DraggableList from '../components/DraggableList';
import { ReactComponent as Add } from "../assets/icons/add.svg";
import history from '../history';

export class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.newItemRef = React.createRef();
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        if (loggedIn) this.props.fetchCategories();
    }

    handleSelect = (category) => {
        this.props.selectCategory(category);
        this.props.fetchAllTasks();
        history.push('/tracker');
    }

    handleAddBtnClick = () => {
        const { value } = this.newItemRef.current;
        const { categories } = this.props;
        if (value !== "") {
            this.props.addCategory(value, categories);
            this.newItemRef.current.value = "";
        }
    }

    handleAddItem = (e) => {
        const { key, target: { value } } = e;
        const { categories } = this.props;
        if (key === "Enter" && value !== "") {
            this.props.addCategory(value, categories);
            e.target.value = "";
        }
        return;
    }

    render() {
        const { loggedIn, categories } = this.props;
        return !loggedIn
            ? <Redirect to={{ pathname: '/', state: { returnTo: '/categories' } }} />
            : (
                <Center overflow={{ y: "auto", x: "hidden" }}>
                    <CategoriesContainer>
                        <DraggableList
                            type="inline"
                            items={categories}
                            reorder={this.props.reorderCategories}
                            update={this.props.updateCategories}
                            delete={this.props.deleteCategory}
                            select={this.handleSelect}
                        />
                        <Row>
                            <ListInput ref={this.newItemRef} type="text" placeholder="Add category" onKeyUp={this.handleAddItem} width="96" />
                            <Col lg="8%" m="10%" sm="10%" bg={"white"}>
                                <Middle><Add className='pointer add-btn' onClick={this.handleAddBtnClick} /></Middle>
                            </Col>
                        </Row>
                    </CategoriesContainer>
                </Center>
            )
    }
}

const mapStateToProps = ({ auth, categories }) => {
    return {
        loggedIn: auth.loggedIn,
        categories
    }
}

export default connect(
    mapStateToProps,
    {
        fetchCategories,
        reorderCategories,
        addCategory,
        updateCategories,
        deleteCategory,
        selectCategory,
        fetchAllTasks
    }
)(Categories);