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
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // console.log(sessionStorage.getItem("token"));
    }

    readDefectCSV() {
        const parseFile = $("#filePath")[0].files[0]
        const files = $('#filePath')[0].files;
        // console.log($('#filePath')[0].files);
        // console.log(parseFile);
        // helpers.parseFile(files);

        let options = {
            'header': true,
            complete: function(){
                var rows = arguments[0].data.length;
                console.log("Results: ", arguments[0].data);
                console.log("Rows:", rows);
            },
            error: function(error,file){
                console.log("ERROR:",error, file)
            }
        };

        if (files.length > 0)
		{

            Papa.parse(parseFile,options);
		}
		else
		{
			console.log("Upload a file that has stuff in it!");
		}

    }

    createDefects(defectsArr){
        allDefects =[];

        for(var i =1; i > defectsArr.length-1; i++){

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