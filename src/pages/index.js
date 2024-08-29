import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../components/AuthContext';
import StackedDivs from '../../components/StackedDivs';
import FloatingButton from '../../components/FloatingButton';
import MovingText from 'react-moving-text';
import Draggable from 'react-draggable';
import 'animate.css';

// Define GIFs as img elements
const goomba = (
  <img
    src={'/goomba.gif'}
    alt="Goomba"
    style={{
      position: 'absolute',
      bottom: 0,
      left: '-100px', // Start off-screen to the left
      height: '60px', // Adjust size as needed
      width: '60px', // Adjust size as needed
      zIndex: 100, // Ensure it is above other content
      animation: 'moveAcrossScreen 10s linear forwards', // Animation runs once
    }}
  />
);

const sonic = (
  <img
    src={'/sonic.gif'}
    alt="Goomba"
    style={{
      position: 'absolute',
      bottom: 0,
      left: '-100px', // Start off-screen to the left
      height: '100px', // Adjust size as needed
      width: '100px', // Adjust size as needed
      zIndex: 100, // Ensure it is above other content
      animation: 'moveAcrossScreen 10s linear forwards', // Animation runs once
    }}
  />
);

const pikachu = (
  <img
    src={'/pikachu.gif'}
    alt="Pikachu"
    style={{
      position: 'absolute',
      bottom: 0,
      left: '-100px', // Start off-screen to the left
      height: '80.25px', // Adjust size as needed
      width: '109.75px', // Adjust size as needed
      zIndex: 100, // Ensure it is above other content
      animation: 'moveAcrossScreen 10s linear forwards', // Animation runs once
    }}
  />
)

const mario = (
  <img
    src={'/mariowalking.gif'}
    alt="Mario"
    style={{
      position: 'absolute',
      bottom: 0,
      left: '-100px', // Start off-screen to the left
      height: '100px', // Adjust size as needed
      width: '50px', // Adjust size as needed
      zIndex: 100, // Ensure it is above other content
      animation: 'moveAcrossScreen 10s linear forwards', // Animation runs once
    }}
  />
);

// Add more GIFs here if needed
const gifs = [goomba, mario, pikachu, sonic]; // Add new GIFs to this array

const water = '/water.gif';
const BGs = ['/OasisBG.gif', '/gridBG.gif'];
const startupSound = '/startup.mp3';

const HomePage = ({ handleThemeChange, theme }) => {
  const { isLoggedIn } = useAuth();
  const [currentGif, setCurrentGif] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const audio = new Audio(startupSound);
      audio.volume = 0.1;
      audio.play();

      // Function to get a random GIF
      const getRandomGif = () => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        return gifs[randomIndex];
      };

      // Function to handle GIF animation
      const handleGifAnimation = () => {
        const gif = getRandomGif();
        setCurrentGif(gif);

        // Change GIF after animation duration (10s)
        setTimeout(() => {
          setCurrentGif(null);
        }, 10 * 1000); // 10 seconds duration
      };

      handleGifAnimation(); // Start animation

      // Repeat animation every 2 minutes (120s)
      const intervalId = setInterval(() => {
        handleGifAnimation();
      }, 2 * 1000 * 60);

      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  const handleVirtualOasisClick = () => {
    const audio = new Audio('/AudioOasis.mp3');
    audio.play();
    console.log('Virtual Oasis GIF clicked!');
  };

  return (
    <>
      <div style={{ position: 'relative', overflowX: 'hidden', background: theme.desktopBackground }}>
        <Navbar handleThemeChange={handleThemeChange} />
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', margin: '0', padding: '0' }}>
          {isLoggedIn && <StackedDivs />}
          {isLoggedIn && <FloatingButton />}
          {isLoggedIn && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed', // Use fixed positioning for Draggable
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: theme.anchor,
              }}
            >
              <Draggable handle=".window-header">
                <div className='animate__animated animate__fadeInUp animate__delay-5s animate__slow' onClick={handleVirtualOasisClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: theme, zIndex: 5, fontSize: '7vw', padding: '0', margin: '0 0 -1vw 0' }}>Virtual Oasis</div>
                  <img src={water} alt="Water Image" style={{ height: '5vw', width: '38vw' }} />
                </div>
              </Draggable>
            </div>
          )}
          {!isLoggedIn && (
            <div
              style={{
                position: 'fixed', // Use fixed positioning for the Moving Text
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '7vw',
                textAlign: 'center',
                borderRadius: 0,
                padding: '0',
                margin: '0',
                alignItems: 'center',
              }}
            >
              <div style={{ color: 'black', fontSize: '7vw' }}>
                <MovingText
                  type="typewriter"
                  dataText={[
                    'Welcome to',
                    'the',
                    'Virtual Oasis',
                    'sit back,',
                    'relax,',
                    'and never',
                    '...',
                    'ever',
                    '...',
                    'escape',
                  ]}
                />
              </div>
            </div>
          )}
          {isLoggedIn && currentGif}
        </div>
      </div>
      <style>
        {`
          @keyframes moveAcrossScreen {
            0% {
              transform: translateX(-100%); // Start off-screen to the left
            }
            100% {
              transform: translateX(calc(100vw + 100px)); // Move to off-screen to the right
            }
          }
        `}
      </style>
    </>
  );
};

export default HomePage;
