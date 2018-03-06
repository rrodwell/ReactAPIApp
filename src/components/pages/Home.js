import React, { Component } from 'react';
import { CenterDiv, NavbarComponent, CardComponent, SquareButton } from '../subcomponents';
import { Row, Col, Breadcrumb, MenuItem } from "react-materialize";

class Home extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
        <div className="container-93">
          <Row>

            <Col s={12} className="">
              <Row>
                <Col>
                  <h2 style={{
                    fontFamily: "Apercu",
                    fontSize: "2rem",
                    marginBottom: "0.5rem"
                  }}>CFA QTEST API</h2>
                  <h5 style={{
                    fontSize: "1.25rem"
                  }}>Importing tool for qTest</h5>
                </Col>
              </Row>
              <Row>
                <Col s={3}>
                  <SquareButton icon={"file_upload"} cardHeader={"TEST CASES"} cardDescription={"Import Test Cases"} url={"/test-cases"}/>
                </Col>
                <Col s={3}>
                  <SquareButton icon={"bug_report"} cardHeader={"DEFECTS"} cardDescription={"Import Defects"} url={"/defects"} />
                </Col>
                <Col s={3}>
                  <SquareButton icon={"import_export"} cardHeader={"OTHER CALL"} cardDescription={"Make another call"} />
                </Col>
                <Col s={3}>
                  <SquareButton icon={"import_export"} cardHeader={"OTHER CALL"} cardDescription={"Make another call"} />
                </Col>

              </Row>
            </Col>
          </Row>
        </div>
    )}
  };

export default Home;