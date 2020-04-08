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

class App extends Component {

    render() {
        const { loggedIn, loading } = this.props;
        // TODO Change logo
        return (
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        )
    }
}

const mapStateToProps = ({ auth, common }) => {
    return {
        loggedIn: auth.loggedIn,
        loading: common.loading
    }
}

export default connect(
    mapStateToProps
)(App);