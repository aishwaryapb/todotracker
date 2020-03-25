import React from 'react';
import { connect } from 'react-redux';
import { Center, Tile, Connector } from '../theme/components';

class CategoryTiles extends React.Component {
    render() {
        const { categories } = this.props;
        return (
            <Center>
                {
                    categories?.map((category, index) => {
                        return (
                            <React.Fragment>
                                <Tile>
                                    {index + 1}
                                </Tile>
                                <Connector />
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