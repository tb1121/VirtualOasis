import React from 'react';

export default function Temple95() {
  return (
    <div
      className="sketchfab-embed-wrapper"
      style={{
        width: '100%',
        height: '100%',
        zIndex: 999
      }}
    >
      <iframe
        title="Ancient temple of x86"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        style={{
          width: '100%',
          height: '100%',
        }}
        src="https://sketchfab.com/models/47c12b8a1ee24b8b8a85256c02c302bf/embed"
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
          href="https://sketchfab.com/3d-models/ancient-temple-of-x86-47c12b8a1ee24b8b8a85256c02c302bf?utm_medium=embed&utm_campaign=share-popup&utm_content=47c12b8a1ee24b8b8a85256c02c302bf"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Ancient temple of x86
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/radio_hate?utm_medium=embed&utm_campaign=share-popup&utm_content=47c12b8a1ee24b8b8a85256c02c302bf"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Ruslan Simashev
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=47c12b8a1ee24b8b8a85256c02c302bf"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
}
