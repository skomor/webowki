import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBarCustom from "./Navbar";

export class Layout extends Component {
   // static displayName = Layout.name;

    render () {
        return (
            <div>
                <NavBarCustom />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
