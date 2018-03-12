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

        // helpers.authenticateUser(employeeCredentials);
        this.setState({
            projectID: 45705,
        })
    }

    render() {
        return (
            <Card className="card-component">
                <h5>qTest API Login</h5>
                <Row>
                    <Input s={8} type="email" label="Username" id="email" />
                    <Input s={8} type="password" label="Password" id="password" />
                </Row>
                <Button className="red darken-1" node="a" onClick={this.loginAPI}>Test</Button>
            </Card>
        )
    }
};

export default APILoginForm;