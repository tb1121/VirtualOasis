import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHeart as soildHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import 'animate.css';

import {
  Window,
  ScrollView,
  WindowContent,
  Toolbar,
  WindowHeader,
  MenuList,
  MenuListItem,
  Button,
  Tooltip,
} from 'react95';
import '@react95/icons/icons.css';
import Image from 'next/image';
import CD from '../public/spinningCD.gif';
import playGif from '../public/playGif.gif';
import DavidWave from '../public/DavidWave.gif';
import water from '../public/water.gif'
import cubeSpin from '../public/cubeSpin.gif';
import spinningwindow from '../public/spinningwindow.gif'
import pixelStatue from '../public/pixelStatue.gif'
import Grid from '../public/3dgrid.gif';
import mikeTyson from '../public/mikeTyson.gif';
import fzero from '../public/fzero.webp';


import { useAuth } from './AuthContext';




export default function WindowComp() {
  const [open, setOpen] = useState(false);
  const [heartClicked, setheartClicked] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [scrollingText, setScrollingText] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMax, setSliderMax] = useState(100); // Initial max 
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const { isLoggedIn } = useAuth();

  const songsArr = [
    '/DireDireDocks64.mp3',
    '/VECTORGRAPHICSDESTINE.mp3',
    '/Night Observer - Yusuke Asano.mp3',
    '/Dance Off.mp3',
    '/Gran Turismo Annayamada - 4 Chords.mp3',
    '/Gran Turismo Makoto - Journey To The One.mp3',
    "Smoker's Lament - Ryo Sonoda (Gran Turismo 6).mp3",
    'Gran Turismo 6 Soundtrack - Keiji Inai - Sunset Breeze (Menu).mp3',
    'Gran Turismo 6  - Yusuke Yamamoto (channel U) - Lunar Mare.mp3',
  ];

  const gifArr = [CD,playGif,DavidWave,cubeSpin,Grid,water, spinningwindow,pixelStatue,mikeTyson,fzero]

  const handleGifChange = () => {
    // Increment the index, and loop back to the first GIF if at the end
    const newIndex = (currentGifIndex + 1) % gifArr.length;
    setCurrentGifIndex(newIndex);
  };

  useEffect(() => {
    setScrollingText('');

    

    const handleSongStart = () => {
      if (audioRef.current) {
        setScrollingText(`Now Playing: ${songsArr[currentSongIndex]}`);
        setSliderValue(0); // Reset slider when a new song starts
      }
    };

    const handleLoadedMetadata = () => {
      setSliderValue(0); // Reset slider when new song starts
      setSliderMax(audioRef.current.duration); // Update max value
    };

    const handleTimeUpdate = () => {
      setSliderValue(audioRef.current.currentTime);
    };

    const handleSongEnd = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsArr.length);
      audioRef.current.src = songsArr[currentSongIndex];
    
      // Add an event listener for canplay to ensure accurate updating
      audioRef.current.addEventListener('canplay', () => {
        const currentSongName = 'Now Playing: ' + songsArr[currentSongIndex];
        setScrollingText(currentSongName);
        setSliderValue(0); // Reset slider when audio starts playing
        setMaxSliderValue(audioRef.current.duration); // Update max value
    
        // Add an event listener for timeupdate to ensure accurate updating
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.play();
      });
    };
    
    
    

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handleSongStart);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleSongEnd);

      return () => {
        audioRef.current.removeEventListener('play', handleSongStart);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      };
    }
  }, [currentSongIndex, audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
  
    const handleSongStart = () => {
      setScrollingText(`Now Playing: ${songsArr[currentSongIndex]}`);
      setSliderValue(0);
    };
  
    const handleLoadedMetadata = () => {
      setSliderMax(audio.duration);
    };
  
    const handleTimeUpdate = () => {
      setSliderValue(audio.currentTime);
    };
  
    const handleSongEnd = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsArr.length);
      audio.src = songsArr[currentSongIndex];
  
      const currentSongName = 'Now Playing: ' + songsArr[currentSongIndex];
      setScrollingText(currentSongName);
      setSliderValue(0);
      setSliderMax(audio.duration);
      audio.play();
    };
  
    if (audio) {
      audio.addEventListener('play', handleSongStart);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleSongEnd);
  
      return () => {
        audio.removeEventListener('play', handleSongStart);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleSongEnd);
      };
    }
  }, [currentSongIndex, songsArr]);
  

  const handleTimeUpdate = () => {
    setSliderValue(audioRef.current.currentTime);
  };

  const setMaxSliderValue = () => {
    // Update max slider value if audioRef is defined
    if (audioRef.current) {
      const maxSliderValue = Math.floor(audioRef.current.duration);
      setSliderMax(maxSliderValue);
    }
  };

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);
  
    // Update the audio playback position if audioRef is defined
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
  };
  

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsArr.length);
    audioRef.current.src = songsArr[currentSongIndex];
    audioRef.current.play();
  };

  const handlePlayClick = () => {
    const audio = audioRef.current;

    if (!isAudioPlaying) {
      setIsAudioPlaying(true);

      if (!audio || audio.src !== songsArr[currentSongIndex]) {
        const newAudio = new Audio(songsArr[currentSongIndex]);
        newAudio.addEventListener('ended', handleSongEnd);
        audioRef.current = newAudio;
      }

      audioRef.current.addEventListener('canplay', () => {
        const currentSongName = 'Now Playing: ' + songsArr[currentSongIndex];
        setScrollingText(currentSongName);
        setSliderValue(0); // Reset slider when audio starts playing
        setMaxSliderValue(audioRef.current.duration); // Update max value
        audioRef.current.play();

        // Additional event listeners for audio control
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      });
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };


  const handleShuffleClick = () => {
    const shuffledSongs = shuffle([...songsArr]);

    setCurrentSongIndex(0);

    if (audioRef.current) {
      audioRef.current.src = shuffledSongs[0];
      audioRef.current.play();
      setIsAudioPlaying(true);

      audioRef.current.addEventListener('canplay', () => {
        const currentSongName = 'Now Playing: ' + shuffledSongs[0];
        setScrollingText(currentSongName);
        setSliderValue(0); // Reset slider when audio starts playing
        setMaxSliderValue(audioRef.current.duration); // Update max value
      });
    }
  };

  const handlePauseClick = () => {
    const audio = audioRef.current;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleResumeClick = () => {
    const audio = audioRef.current;

    if (audio && audio.paused) {
      audio.play();
      setIsAudioPlaying(true);
    }
  };

  const handleNextClick = () => {
    const nextIndex = (currentSongIndex + 1) % songsArr.length;
    setCurrentSongIndex(nextIndex);
    audioRef.current.src = songsArr[nextIndex];
    audioRef.current.play();

    audioRef.current.addEventListener('canplay', () => {
      const currentSongName = 'Now Playing: ' + songsArr[nextIndex];
      setScrollingText(currentSongName);
      setSliderValue(0); // Reset slider when audio starts playing
      setMaxSliderValue(audioRef.current.duration); // Update max value
    });
  };

  const handlePreviousClick = () => {
    const previousIndex =
      (currentSongIndex - 1 + songsArr.length) % songsArr.length;
    setCurrentSongIndex(previousIndex);
    audioRef.current.src = songsArr[previousIndex];
    audioRef.current.play();

    audioRef.current.addEventListener('canplay', () => {
      const currentSongName = 'Now Playing: ' + songsArr[previousIndex];
      setScrollingText(currentSongName);
      setSliderValue(0); // Reset slider when audio starts playing
      setMaxSliderValue(audioRef.current.duration); // Update max value
    });
  };

  const handleSaveClick = () => {
    const audio = audioRef.current;

    if (audio) {
      fetch(audio.src)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `song_${currentSongIndex + 1}.mp3`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) =>
          console.error('Error fetching audio file:', error)
        );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
    return formattedTime;
  };

  //check if heart is clicked
  if(heartClicked){
  //if it is grab current song and send to DataBase
    
    //We need to send the song with the user to the DB to store in user
    //
  }
  

  return (
    <Draggable handle=".window-header">
      <div style={{ position: 'fixed', margin: '6vw 2vw 0vw 0vw', padding: '0', top: '0', right: '0' }}>
        <Window 
          style={{maxWidth: '250px'}}
        >
          <WindowHeader className="window-header">
            <span className="CdMusic_16x16_4"></span>
            Tunes.exe
          </WindowHeader>
          
          <Toolbar noPadding>
            <Button variant="thin" >Favorites</Button>
            
            <Button variant="thin" onClick={handleSaveClick}>
              Save
            </Button>
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                alignSelf: 'left',
              }}
            >
              <Button variant="thin" onClick={() => setOpen(!open)} active={open}>
                Music
              </Button>
              {/* show heart when music is playing */}
              {isAudioPlaying && (
                <Tooltip text='click to favorite!'>
                <FontAwesomeIcon className={`animate__animated ${heartClicked ? 'animate__heartBeat' : ''}`}
                  style={{ marginLeft: '8px',
                  color: heartClicked? 'red': undefined,
                   }}
                  onClick={() => setheartClicked(!heartClicked)}
                  icon={heartClicked ? soildHeart : faHeart}
                />
                </Tooltip>
              )}
              {open && (
                <MenuList
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '100%',
                    zIndex: '9999',
                  }}
                  onClick={() => setOpen(false)}
                >
                  <MenuListItem onClick={handlePlayClick} size="sm">
                    Play
                  </MenuListItem>
                  <MenuListItem onClick={handleShuffleClick} size="sm">
                    Shuffle
                  </MenuListItem>
                  <MenuListItem onClick={handleNextClick} size="sm">
                    Next
                  </MenuListItem>
                  <MenuListItem onClick={handlePreviousClick} size="sm">
                    Previous
                  </MenuListItem>
                  <MenuListItem onClick={handlePauseClick} size="sm">
                    Pause
                  </MenuListItem>
                  <MenuListItem onClick={handleResumeClick} size="sm">
                    Resume
                  </MenuListItem>
                </MenuList>
              )}
            </div>
          </Toolbar>
          <WindowContent style={{ padding: '0.25rem' }}>
            <ScrollView>
              {isAudioPlaying && (
                <>
                  <marquee
                    behavior="scroll"
                    direction="left"
                    scrollamount="3"
                  >
                    {scrollingText}
                  </marquee>
                  
                  <Image
                    onClick={handleGifChange}
                    style={{ opacity: '70%', width: '100%', height: '100%' }}
                    src={gifArr[currentGifIndex]}
                    alt="currentgif"
                    title='click me to change!'
                  />
                  
                </>
              )}
                <input
                type="range"
                min="0"
                max={sliderMax}
                step="1"
                value={sliderValue}
                onChange={handleSliderChange}
                style={{
                  width: '77%',
                  color: 'gray',
                  appearance: 'none',
                  background: 'transparent',
                  outline: 'none',
                  border: '2px solid black',
                  borderRadius: '3px',
                  height: '.4vw',
                }}
              />
              <span>
                {formatTime(
                  audioRef.current ? audioRef.current.currentTime : 0
                )}
              </span>
            </ScrollView>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
