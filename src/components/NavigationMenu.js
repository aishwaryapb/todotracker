import React from 'react';
import { NavBar, Logo, Menu, MobileMenu, MobileMenuIcon } from '../theme/components';
import logo from '../assets/images/logo.PNG';
import MenuItems from './MenuItems';
import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";

export class NavigationMenu extends React.Component {
    state = {
        open: false
    }

    static getDerivedStateFromProps(props, state) {
        return props.loggedIn
            ? { ...state }
            : { open: false }

    }

    render() {
        const { loggedIn } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <NavBar>
                    <Logo src={logo} />
                    {loggedIn && <Menu><MenuItems /></Menu>}
                    {
                        loggedIn &&
                        <MobileMenuIcon>
                            {
                                !open
                                    ? <Hamburger onClick={() => this.setState({ open: true })} />
                                    : <Close onClick={() => this.setState({ open: false })} />
                            }
                        </MobileMenuIcon>
                    }
                </NavBar>
                {
                    loggedIn && open &&
                    <MobileMenu>
                        <MenuItems />
                    </MobileMenu>
                }
            </React.Fragment>
        )
    }
}

export default NavigationMenu;