import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Spring from '../../components/Spring';
import WindowComp from '../../components/WindowComp';
import '@react95/icons/icons.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MenuList, MenuListItem, Separator, styleReset, Button } from 'react95';
// pick a theme of your choice
import original from 'react95/dist/themes/original';
import vaporteal from 'react95/dist/themes/vaporTeal';

// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';




// Global styles for fonts
const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

const HomePage = () => {
  // State to track whether audio is playing
  const [isAudioPlaying, setAudioPlaying] = useState(false)

  // Function to handle click on the Virtual Oasis GIF
  const handleVirtualOasisClick = () => {
    const audio = new Audio('/AudioOasis.mp3');
    audio.play();

    // Additional actions you may want to perform on click
    // ...

    // For demonstration purposes, you can log a message
    console.log('Virtual Oasis GIF clicked!');
  };

  return (
    <>
    <GlobalStyles />
    <ThemeProvider theme={vaporteal}>
      <div style={{ position: 'relative', overflowX: 'hidden' }}>
        <Navbar />
        <div style={{height: '100vh', overflow: 'hidden' }}>
          {/* Liminal background image with adjusted styles */}
          <img
            src='/OasisBG.gif'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute', // Use absolute positioning for the background image
              zIndex: -1,
            }}
            alt='Full Screen Gif'
          />
          <WindowComp />
          <div
            style={{
              position: 'fixed', // Use fixed positioning for the GIF
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '24px',
              textAlign: 'center',
              cursor: 'pointer', // Set cursor to indicate clickability
              // Ensure it's above the image
              borderRadius: 0,
            }}
            onClick={handleVirtualOasisClick} // Attach click handler
          >
            {/* Animated GIF component */}
            <Spring />
          </div>
        </div>
      </div>
    </ThemeProvider>
    </>
  );
};

export default HomePage;
