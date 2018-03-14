import React, { Component } from 'react';
import { CenterDiv, NavbarComponent, CardComponent, SquareButton } from '../subcomponents';
import { Row, Col, Breadcrumb, MenuItem } from 'react-materialize';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      buttons: [
        {
          uKey: 0,
          header: 'Test Cases',
          description: 'Import Test Cases',
          icon: 'file_upload',
          url: '/test-cases',
        },
        {
          uKey: 1,
          header: 'Defects',
          description: 'Import Defects',
          icon: 'bug_report',
          url: '/defects',
        },
        {
          uKey: 2,
          header: 'Other Call',
          description: 'Make another call',
          icon: 'import_export',
          url: '',
        },
        {
          uKey: 3,
          header: 'Other Call',
          description: 'Make another call',
          icon: 'import_export',
          url: '',
        },
      ]
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
        <div className='container-93'>
          <Row>

            <Col s={12} className=''>
              <Row>
                <Col>
                  <h2 style={{
                    fontFamily: 'Apercu',
                    fontSize: '2rem',
                    marginBottom: '0.5rem'
                  }}>CFA QTEST API</h2>
                  <h5 style={{
                    fontSize: '1.25rem'
                  }}>Importing tool for qTest</h5>
                </Col>
              </Row>
              <Row>
                {
                  this.state.buttons.map(button => <SquareButton key={button.uKey} icon={button.icon} cardHeader={button.header} cardDescription={button.description} url={button.url} />)
                }
              </Row>
            </Col>
          </Row>
        </div>
    )}
  };

export default Home;