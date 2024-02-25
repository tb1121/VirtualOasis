import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../components/AuthContext';
import StackedDivs from '../../components/StackedDivs';
import MovingText from 'react-moving-text';
import Draggable from 'react-draggable';

const water = ['/water.gif'];
const BGs = ['/OasisBG.gif', '/gridBG.gif'];

const HomePage = ({ handleThemeChange, theme }) => {
  const { isLoggedIn } = useAuth();
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

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
          {isLoggedIn && (
            <div
              style={{
                position: 'fixed', // Use fixed positioning for the GIF
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '7vw',
                textAlign: 'center',
                borderRadius: 0,
                padding: '0',
                margin: '0',
                alignItems: 'center'
              }}
            >
              <Draggable>
                <div onClick={handleVirtualOasisClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ zIndex: 5, fontSize: '7vw', padding: '0', margin: '0 0 -1vw 0', color: { theme } }}>Virtual Oasis</div>
                  <img src={water[0]} alt="Water Image" style={{ height: '5vw', width: '38vw' }} />
                </div>
              </Draggable>
            </div>
          )}
          {!isLoggedIn && (
            <div
              style={{
                position: 'fixed', // Use fixed positioning for the GIF
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
              <div style={{ fontSize: '7vw' }}>
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
                >
                </MovingText>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
