import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginContainer, Input, Button, Right, Loader, Error, Center } from '../theme/components';
import { login } from '../actions/auth';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleInputChange = (event) => this.setState({ [event.target.name]: event.target.value })

    handleLogin = () => this.props.login(this.state)

    render() {
        const { loggingIn, loggedIn, location, error } = this.props;
        const returnTo = location.state?.returnTo ?? '/categories';
        return (
            <LoginContainer>
                {
                    loggingIn
                        ? <Loader top={20} />
                        : loggedIn
                            ? <Redirect to={returnTo} />
                            : (
                                <React.Fragment>
                                    <form onSubmit={this.handleLogin}>
                                        <Input type="text" name="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email} /><br />
                                        <Input type="password" name="password" onChange={this.handleInputChange} placeholder="Password" value={this.state.password} /><br />
                                        {error && <Center><Error>{error}</Error></Center>}
                                        <Right>
                                            <Button type="submit" vm={4} onClick={this.handleLogin}>Login</Button>
                                        </Right>
                                    </form>
                                </React.Fragment>
                            )

                }
            </LoginContainer>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { ...auth }
}

export default connect(
    mapStateToProps,
    { login }
)(Login);