import React from 'react';
import { connect } from 'react-redux';
import { Center, Tile, Connector } from '../theme/components';

class CategoryTiles extends React.Component {
    state = {
        selected: 0
    }

    handleSelect = (category, selected) => {
        this.setState({selected});
        //@todo: fetch tasks per category
    }

    render() {
        const { categories } = this.props;
        return (
            <Center>
                {
                    categories?.map((category, index) => {
                        return (
                            <React.Fragment>
                                <Tile isSelected={this.state.selected === index} onClick={() => this.handleSelect(category, index)}>
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
    mapStateToProps
)(CategoryTiles);