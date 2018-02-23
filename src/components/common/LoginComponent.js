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
    <div>
        <h5>Upload Test Cases</h5>
        <Row>
            <Input s={6} label="API Username" />
            <Input s={6} label="API Password" />

            <div>
                <div className="btn">
                    <span>File</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
        </Row>
    </div>
);

export default CardComponent;