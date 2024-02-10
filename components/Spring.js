import React from 'react';
import styles from './Spring.module.css';

export default function Spring() {
  return (
    <>
      <div className={`${styles.underwaterAnimation} ${styles.virtualOasisContainer}`}>
        <img
          src='./VirtualOasis.gif'
          style={{
            maxWidth: '100%', // Adjust the maximum width as needed
            boxShadow: '0 0 10px white', // Additional box shadow for the white glow
            borderRadius: '0', // Border radius for rounded edges
            padding: '0', // Padding for the image
            opacity: '.80', // Opacity for the entire image
            border: '.12vw solid white',
           
          }}
          alt='Virtual Oasis GIF'
        />
      </div>
    </>
  );
}
