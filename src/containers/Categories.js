import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, reorderCategories } from '../actions/categories';
import { Center, CategoriesContainer } from '../theme/components';
import DraggableList from '../components/DraggableList';

class Categories extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { loggedIn, categories } = this.props;
        return !loggedIn
            ? <Redirect to={{ pathname: '/', state: { returnTo: '/categories' } }} />
            : (
                <Center>
                    <CategoriesContainer>
                        <DraggableList items={categories} reorder={this.props.reorderCategories} />
                    </CategoriesContainer>
                </Center>
            )
    }
}

const mapStateToProps = ({ auth, categories }) => {
    return {
        loggedIn: auth.loggedIn,
        categories: categories.data
    }
}

export default connect(
    mapStateToProps,
    { fetchCategories, reorderCategories }
)(Categories);