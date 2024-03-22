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
import n64 from '../public/n64.gif';
import pixelMac from '../public/pixelMac.gif';
import openComputer from '../public/openComputer.gif';
import contra from '../public/contra.gif';
import animatedColors from '../public/animatedColors.gif';



import { useAuth } from './AuthContext';

export default function WindowComp() {
  const [musicOpen, setMusicOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [heartClicked, setheartClicked] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [scrollingText, setScrollingText] = useState('');
  const [favoriteScrollingText, setFavoriteScrollingText] = useState('')
  const [forceText, setForceText] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMax, setSliderMax] = useState(100); // Initial max
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [localZIndex, setLocalZIndex] = useState(3);
  const [UpdatedFavSongsArray, setUpdatedFavSongsArray] = useState([])
  const [shufflingFavorites, setShufflingFavorites] = useState(false);
  const [shuffledFavorite, setShuffledFavorite] = useState('')
  const [favoritedSongs, setFavoritedSongs] = useState([]);
  const [songWasDeleted, setSongWasDeleted] = useState(false);
  const [usersFavoriteSong, setUsersFavoriteSong] = useState('');
  const { isLoggedIn, stopMusic } = useAuth();


  const songsArr = [
    '/FLOURISHMID.mp3',
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
    '/Express Way - Daisuke Kawai (Gran Turismo 6).mp3',
    '/Gran Turismo 5 OST_ Makoto - Winter Dreams.mp3',
    '/Dan Mason - Make Me Love You.mp3',
    '/Dan Mason - Miami Virtual.mp3',
    '/Donkey Kong Country - Aquatic Ambience [Restored].mp3',
    '/Donkey Kong Country - Ice Cave Chant [Restored].mp3',
    '/Super Mario 64 Remastered - File Select.mp3',
    '/Super Mario 64 Remastered - Inside the Castle Walls.mp3',
    '/Super Mario 64 Remastered - Dire, Dire Docks.mp3',
    '/Gran Turismo 5 OST_ Kemmei Adachi - Evening Haze.mp3',
    '/Gran Turismo 5 OST_ Daisuke Kawai - Weekend.mp3',
    '/Garage - Gran Turismo 6.mp3',
    '/Gran Turismo 5 OST_ Satoshi Bando - Wave Train.mp3',
    '/Gran Turismo 5 OST_ Satoshi Bando - Smooth Talking.mp3',
    '/Sega Marine Fishing - The Offing.mp3',
    '/Winning Results - Mario Kart 64 (Restored).mp3',
    '/Nagano Winter Olympics 98 Music Won 3.mp3',
    '/Lost - 1080 Snowboarding.mp3',
    '/Metroid - Ending (Analog Synth Remake).mp3',




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
    dancingSims, 
    n64,
    pixelMac,
    openComputer,
    contra,
    animatedColors,
  ];

  const { username } = useAuth();
  const { globalZIndex, incrementZIndex } = useZIndex();


  useEffect(() => {
    // Check if audio is playing and fetch updated favorite songs
    if (isAudioPlaying || currentSongIndex !== null) {
      // Make the request to the backend to fetch updated favorite songs
      handleUpdateGrabAllFavoriteSongs().then(() => {
        // Check if the current song is in the updated favorite songs array
        const currentSongName = songsArr[currentSongIndex];
        if (UpdatedFavSongsArray.includes(currentSongName)) {
          setheartClicked(true);
        } else {
          setheartClicked(false);
        }
      }).catch(error => {
        console.error('Error fetching updated favorite songs:', error);
      });
    }
  }, [isAudioPlaying, currentSongIndex]);
  


    useEffect(() => {
      // console.log('from useeffect, stopMusic state is ', stopMusic)
    // Reset heartClicked to false when changing to a new song]
    if(stopMusic && audioRef.current){
      audioRef.current.pause();
    }
    if(!shufflingFavorites){
    setheartClicked(false);
    }
  }, [currentSongIndex, stopMusic]);

  //new request if im shuffling favorites
  const removeFavoriteSong = async () => {
    try {
      // If heartClicked is false, set it to true and save it to the database
      if (heartClicked === false) {
        setheartClicked(true);
  
        // Send a POST request to add the shuffledFavorite to favorites
        const addSongResponse = await fetch(
          'http://localhost:3001/api/saveFavoriteSong/sendFavoriteSong',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, favoriteSong: shuffledFavorite }),
          }
        );
  
        if (addSongResponse.ok) {
          const data = await addSongResponse.json();
          console.log(data);
  
          // Update the local state to add the favorited song
          setFavoritedSongs((prevFavoritedSongs) => [
            ...prevFavoritedSongs,
            shuffledFavorite,
          ]);
          return
        } else {
          throw new Error(
            `Failed to send a favorite song. Status: ${addSongResponse.status}`
          );
          
        }
      }
    } catch (error) {
      console.error('Error adding favorite song:', error.message);
    }
  
    try {
      // Send a DELETE request to remove the shuffledFavorite from favorites
      const deleteResponse = await fetch(
        'http://localhost:3001/api/deleteSongs/deleteFavoriteSong',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, favoriteSong: shuffledFavorite }),
        }
      );
  
      if (deleteResponse.ok) {
        // Set heartClicked to false after successfully removing the song
        //here, I need to grab all of the songs from the database again after deletion
        setSongWasDeleted(true)
        handleUpdateGrabAllFavoriteSongs()
        setheartClicked(false);
  
        // Update the local state to remove the unfavorited song
        setFavoritedSongs((prevFavoritedSongs) =>
          prevFavoritedSongs.filter((favSong) => favSong !== shuffledFavorite)
        );
      } else {
        throw new Error(
          `Failed to delete the favorite song. Status: ${deleteResponse.status}`
        );
      }
    } catch (error) {
      console.error('Error removing favorite song:', error.message);
    }
  };
  
  

  // grab and send favorite song to the User database
  const sendFavoriteSong = async () => {
    try {
      const song = songsArr[currentSongIndex]; 
      const newHeartClicked = !heartClicked;
      setheartClicked(newHeartClicked);
  
      if (!newHeartClicked) {
        // Logic to delete the favorite song from the database
        const response = await fetch(
          'http://localhost:3001/api/deleteSongs/deleteFavoriteSong',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, favoriteSong: song }),
          }
        );
  
        if (response.ok) {
          // Update the local state to remove the unfavorited song
          setFavoritedSongs((prevFavoritedSongs) =>
            prevFavoritedSongs.filter((favSong) => favSong !== song)
          );
        } else {
          throw new Error(
            `Failed to delete the favorite song. Status: ${response.status}`
          );
        }
      } else {
        // Logic to send the favorite song to the database
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
          // Update the local state to add the favorited song
          setFavoritedSongs((prevFavoritedSongs) => [
            ...prevFavoritedSongs,
            song,
          ]);
        } else {
          throw new Error(
            `Failed to send a favorite song. Status: ${response.status}`
          );
        }
      }
    } catch (error) {
      console.error('Error updating favorite song:', error.message);
    }
  };


  
  const handleShuffleAllFavoriteSongs = () => {
    setFavoritesOpen((prevOpen) => !prevOpen);
    setForceText(true);
    setheartClicked(true)
    setShufflingFavorites(true)
  
    // Pause the current song
    audioRef.current.pause();
  
    // Shuffle the array
    const shuffledArray = shuffle([...UpdatedFavSongsArray]);
  
    // Set the source of the audio to the first song in the shuffled array
    audioRef.current.src = shuffledArray[0];
    setShuffledFavorite(shuffledArray[0])
  
    // Set up event listener for when the audio can play
    const onCanPlay = () => {
      const currentSongName = 'Now Playing: ' + shuffledArray[0];
      console.log(currentSongName);
      setFavoriteScrollingText(currentSongName);
      setSliderValue(0); // Reset slider when audio starts playing
      setMaxSliderValue(); // Update max value
      setIsAudioPlaying(true); // Make sure to set isAudioPlaying to true
    };
  
    // Set up event listener for when the audio ends
    const onEnded = () => {
      // Play the next shuffled song
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * shuffledArray.length);
      } while (nextIndex === currentSongIndex);
  
      setCurrentSongIndex(nextIndex);
      audioRef.current.src = shuffledArray[nextIndex];
      audioRef.current.play();
    };
  
    audioRef.current.removeEventListener('canplay', onCanPlay);
    audioRef.current.removeEventListener('ended', onEnded);
  
    // Add event listeners to the audio
    audioRef.current.addEventListener('canplay', onCanPlay);
    audioRef.current.addEventListener('ended', () => {
      handleShuffleAllFavoriteSongs();
      setFavoritesOpen(false);
    });
  
    // Play the shuffled song
    audioRef.current.play();
  };


  const handleUpdateGrabAllFavoriteSongs = async () => {
  
    try {
      const response = await fetch(`http://localhost:3001/api/saveFavoriteSong/grabAllSongs/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
  );
  
      if (response.ok) {
        const data = await response.json();
        // Handle the data retrieved from the server
        setUpdatedFavSongsArray(data.songs)
        console.log(UpdatedFavSongsArray)
      } else {
        throw new Error(`Failed to grab favorite songs. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error grabbing favorite songs:', error.message);
    }
  };
  


  
  
  
  
  
  
  
  
  


  const handleGrabAllFavoriteSongs = async () => {
    
    setFavoritesOpen(!favoritesOpen)//I want to skip this part of the code if songWasDeleted is true
    try {
      const response = await fetch(`http://localhost:3001/api/saveFavoriteSong/grabAllSongs/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
  );
  
      if (response.ok) {
        const data = await response.json();
        // Handle the data retrieved from the server
        // console.log(data.songs);
        // setUpdatedFavSongsArray(data.songs) include this line in the new call to the backend api, when I first load the component
      } else {
        throw new Error(`Failed to grab favorite songs. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error grabbing favorite songs:', error.message);
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

  const onCanPlay = () => {
    const currentSongName = 'Now Playing: ' + songsArr[nextIndex];
    setScrollingText(currentSongName);
    setSliderValue(0); // Reset slider when audio starts playing
    setMaxSliderValue(); // Update max value
    audioRef.current.play();
  };

  audioRef.current.addEventListener('canplay', onCanPlay);
  audioRef.current.addEventListener('ended', playNextSong);

  audioRef.current.pause(); // Pause the current audio
};




  
  
  

  const handleMouseDown = () => {
    // console.log('mouse down! from WindowComp' + globalZIndex)
    incrementZIndex()
    setLocalZIndex(globalZIndex + 1)
  }

  const handlePlayClick = () => {
    const audio = audioRef.current;
    setForceText(false)
    setShufflingFavorites(false);

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
    setIsAudioPlaying(true);
    setForceText(false)
    setShufflingFavorites(false)
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
    setShufflingFavorites(false);
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
          <Button
            onClick={handleGrabAllFavoriteSongs}
            variant="thin"
            active={favoritesOpen}
          >
            <span
              style={{
                animation: shufflingFavorites
                  ? 'highlight 1s linear infinite alternate'
                  : 'none', // Apply animation only when shufflingFavorites is true
              }}
            >
              Favorites
            </span>
            <style jsx>{`
              @keyframes highlight {
                from {
                  color: black; /* Start color */
                }
                to {
                  color: red; /* End color */
                }
              }
            `}</style>
          </Button>
            {favoritesOpen && (
              <MenuList
              style={{
                position: 'absolute',
                left: '0',
                top: '100%',
                zIndex: '9999',
              }}
              >
                <MenuListItem onClick={handleShuffleAllFavoriteSongs}>
                  Shuffle
                </MenuListItem>
              </MenuList>
            )}

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
                onClick={() => setMusicOpen(!musicOpen)}
                active={musicOpen}
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
                    onClick={shufflingFavorites ? removeFavoriteSong : sendFavoriteSong}

                    icon={heartClicked ? soildHeart : faHeart}
                  />
                </Tooltip>
              )}
              {musicOpen && (
                <MenuList
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '100%',
                    zIndex: '9999',
                  }}
                  onClick={() => setMusicOpen(false)}
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
              {isAudioPlaying  && (
                <>
                  <marquee
                    behavior="scroll"
                    direction="left"
                    scrollamount="3"
                  >
                    {forceText ? favoriteScrollingText : scrollingText}
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
