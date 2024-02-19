import React from 'react';

const SketchfabEmbed = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '100%', zIndex: 999 }}>
      <iframe
        title="Head Of Apollo"
        frameborder="0"
        allowfullscreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        width="100%"
        height="100%"
        src="https://sketchfab.com/models/0b507e28df6640d5ab1a2e3a8cb7a17b/embed"
      ></iframe>
    </div>
  );
};

export default SketchfabEmbed;
