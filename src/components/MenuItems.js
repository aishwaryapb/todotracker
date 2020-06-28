import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { MenuItem, Button } from '../theme/components';
import { logout } from '../actions/auth';

const items = ['Categories', 'Tracker']

export class MenuItems extends React.Component {

    render() {
        const { location } = this.props;
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
                                selected={location.pathname === pathname}
                            >
                                {item}
                            </MenuItem>
                        )
                    })
                }
                <Button onClick={this.props.logout} hm={2} mBorderless={true}>Logout</Button>
            </React.Fragment>
        )
    }
}

export default connect(
    null,
    { logout }
)(withRouter(MenuItems));