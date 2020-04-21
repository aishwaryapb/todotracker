import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginContainer, Input, Button, Loader, LinkText } from '../theme/components';
import { login, signUp } from '../actions/auth';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
        isCreate: false
    }

    handleInputChange = (event) => this.setState({ [event.target.name]: event.target.value })

    handleLogin = () => this.props.login(this.state)

    handleSignUp = () => this.props.signUp(this.state);

    render() {
        const { loggingIn, loggedIn, location } = this.props;
        const returnTo = location?.state?.returnTo ?? '/categories';
        const { isCreate } = this.state;
        return (
            <LoginContainer>
                {
                    loggingIn
                        ? <Loader top={20} />
                        : loggedIn
                            ? <Redirect to={returnTo} />
                            : (
                                <React.Fragment>
                                    <form onSubmit={isCreate ? this.handleSignUp : this.handleLogin}>
                                        <Input type="text" name="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email} /><br />
                                        <Input type="password" name="password" onChange={this.handleInputChange} placeholder="Password" value={this.state.password} /><br />
                                        <Button type="submit" className="float-right" vm={4} onClick={isCreate ? this.handleSignUp : this.handleLogin}>{isCreate ? "Sign Up" : "Login"}</Button>
                                        <LinkText className="float-right link" onClick={() => this.setState({ isCreate: !isCreate })}>{isCreate ? "Login" : "Create Account"}</LinkText>
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
    { login, signUp }
)(Login);