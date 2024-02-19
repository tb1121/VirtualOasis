import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../components/AuthContext';
import StackedDivs from '../../components/StackedDivs';
import MovingText from 'react-moving-text'
import Draggable from 'react-draggable';

const water = ['/water.gif']
const BGs = ['/OasisBG.gif', '/gridBG.gif'];

const HomePage = ({ handleThemeChange, theme }) => {
  const { isLoggedIn } = useAuth();
  // State to track whether audio is playing
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // const handleBackgroundClick = () => {
  //   setBackgroundIndex((prevIndex) => (prevIndex + 1) % BGs.length);
  // };

  // const handleAlert = () => {
  //   alert('all done!');
  // }

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
      <div style={{ position: 'relative', overflowX: 'hidden', background: theme.desktopBackground }}>
        <Navbar handleThemeChange={handleThemeChange} />
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', margin: '0', padding: '0'}}>
          {/* Liminal background image with adjusted styles */}
          {/* <img
            onClick={handleBackgroundClick}
            src={BGs[backgroundIndex]}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute', // Use absolute positioning for the background image
              // zIndex: ,
            }}
            alt='Full Screen Gif'
          /> */}
          {/* <SketchfabEmbed /> */}
          {/* <Temple95 style={{zIndex: 1}}/> */}
          {/* <PCB /> */}
          <StackedDivs />
          {/* {isLoggedIn && <WindowComp />} */}
          <div
            style={{
              position: 'fixed', // Use fixed positioning for the GIF
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '7vw',
              textAlign: 'center',
              cursor: 'pointer', 
              borderRadius: 0,
              padding: '0',
              margin: '0',
              alignItems: 'center',
            }}
            onClick={handleVirtualOasisClick} 
          >
            {isLoggedIn && ( <Draggable>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '7vw', padding: '0', margin: '0', color: {theme} }}>Virtual Oasis</div>
                <img src={water[0]} alt="Water Image" style={{ height: '5vw', width: '38vw' }} />
              </div>
              </Draggable>
            )}


          <div style={{ fontSize: '7vw' }}>
          {!isLoggedIn && <MovingText type="typewriter"
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
            'escape'
          ]} >
          </MovingText>}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
