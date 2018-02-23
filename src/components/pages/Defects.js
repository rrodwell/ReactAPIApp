import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";

//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';

class Defects extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    loginAPI () {
        var employeeCredentials = {
            uri: "https://chickfila.qtestnet.com/",
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim()
        };

        helpers.authenticateUser(employeeCredentials);

    }

    render() {
        return (
            <div className="container-50">
                <Row>
                    <Col s={12}>
                        <ProgressBar progress={50} className="red" />
                    </Col>
                </Row>
                <Card className="card-component">
                    <h5>Upload Defects</h5>
                    <Row>
                        <Input s={8} type="email" label="Username" id="email" />
                        <Input s={8} type="password" label="Password" id="password" />
                    </Row>
                    <Button className="red darken-1" node="a" onClick={this.loginAPI}>Test</Button>
                </Card>
            </div>
        )
    }
};

export default Defects;