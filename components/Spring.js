import Head from 'next/head';
import { useSpring, animated } from '@react-spring/web';
import React from 'react';

export default function Spring() {
  const springs = useSpring({
    from: { y: -10, opacity: 0, fontSize: '0vw', color: 'white', textShadow: '0 0 20px #00ff00, 0 0 40px white' },
    to: { y: 2, opacity: 0.7, fontSize: '5vw', color: '#ff6db9', textShadow: '0 0 20px #ff6db6, 0 0 40px white' },
    config: { duration: 4000 },
  });

  return (
    <>
      <Head>
        {/* Include the preconnect links for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Include the Google Fonts link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        // style={{
        //   boxShadow: '0 0 20px white', // Additional box shadow for the white glow
        // }}
      >
        <animated.p
          style={{
            ...springs,
            fontFamily: 'Tilt Neon, sans-serif', // Use the selected font
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            imageRendering: 'pixelated',
            textAlign: 'center',
            border: '2px solid #ff6db6', // Neon sign border
            borderRadius: '10px', // Border radius for a smoother look
            padding: '10px', // Padding for the text
          }}
        >
          Welcome to the Virtual Oasis
        </animated.p>
      </div>
    </>
  );
}
