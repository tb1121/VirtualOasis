import React from 'react';

const PCB = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '100%', zIndex: 999 }}>
      <iframe
        title="DEMO :: PCB"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        style={{ width: '100%', height: '100%' }}
        src="https://sketchfab.com/models/4449636a059942c6bad48c5df660869d/embed"
      ></iframe>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 'normal',
          margin: '5px',
          color: '#4A4A4A',
        }}
      >
        <a
          href="https://sketchfab.com/3d-models/demo-pcb-4449636a059942c6bad48c5df660869d?utm_medium=embed&utm_campaign=share-popup&utm_content=4449636a059942c6bad48c5df660869d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          DEMO :: PCB
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/albertomara?utm_medium=embed&utm_campaign=share-popup&utm_content=4449636a059942c6bad48c5df660869d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Alberto Marà
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=4449636a059942c6bad48c5df660869d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
};

export default PCB;
