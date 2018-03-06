import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, CardPanel } from 'react-materialize';

class NavbarComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <CardPanel className="card-nav">
                <img href="/" src="./assets/img/CFA_ScriptLogo/Red/CFA_ScriptLogo_Red_RGB.png" />
            </CardPanel>
        )
    }
};

export default NavbarComponent;