import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from 'react-materialize';

//Helpers
import helpers from '../../utils/helpers';

//Packages
import $ from 'jquery';
import Papa from 'papaparse';

class DefectUploadForm extends Component {
    constructor() {
        super();
    }

    readDefectCSV() {
        const parseFile = $('#file-upload')[0].files[0]
        const files = $('#file-upload')[0].files;
    
        let options = {
            'header': true,
            complete: function(){
                let results = arguments[0].data;
                console.log('Results:',results);
                helpers.createDefects(results);
            },
            error: function(error,file){
                console.log('ERROR:',error, file)
            }
        };

        if (files.length > 0){
            Papa.parse(parseFile,options);
		} else {
			console.log('This file is empty.');
		}

    }

    openFile () {
        console.log('upload');
        $('#file-upload').trigger('click');
    }

    render() {
        return (
            <Card className='card-component center'>
                <h4>Csv File Upload</h4>
                <div className='instructions'>
                    <p><em>Please enter the email and password for the generic API user for your project. If you do not know these credentials, please contact <strong>Amy Hartman</strong> for assistance.</em></p>
                </div>
                <div className='form'>
                    <Row>
                        <div className='file-field input-field'>
                            <Button className='red darken-1' node='a' onClick={this.openFile}>
                                <span>Select</span>
                                <input id='file-upload' type='file'
                                style={{
                                    display: 'none'
                                }} />
                            </Button>
                            <div className='file-path-wrapper'>
                                <input className='file-path' type='text' />
                            </div> 
                        </div>
                        <Button className='red darken-1 right' node='a' onClick={this.readDefectCSV}>Upload</Button>
                    </Row>
                    
                   
                </div>
            </Card>
        )
    }
};

export default DefectUploadForm;