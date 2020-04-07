import React from 'react';
import { connect } from 'react-redux';

import {fetchTasks, selectCategory} from '../actions/tasks';
import { Center, Tile, Connector } from '../theme/components';

class CategoryTiles extends React.Component {
    state = {
        selected: undefined
    }

    handleSelect = (category) => {
        this.setState({selected: category.id});
        this.props.fetchTasks(category.id);
    }

    componentDidUpdate() {
        const {categories} = this.props;
        if(this.state.selected === undefined && categories?.length > 0) {
            const selected = categories[0];
            this.props.selectCategory(selected);
            this.props.fetchTasks(selected.id);
            this.setState({selected: selected.id});
        }
    }

    render() {
        const { categories } = this.props;
        return (
            <Center>
                {
                    categories?.map((category, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Tile isSelected={this.state.selected === category.id} onClick={() => this.handleSelect(category)}>
                                    {index + 1}
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
        categories: categories.data
    }
}

export default connect(
    mapStateToProps,
    {fetchTasks, selectCategory}
)(CategoryTiles);