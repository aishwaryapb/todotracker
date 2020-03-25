import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Center, TrackerContainer, CategoriesTracker, TasksContainer } from '../theme/components';
import CategoryTiles from '../components/CategoryTiles';
import TasksList from '../components/TasksList';
import { fetchCategories } from '../actions/categories';

class Tracker extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { loggedIn } = this.props;
        return !loggedIn
            ? <Redirect to={{ pathname: '/', state: { returnTo: '/tracker' } }} />
            : (
                <Center overflow={{ x: "hidden", y: "hidden" }}>
                    <TrackerContainer>
                        <CategoriesTracker>
                            <CategoryTiles />
                        </CategoriesTracker>
                        <TasksContainer>
                            <TasksList />
                        </TasksContainer>
                    </TrackerContainer>
                </Center>
            )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        loggedIn: auth.loggedIn
    }
}

export default connect(
    mapStateToProps,
    { fetchCategories }
)(Tracker);