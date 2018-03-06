import React from 'react';

const styles = {
  layer: {
    backgroundColor: 'rgba(13, 13, 13, 0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
}

const Banner = props => (
  <div style={{
    backgroundImage: `url(${props.img})`,
    backgroundAttachment: 'fixed',
    position: 'relative',
    backgroundSize: 'cover',
    height: '600px' 
  }}>
    <div style={styles.layer}></div>
    <div style={{
      color: `${props.textColor}`,
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%'
    }}>
      <div className='container-80'>
        {props.children}
      </div>
    </div>
  </div>
);

export default Banner;