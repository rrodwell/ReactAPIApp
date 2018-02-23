import React from 'react';

const RowLayout = props => (
  <div className='container-80 flex-col content-center'>
    <h1>{props.title}</h1>
    <div className='flex-row content-spread'>
      {props.children}
    </div>
  </div>

);

export default RowLayout;