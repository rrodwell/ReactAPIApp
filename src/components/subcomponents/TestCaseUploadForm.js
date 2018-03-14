import React, { Component } from 'react';
import { Row, Col, Card, Input, Button } from 'react-materialize';

//Helpers
import helpers from '../../utils/helpers';

//Packages
import $ from 'jquery';
import Papa from 'papaparse';

class TestCaseUploadForm extends Component {
    constructor() {
        super();
    }

    readCSV() {
        const parseFile = $('#file-upload')[0].files[0]
        const files = $('#file-upload')[0].files;

        let options = {
            'header': true,
            complete: function () {
                let results = arguments[0].data;
                // console.log('Results:', results);
                helpers.createTestCase(results);
                $('#file-path').val('')
            },
            error: function (error, file) {
                console.log('ERROR:', error, file)
            }
        };

        if (files.length > 0) {
            Papa.parse(parseFile, options);
        } else {
            console.log('This file is empty.');
        }

    }

    openFile() {
        console.log('upload');
        $('#file-upload').trigger('click');
    }

    render() {
        return (
            <Card className='card-component center'>
                <h4>Csv File Upload</h4>
                <div className='instructions'>
                    <p><em>Export Test Cases from Jira in the form of an <strong>Excel File </strong>. Convert this file to CSV before uploading it here. For more detailed steps, please visit www.help.cfahome.com/testcase</em></p>
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
                        <Button className='red darken-1 right' node='a' onClick={this.readCSV}>Upload</Button>
                    </Row>
                </div>
            </Card>
        )
    }
};

export default TestCaseUploadForm;