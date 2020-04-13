import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import { theme } from './theme';
import { Container, NavBar, Logo, Menu, Center } from './theme/components';
import logo from './assets/images/logo.PNG';
import history from './history';
import MenuItems from './components/MenuItems';
import Login from './containers/Login';
import Categories from './containers/Categories';
import Tracker from './containers/Tracker';
import HorizontalLoader from './components/HorizontalLoader';
import Modal from './components/Modal';
import { setError, setSuccess } from './actions';
import CONFIG from './config';

const systemMessage = {
    margin: '250px 5% 0 5%',
    color: theme.red
}


class App extends Component {

    state = {
        supported: window.screen.width >= CONFIG.screenWidth.laptop
    }

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
                    {
                        this.state.supported &&
                        <Modal
                            heading={error !== undefined ? CONFIG.messages.errorTitle : (success !== undefined ? CONFIG.messages.successTitle : '')}
                            body={error !== undefined ? error : (success !== undefined ? success : '')}
                            error={error !== undefined}
                            visible={error !== undefined || success !== undefined}
                            onClose={error !== undefined ? this.props.setError : (success !== undefined ? this.props.setSuccess : () => { })}
                        />
                    }
                    <Container>
                        {
                            this.state.supported
                                ? (
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
                                )
                                : <Center><h1 style={systemMessage}>Device unsupported. Please use a laptop/desktop</h1></Center>
                        }
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