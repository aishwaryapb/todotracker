import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { MenuItem, Button } from '../theme/components';
import { logout } from '../actions/auth';

const items = ['Categories', 'Tracker']

class MenuItems extends React.Component {
    state = {
        selectedKey: -1
    }

    render() {
        const { location } = this.props;
        const { selectedKey } = this.state;
        // @todo add tasks percent complete
        return (
            <React.Fragment>
                {
                    items.map((item, index) => {
                        const pathname = `/${item.toLowerCase()}`;
                        return (
                            <MenuItem
                                key={index}
                                path={pathname}
                                selected={location.pathname === pathname || selectedKey === index}
                                onClick={() => this.setState({ selectedKey: index })}
                            >
                                {item}
                            </MenuItem>
                        )
                    })
                }
                <Button onClick={this.props.logout} hm={2}>Logout</Button>
            </React.Fragment>
        )
    }
}

export default connect(
    null,
    { logout }
)(withRouter(MenuItems));