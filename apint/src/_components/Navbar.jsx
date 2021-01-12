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
                    className="navbar-expand-sm navbar-toggleable-sm ng-dark border-bottom box-shadow mb-3 navbar-dark bg-light "
                    light>
                    <Container>
                        <NavbarBrand tag={Link} to="/Home" className="text-dark">Wypożyczalnia sprzętu narciarskiego
                            JANE AHONENE</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/start">Start</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Home">Home</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/cennik">Cennik</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/about">O nas</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/products">Rezerwuj</NavLink>
                                </NavItem>


                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/cart">Koszyk</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark"
                                             to="/Login">{this.props.loggedIn ? "Wyloguj" : "Zaloguj"}</NavLink>
                                </NavItem>

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

