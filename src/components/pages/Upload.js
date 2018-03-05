import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";

//Packages
import $ from "jquery";
import Papa from "papaparse";

class UploadDefects extends Component {
    constructor() {
        super();
        this.state = {
            token: "",
            uri: ""
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    readDefectCSV() {
        const parseFile = $("#filePath")[0].files[0]
        const files = $('#filePath')[0].files;
    
        let options = {
            'header': true,
            complete: function(){
                var results = arguments[0].data;
                helpers.createDefects(results);
            },
            error: function(error,file){
                console.log("ERROR:",error, file)
            }
        };

        if (files.length > 0){
            Papa.parse(parseFile,options);
		} else {
			console.log("This file is empty.");
		}

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
                    <h5>Upload File</h5>
                    <Row>
                        <input type="file" id="filePath"/>
                    </Row>
                    <Button className="red darken-1" node="a" onClick={this.readDefectCSV}>Upload</Button>
                </Card>
            </div>
        )
    }
};

export default UploadDefects;