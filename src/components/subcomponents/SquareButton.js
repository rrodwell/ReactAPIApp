import React from 'react';
import { Button, Col, Row } from 'react-materialize';


const styles = {
  button: {
    margin: '.5rem 0 1rem 0',
    backgroundColor: "white",
    color: "#5d666f",
    padding: "15px",
    textTransform: "none",
    textAlign: "left",
    lineHeight: "inherit",
    width: "100%",
    height: "125px",
    whiteSpace: "normal",
    minWidth: "88px"
  },
  icon: {
    color: '#DD0031',
    marginTop: "11px",
    fontSize: "50px"
  }
}


const SquareButton = props => (

  <Button className="hoverable btn-component" style={styles.button} node='a' href={props.url}>
    <Row>
      <Col className="icon-col" s={3}>
        <i style={styles.icon} className="material-icons">{props.icon}</i>
      </Col>
      <Col s={9}>
        <h5>{props.cardHeader}</h5>
        <p>{props.cardDescription}</p>
      </Col>
    </Row>
  </Button>
);

export default SquareButton;