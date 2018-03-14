import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Input, Button } from 'react-materialize';

import { APILoginForm, DefectUploadForm, ProjectInfoForm } from '../subcomponents';

//Helpers
import helpers from '../../utils/helpers';

//Packages
import fetch from 'isomorphic-fetch';
import base64 from 'base-64';
import qs from 'qs';

class Defects extends Component {
    constructor() {
        super();
        this.state = {
            token: 'token1',
            uri: 'https://chickfila.qtestnet.com/',
            projectID: '',
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <div className='container-40'>
                <Row>
                    <Col s={12}>
                        <ProgressBar progress={33} className='red' />
                    </Col>
                </Row>
                <APILoginForm  {...this.state}/>
                <DefectUploadForm />
            </div>
        )
    }
};

export default Defects;