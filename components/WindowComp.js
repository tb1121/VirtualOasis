import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as soildHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useZIndex } from './ZIndexContext';
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
import cubeSpin from '../public/cubeSpin.gif';
import spinningwindow from '../public/spinningwindow.gif';
import pixelStatue from '../public/pixelStatue.gif';
import Grid from '../public/3dgrid.gif';
import mikeTyson from '../public/mikeTyson.gif';
import fzero from '../public/fzero.webp';
import water from '../public/water.gif';
import computer from '../public/microsoft-computer.gif';
import cyberArt from '../public/cyberArt.gif';
import outsideWindow from '../public/outsideWindow.gif';
import blocks from '../public/blocks.gif';
import spinning from '../public/spinning.gif';
import spinningDisk from '../public/spinningDisk.gif';
import windowsFlag from '../public/windowsFlag.gif';
import dancingSims from '../public/dancingSims.gif'



import { useAuth } from './AuthContext';

export default function WindowComp({isTunesOpen}) {
  const [open, setOpen] = useState(false);
  const [heartClicked, setheartClicked] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [scrollingText, setScrollingText] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMax, setSliderMax] = useState(100); // Initial max
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [localZIndex, setLocalZIndex] = useState(3);
  const [favoritedSongs, setFavoritedSongs] = useState([]);
  const [usersFavoriteSong, setUsersFavoriteSong] = useState('');
  const { isLoggedIn } = useAuth();

  const songsArr = [
    '/FLOURISHMID.mp3',
    '/DireDireDocks64.mp3',
    '/VECTORGRAPHICSDESTINE.mp3',
    '/Night Observer - Yusuke Asano.mp3',
    '/Dance Off.mp3',
    '/Gran Turismo Annayamada - 4 Chords.mp3',
    '/Gran Turismo Makoto - Journey To The One.mp3',
    "/Smoker's Lament - Ryo Sonoda (Gran Turismo 6).mp3",
    '/Gran Turismo 6 Soundtrack - Keiji Inai - Sunset Breeze (Menu).mp3',
    '/Gran Turismo 6  - Yusuke Yamamoto (channel U) - Lunar Mare.mp3',
    '/Isamu Ohira - Light Velocity.mp3',
    '/Isamu Ohira - Race Prepare.mp3',
    '/Gran Turismo 5 OST_ Mitsuharu Ura & Furani - Route Sunday.mp3',
    '/Gran Turismo 6 Soundtrack - Keiji Inai - Easy Drive.mp3',
    '/Gran Turismo 5 OST_ Yuki Oike - Globe.mp3',
    '/PrismCorp Virtual Enterprises - Pure.mp3',
    '/PrismCorp Virtual Enterprises - Neo Spa & Salon.mp3',
    '/PrismCorp Virtual Enterprises - Newsgroup.mp3',
    '/PrismCorp Virtual Enterprises - Sol Air.mp3',
    '/PrismCorp Virtual Enterprises - Lifestyles.mp3',
    '/PASSPORTMID.mp3',
    '/CANYONMID.mp3',
    '/Kemmei Adachi - Mirage.mp3',
    '/Pilotwings-Rocketbelt .mp3',
    '/The Sims Soundtrack_ Neighborhood 1.mp3',
    '/The Sims Soundtrack_ Neighborhood 2.mp3',
    '/The Sims Soundtrack_ Neighborhood 4.mp3',
    '/Yasuo Sakou - Obrigado! Obrigado!.mp3',
    '/Gran Turismo 5 OST_ Keiji Inai - In Transit.mp3',
    '/Dreamy.MID.mp3',


  ];

  const gifArr = [
    CD,
    playGif,
    DavidWave,
    cubeSpin,
    Grid,
    water,
    spinningwindow,
    pixelStatue,
    mikeTyson,
    fzero,
    computer,
    cyberArt,
    outsideWindow,
    blocks,
    spinning,
    spinningDisk,
    windowsFlag,
    dancingSims
  ];

  const { username } = useAuth();
  const { globalZIndex, incrementZIndex } = useZIndex();


    useEffect(() => {
    // Reset heartClicked to false when changing to a new song
    setheartClicked(false);
  }, [currentSongIndex]);

  // grab and send favorite song to the User database
  const sendFavoriteSong = async () => {
    const newHeartClicked = !heartClicked; // capture the state in a new variable before the async function runs
    setheartClicked(newHeartClicked);
    console.log('newHeartClicked is ', newHeartClicked);
    try {
      const song = songsArr[currentSongIndex];
      console.log('song is ', song);
      setUsersFavoriteSong(song);

      if (newHeartClicked === false) {
        return; // Exit early if sendSong is false
      }

      const response = await fetch(
        'http://localhost:3001/api/saveFavoriteSong/sendFavoriteSong',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, favoriteSong: song }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error(
          `Failed to send a favorite song. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error('Error sending favorite song:', error.message);
    }
  };

  const handleGifChange = () => {
    // Increment the index, and loop back to the first GIF if at the end
    const newIndex = (currentGifIndex + 1) % gifArr.length;
    setCurrentGifIndex(newIndex);
  };

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

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songsArr.length;
    setCurrentSongIndex(nextIndex);
  
    audioRef.current.src = songsArr[nextIndex];
  
    audioRef.current.addEventListener('canplay', () => {
      const currentSongName = 'Now Playing: ' + songsArr[nextIndex];
      setScrollingText(currentSongName);
      setSliderValue(0); // Reset slider when audio starts playing
      setMaxSliderValue(); // Update max value
      audioRef.current.play();
    });
  
    audioRef.current.addEventListener('ended', playNextSong);
  
    audioRef.current.pause(); // Pause the current audio
    audioRef.current.removeEventListener('canplay', handleTimeUpdate);
    audioRef.current.removeEventListener('ended', playNextSong);
  };
  
  
  

  const handleMouseDown = () => {
    console.log('mouse down! from WindowComp' + globalZIndex)
    incrementZIndex()
    setLocalZIndex(globalZIndex + 1)
  }

  const handlePlayClick = () => {
    const audio = audioRef.current;

    if (!isAudioPlaying) {
      setIsAudioPlaying(true);

      // Check if the audio source needs to be updated
      if (!audio || audio.src !== songsArr[currentSongIndex]) {
        const newAudio = new Audio(songsArr[currentSongIndex]);
        newAudio.addEventListener('ended', playNextSong);
        audioRef.current = newAudio;
      }

      // Add event listeners before playing
      audioRef.current.addEventListener('canplay', () => {
        const currentSongName = 'Now Playing: ' + songsArr[currentSongIndex];
        setScrollingText(currentSongName);
        setSliderValue(0); // Reset slider when audio starts playing
        setMaxSliderValue(audioRef.current.duration); // Update max value
      });

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', playNextSong);

      // Play the audio
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleShuffleClick = () => {
    const shuffledSongs = shuffle([...songsArr]);

    if (audioRef.current) {
      // Find the index of the shuffled song in the original songsArr
      const shuffledIndex = songsArr.indexOf(shuffledSongs[0]);

      setCurrentSongIndex(shuffledIndex);

      audioRef.current.src = shuffledSongs[0];
      audioRef.current.play();
      setIsAudioPlaying(true);

      audioRef.current.addEventListener('canplay', () => {
        const currentSongName = 'Now Playing: ' + shuffledSongs[0];
        setScrollingText(currentSongName);
        setSliderValue(0); // Reset slider when audio starts playing
        setMaxSliderValue(audioRef.current.duration); // Update max value
      });

      // Continue playing shuffled songs without stopping
      audioRef.current.addEventListener('ended', handleShuffleClick);
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
    playNextSong();
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

  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div
        style={{
          // position: 'fixed',
          // marginTop: '5vw',
          padding: '0',
          top: '0',
          right: '0',
          // border: '1px solid red',
          zIndex: localZIndex
        }}
      >
        <Window
          className="animate__animated animate__rubberBand"
          style={{ maxWidth: '250px' }}
        >
          <WindowHeader className="window-header">
            <span className="CdMusic_16x16_4"></span>
            {' '}Tunes.exe
          </WindowHeader>

          <Toolbar noPadding>
            <Button variant="thin">Favorites</Button>

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
              <Button
                variant="thin"
                onClick={() => setOpen(!open)}
                active={open}
              >
                Music
              </Button>
              {/* Show heart when music is playing */}
              {isAudioPlaying && (
                <Tooltip
                  text={heartClicked ? 'Favorited!' : 'Click to favorite!'}
                >
                  <FontAwesomeIcon
                    className={`animate__animated ${
                      heartClicked ? 'animate__heartBeat' : ''
                    }`}
                    style={{
                      marginLeft: '8px',
                      color: heartClicked ? 'red' : undefined,
                    }}
                    onClick={sendFavoriteSong}
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
                    style={{
                      opacity: '70%',
                      width: '100%',
                      height: '100%',
                    }}
                    src={gifArr[currentGifIndex]}
                    alt="currentgif"
                    title="Click me to change!"
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
