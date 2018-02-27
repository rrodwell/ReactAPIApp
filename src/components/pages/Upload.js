import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Input, Button } from "react-materialize";

//Helpers
import helpers from "../../utils/helpers";

//Packages
import Papa from "papaparse";
import $ from "jquery";

class UploadDefects extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // console.log(sessionStorage.getItem("token"));
    }

    readDefectCSV() {
        let filePath = $('#filePath').val();
        console.log(filePath)


		var files = $('#filePath')[0].files;

		if (files.length > 0)
		{

			Papa.parse(filePath,{
				config: {
                    header: true,
                    complete: helpers.completeFn,
		            error: helpers.errorFn,
                },
				before: function(file, inputElem)
				{
					console.log("Parsing file:", file);
				},
				complete: function()
				{
					console.log("Done with all files.");
				}
			});
		}
		else
		{
			console.log("Upload a file that has stuff in it!");
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
                        <Input s={6} type="file" id="filePath"/>
                    </Row>
                    <Button className="red darken-1" node="a" onClick={this.readDefectCSV}>Upload</Button>
                </Card>
            </div>
        )
    }
};

export default UploadDefects;