import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";


class ProjectInfoForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     token: props.token,
        //     uri: props.uri
        // }
    }


    render() {
        return (
            <Card className="card-component center">
                <h4>Project Details</h4>
                <div className="instructions">
                    <p><em>Please enter the following information regarding your specific project.</em></p>
                </div>
                <div className="container form">
                    <Row>
                        <Input s={12} type="text" label="Project ID" id="projectID" />
                        <div>
                            <label>Select</label>
                            <Row>
                                <Input name='group1' type='checkbox' value='red' label='Red' />
                                <Input name='group1' type='checkbox' value='red' label='Red' />
                                <Input name='group1' type='checkbox' value='red' label='Red' />
                                <Input name='group1' type='checkbox' value='red' label='Red' />
                            </Row>
                        </div>
                        <Input s={12} type="password" label="Password" id="password" />
                        <Input s={12} type="password" label="Password" id="password" />
                        <Button className="red darken-1 right" node="a" >Next</Button>
                    </Row>
                </div>
            </Card>
        )
    }
};

export default ProjectInfoForm;