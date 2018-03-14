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
            <CardPanel className='card-nav'>
                <a href='/'>
                    <img src='./assets/img/CFA_ScriptLogo/Red/CFA_ScriptLogo_Red_RGB.png' />
                </a>
            </CardPanel>
        )
    }
};

export default NavbarComponent;