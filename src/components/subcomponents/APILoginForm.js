import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from 'react-materialize';

//Helpers
import helpers from '../../utils/helpers';

//Packages
import $ from 'jquery';
class APILoginForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     token: props.token,
        //     uri: props.uri
        // }
        // console.log('Props: ',props);
        this.loginAPI = this.loginAPI.bind(this);
    }

    componentDidMount(){
        // console.log(this.props.token);

    }

    componentDidUpdate() {
        console.log('Parent State:', this.props.projectID);
    }

    loginAPI() {
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
                <h4>qTest User Login</h4>
                <div className='instructions'>
                    <p><em>Please enter the email and password for the generic API user for your project. If you do not know these credentials, please contact <strong>Amy Hartman</strong> for assistance.</em></p>
                </div>
                <div className='container form'>
                    <Row>
                        <Input s={12} type='email' label='Username' id='email' />
                        <Input s={12} type='password' label='Password' id='password' />
                        <Button className='red darken-1 right' onClick={this.loginAPI} node='a'>Sign In</Button>
                    </Row>
                </div>

            </Card>
        )
    }
};

export default APILoginForm;