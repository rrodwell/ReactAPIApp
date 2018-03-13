import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";


class APILoginForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     token: props.token,
        //     uri: props.uri
        // }
        console.log("Props: ",props);
        this.loginAPI = this.loginAPI.bind(this);
    }

    componentDidMount(){
        console.log(this.props.token);
    
    }
    
    componentDidUpdate() {
        console.log("Parent State:", this.props.projectID);
    }

    loginAPI() {
        var employeeCredentials = {
            uri: "https://chickfila.qtestnet.com/",
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim()
        };

        helpers.authenticateUser(employeeCredentials);

    }

    render() {
        return (
            <Card className="card-component center">
                <h4>API Login - qTest User</h4>
                <div className="login-instructions">
                    <p><em>Please enter the email and password for the generic API user for your project. If you do not know these credentials, please contact <strong>Amy Hartman</strong> for assistance.</em></p>
                </div>
                <Row>
                    <Input s={12} type="email" label="Username" id="email" />
                    <Input s={12} type="password" label="Password" id="password" />
                    <Button className="red darken-1 right" node="a" onClick={this.loginAPI}>Test</Button>
                </Row>
                
            </Card>
        )
    }
};

export default APILoginForm;