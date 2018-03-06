import React from 'react';

const styles = {
  centered: {
    width: '60%',
    margin: '0 auto'
  }
};

const ColLayout = props => (
  <div style={styles.centered} className='flex-col content-center'>
    <h1>{props.title}</h1>
    {props.children}
  </div>
);

export default ColLayout;