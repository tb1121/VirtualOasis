import React from 'react';
import oasisImage from '../public/TheOasis.jpeg';
import Image from 'next/image';

const Oasis = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
          overflow: 'hidden', // Ensure that the image doesn't overflow the container
        }}
      >
        <Image
          src={oasisImage}
          layout="fill"
          objectFit="contain"
          alt='Oasis Background'
        />
      </div>
      {/* Your content goes here */}
    </div>
  );
};

export default Oasis;
