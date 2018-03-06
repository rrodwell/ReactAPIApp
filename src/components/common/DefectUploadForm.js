import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";

//Packages
import $ from "jquery";
import Papa from "papaparse";

class DefectUploadForm extends Component {
    constructor() {
        super();
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
            <Card className="card-component">
                <h5>Upload File</h5>
                <Row>
                    <input type="file" id="filePath"/>
                </Row>
                <Button className="red darken-1" node="a" onClick={this.readDefectCSV}>Upload</Button>
            </Card>
        )
    }
};

export default DefectUploadForm;