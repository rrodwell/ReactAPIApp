import React from 'react';

const SectionTextRightImgLeft = props => (
  <div className='container-80'>
    <h1>{props.title}</h1>
    <div className='flex-row content-spread section-container half'>
      <img className='half' src={props.img} />
      {props.children}
    </div>
  </div>
);

export default SectionTextRightImgLeft;