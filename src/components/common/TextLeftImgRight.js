import React from 'react';

const TextLeftImgRight = props => (
  <div className='container-80'>
    <h1>{props.title}</h1>
    <div className='flex-row content-spread section-container half'>
      {props.children}
      <img className='half' src={props.img} />
    </div>
  </div>
);

export default TextLeftImgRight;