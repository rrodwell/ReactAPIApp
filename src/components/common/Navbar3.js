import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, SideNav, SideNavItem, Button, Dropdown } from 'react-materialize';

class NavbarComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Navbar brand={
                <img href="/" src="./assets/img/CFA_CSymbols/CircleCSymbol/Red/CFA_CSymbol_Circle_Red_RGB.png" />
            } />
        )
    }
};

export default NavbarComponent;