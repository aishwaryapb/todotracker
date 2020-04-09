import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import { theme } from './theme';
import { Container, NavBar, Logo, Menu } from './theme/components';
import logo from './assets/images/logo.PNG';
import history from './history';
import MenuItems from './components/MenuItems';
import Login from './containers/Login';
import Categories from './containers/Categories';
import Tracker from './containers/Tracker';
import HorizontalLoader from './components/HorizontalLoader';
import Modal from './components/Modal';
import { setError } from './actions';
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
        const { loggedIn, loading, error } = this.props;
        // @todo Change logo
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Modal
                        heading={CONFIG.messages.errorTitle}
                        body={error}
                        error
                        visible={error !== undefined}
                        onClose={this.props.setError}
                    />
                    <Container>
                        <Router history={history}>
                            <NavBar>
                                <Logo src={logo} />
                                {loggedIn && <Menu><MenuItems /></Menu>}
                            </NavBar>
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
        loading: common.loading,
        error: common.error
    }
}

export default connect(
    mapStateToProps,
    { setError }
)(App);