import React from 'react';
import { Button } from 'react-materialize';

const RoundButton = props => (
  <Button floating waves='light' node='a' icon='keyboard_arrow_right' href={props.url} target='_blank'
    style={{
      margin: '10px',
      backgroundColor: `${props.backgroundColor}`
    }} />
);

export default RoundButton;