import React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../NavBarCustom.css';
import {userActions} from "../_actions/user_actions";
import {connect} from "react-redux";


class NavBarCustom extends React.Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());

    }



    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {

        return (
            <header className="sticky-top">
                <Navbar
                    className="navbar-expand-sm navbar-toggleable-sm ng-dark border-bottom box-shadow mb-3 navbar-light bg-light "
                    light>
                    <Container>
                        <NavbarBrand tag={Link} to="/Home" >Wypożyczalnia JANE AHONENE</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link}  to="/start">Start</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/Home">Home</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link}  to="/cennik">Cennik</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/about">O nas</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link}  to="/products">Rezerwuj</NavLink>
                                </NavItem>


                                <NavItem>
                                    <NavLink tag={Link} to="/cart">Koszyk</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link}
                                             to="/Login">{this.props.loggedIn ? "Wyloguj" : "Zaloguj"}</NavLink>
                                </NavItem>
                                <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
function mapStateToProps(state) {
    const { loggingIn , loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}
export default connect(mapStateToProps)(NavBarCustom);

