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
    state = {
        selected: undefined
    }

    handleSelect = (category) => {
        this.setState({ selected: category.id });
        this.props.selectCategory(category);
    }

    loadTasks() {
        const { categories } = this.props;
        const { selected } = this.state;
        if (selected === undefined && categories?.length > 0) {
            this.props.fetchAllTasks();
            this.props.selectCategory(categories[0]);
            this.setState({ selected: categories[0].id });
        }
    }

    componentDidMount() {
        this.loadTasks();
    }

    componentDidUpdate() {
        this.loadTasks();
    }

    render() {
        const { categories } = this.props;
        const { selected } = this.state;
        return (
            <Center>
                {
                    categories?.map((category, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Tile isCompleted={category.completed} isSelected={selected === category.id || (selected === undefined && index === 0)} onClick={() => this.handleSelect(category)}>
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

const mapStateToProps = ({ categories }) => {
    return {
        categories
    }
}

export default connect(
    mapStateToProps,
    { selectCategory, fetchAllTasks }
)(CategoryTiles);