import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Input, Button } from 'react-materialize';

import { KPSBumpForm } from '../subcomponents';

//Helpers
import helpers from '../../utils/helpers';

class KPS extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='container-40'>
                <Row>
                    <Col s={12}>
                        <ProgressBar progress={33} className='red' />
                    </Col>
                </Row>
                <KPSBumpForm/>
            </div>
        )
    }
};

export default KPS;