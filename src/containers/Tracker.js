import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Center, TrackerContainer, CategoriesTracker, NoCategories } from '../theme/components';
import CategoryTiles from '../components/CategoryTiles';
import TasksList from '../components/TasksList';
import { fetchCategories } from '../actions/categories';
import { clearTracker } from '../actions';
import NoTasks from '../assets/images/no_data.png';

export class Tracker extends React.Component {

    componentDidMount() {
        const { loggedIn } = this.props;
        if (loggedIn) this.props.fetchCategories();
    }

    componentWillUnmount() {
        this.props.clearTracker();
    }

    render() {
        const { loggedIn, categories } = this.props;
        return !loggedIn
            ? <Redirect to={{ pathname: '/', state: { returnTo: '/tracker' } }} />
            : (
                <Center overflow={{ x: "hidden", y: "hidden" }}>
                    <TrackerContainer>
                        {
                            categories.length !== 0
                                ? (
                                    <React.Fragment>
                                        <CategoriesTracker>
                                            <CategoryTiles />
                                        </CategoriesTracker>
                                        <TasksList />
                                    </React.Fragment>
                                )
                                : <NoCategories src={NoTasks} alt="No Data" />
                        }
                    </TrackerContainer>
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
    { fetchCategories, clearTracker }
)(Tracker);