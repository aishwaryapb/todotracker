import React from 'react';
import { connect } from 'react-redux';

import { selectCategory, fetchAllTasks } from '../actions/tasks';
import { Center, Tile, Connector } from '../theme/components';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';

const tickStyle = {
    height: '1.6rem',
    width: '1.6rem'
};

export class CategoryTiles extends React.Component {

    handleSelect = (category) => {
        this.props.selectCategory(category);
    }

    loadTasks() {
        const { categories, selected } = this.props;
        if (selected === undefined && categories?.length > 0) {
            this.props.fetchAllTasks();
            this.props.selectCategory(categories[0]);
        }
    }

    componentDidMount() {
        this.loadTasks();
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
                                    {category.completed ? <Tick style={tickStyle} /> : (index + 1)}
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