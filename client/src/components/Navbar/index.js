import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import API from '../../utils/API';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        }

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    componentDidMount() {
        API.getUsr().then((res) => {
            const user = res.data.user;
            this.setState({ user: user });
        })

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleLogOut(event) {
        API.logOut().then((res) => {

            sessionStorage.clear();
            window.location.replace("/");
        });
    }
    render() {
        const isLoggedIn = this.state.user;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Regulate</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {isLoggedIn ? (
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.handleLogOut} href="/api/user/logout">logout</NavLink>
                                </NavItem>
                            </Nav>
                        ) : (
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/signup">signup</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/login">Log In</NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                    </Collapse>
                </Navbar>
            </div >
        );
    }
}