import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Center, TrackerContainer, CategoriesTracker } from '../theme/components';
import CategoryTiles from '../components/CategoryTiles';
import TasksList from '../components/TasksList';
import { fetchCategories } from '../actions/categories';
import { clearTracker } from '../actions';

class Tracker extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    componentWillUnmount() {
        this.props.clearTracker();
    }

    render() {
        const { loggedIn } = this.props;
        // @todo Create an empty component to display where are no categories
        return !loggedIn
            ? <Redirect to={{ pathname: '/', state: { returnTo: '/tracker' } }} />
            : (
                <Center overflow={{ x: "hidden", y: "hidden" }}>
                    <TrackerContainer>
                        {/* Fix the scroll issue when CaregoriesTracker overflows */}
                        <CategoriesTracker>
                            <CategoryTiles />
                        </CategoriesTracker>
                        <TasksList />
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
    { fetchCategories, clearTracker }
)(Tracker);