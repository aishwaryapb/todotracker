import React from 'react';
import { connect } from 'react-redux';

import { selectCategory, fetchAllTasks } from '../actions/tasks';
import { Center, Tile, Connector } from '../theme/components';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';

export class CategoryTiles extends React.Component {

    handleSelect = (category) => {
        this.props.selectCategory(category);
    }

    loadTasks(shouldFetch = true) {
        const { categories, selected } = this.props;
        if (selected === undefined && categories?.length > 0) {
            if (shouldFetch) this.props.fetchAllTasks();
            this.props.selectCategory(categories[0]);
        }
    }

    componentDidMount() {
        this.loadTasks(false);
    }

    componentDidUpdate() {
        this.loadTasks();
    }

    render() {
        const { categories, selected } = this.props;
        return (
            <Center>
                {
                    categories?.map((category, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Tile isCompleted={category.completed} isSelected={selected?.id === category.id || (selected === undefined && index === 0)} onClick={() => this.handleSelect(category)}>
                                    {category.completed ? <Tick className="tick" /> : (index + 1)}
                                </Tile>
                                {(index !== categories.length - 1) && <Connector />}
                            </React.Fragment>
                        )
                    })
                }
            </Center>
        )
    }
}

const mapStateToProps = ({ categories, tasks }) => {
    return {
        categories,
        selected: tasks.selectedCategory
    }
}

export default connect(
    mapStateToProps,
    { selectCategory, fetchAllTasks }
)(CategoryTiles);