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
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">
                        <img href="/" src="./assets/img/CFA_CSymbols/CircleCSymbol/Red/CFA_CSymbol_Circle_Red_RGB.png" />
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
};

export default NavbarComponent;