import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Center, TrackerContainer, CategoriesTracker } from '../theme/components';
import CategoryTiles from '../components/CategoryTiles';
import TasksList from '../components/TasksList';
import { fetchCategories } from '../actions/categories';
import { clearTracker } from '../actions';
import NoTasks from '../assets/images/no_data.png';

const imgStyle = {
    margin: "5vh auto",
    height: "60vh",
    width: "auto"
}

class Tracker extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
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
                                : <img src={NoTasks} alt="No Data" style={imgStyle} />
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