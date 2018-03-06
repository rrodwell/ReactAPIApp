import React from 'react';
import { Card, Col, Row } from "react-materialize";

const styles = {
  icon: {
    color: '#DD0031',
    marginTop: "11px",
    fontSize: "50px"
  }
}

const CardComponent = props => (
    <Card className="card-component">
      <Row>
        <Col className="icon-col" s={3}>
        <i style={styles.icon} className="material-icons">{props.icon}</i>
        </Col>
        <Col s={9}>
          <h5>{props.cardHeader}</h5>
          <p>{props.cardDescription}</p>
        </Col>
      </Row>
    </Card>
);

export default CardComponent;