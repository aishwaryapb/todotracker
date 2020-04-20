import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import { theme } from './theme';
import { Container } from './theme/components';
import history from './history';
import Login from './containers/Login';
import Categories from './containers/Categories';
import Tracker from './containers/Tracker';
import HorizontalLoader from './components/HorizontalLoader';
import Modal from './components/Modal';
import NavigationMenu from './components/NavigationMenu';
import { setError, setSuccess } from './actions';
import CONFIG from './config';

class App extends Component {

    handleOfflineConnection = () => {
        this.props.setError(CONFIG.messages.connectivityLost);
    }

    componentDidMount() {
        window.addEventListener('offline', this.handleOfflineConnection);
    }

    componentWillUnmount() {
        window.removeEventListener('offline', this.handleOfflineConnection)
    }

    render() {
        const { loggedIn, loading, error, success } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Modal
                        heading={error !== undefined ? CONFIG.messages.errorTitle : (success !== undefined ? CONFIG.messages.successTitle : '')}
                        body={error !== undefined ? error : (success !== undefined ? success : '')}
                        error={error !== undefined}
                        visible={error !== undefined || success !== undefined}
                        onClose={error !== undefined ? this.props.setError : (success !== undefined ? this.props.setSuccess : () => { })}
                    />
                    <Container>
                        <Router history={history}>
                            <NavigationMenu loggedIn={loggedIn} />
                            {loading && <HorizontalLoader />}
                            <Switch>
                                <Route path="/" exact component={Login} />
                                <Route path="/categories" exact component={Categories} />
                                <Route path="/tracker" exact component={Tracker} />
                            </Switch>
                        </Router>
                    </Container>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = ({ auth, common }) => {
    return {
        loggedIn: auth.loggedIn,
        ...common
    }
}

export default connect(
    mapStateToProps,
    { setError, setSuccess }
)(App);