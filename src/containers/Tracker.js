import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Tracker extends React.Component {

    render() {
        const { loggedIn } = this.props;
        return loggedIn
            ? <div style={{ margin: '10vh 8vh', opacity: '10%', fontSize: '40px' }}>TRACKER</div>
            : <Redirect to={{ pathname: '/', state: { returnTo: '/tracker' } }} />;
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        loggedIn: auth.loggedIn
    }
}

export default connect(
    mapStateToProps
)(Tracker);