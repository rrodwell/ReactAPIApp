import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-materialize';
import { APILoginForm, TestCaseUploadForm } from '../subcomponents';
class TestCases extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    return (
        <div className='container-40'>
          <Row>
            <Col s={12}>
              <ProgressBar progress={33} className='red'/>
            </Col>
          </Row>
          <APILoginForm/>
          <TestCaseUploadForm/>
        </div>
    )
  }
};

export default TestCases;