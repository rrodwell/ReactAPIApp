import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from 'react-materialize';

//Helpers
import helpers from '../../utils/helpers';

//Packages
import $ from 'jquery';

class KPSBumpForm extends Component {
    constructor() {
        super();
    }

    bumpKPS() {
        let employeeCredentials = {
            uri: 'https://chickfila.qtestnet.com/',
            email: $('#email').val().trim(),
            password: $('#password').val().trim(),
        };

        helpers.authenticateUser(employeeCredentials);
        $('#email').val('');
        $('#password').val('');
    }

    render() {
        return (
            <Card className='card-component center'>
                <h4>Bump KPS</h4>
                <div className='instructions'>
                    <p><em></em></p>
                </div>
                <div className='container form'>
                    <Row>
                        <Input s={6} type='text' label='Number of Bumps' id='bump-num' />
                        <Input s={6} type='text' label='Parameter 1' id='param1' />
                        <Input s={6} type='text' label='Parameter 2' id='param2' />
                        <Input s={6} type='text' label='Parameter 3' id='param3' />
                        <Button className='red darken-1 right' node='a'>Bump</Button>
                    </Row>
                </div>

            </Card>
        )
    }
};

export default KPSBumpForm;