import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from "react-materialize";

class TestCases extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    return (
        <div className="container-50">
          <Row>
            <Col s={12}>
              <ProgressBar progress={this.props.progress} className="red"/>
            </Col>
          </Row>
          <Card className="card-component">
              {this.props.children}
          </Card>
        </div>
    )
  }
};

export default TestCases;