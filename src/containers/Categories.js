import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Categories extends React.Component {

    render() {
        const { loggedIn } = this.props;
        return loggedIn
            ? <div style={{ margin: '10vh 8vh', opacity: '10%', fontSize: '40px' }}>CATEGORIES</div>
            : <Redirect to={{ pathname: '/', state: { returnTo: '/categories' } }} />;
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        loggedIn: auth.loggedIn
    }
}

export default connect(
    mapStateToProps
)(Categories);