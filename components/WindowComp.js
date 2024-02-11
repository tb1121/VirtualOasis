import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Window, ScrollView, WindowContent, Toolbar, WindowHeader, MenuList, MenuListItem, Separator, Button } from 'react95';
import '@react95/icons/icons.css';
import Image from 'next/image';
import CD from '../public/spinningCD.gif';

export default function WindowComp() {
  const [open, setOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songsArr = [
    '/DireDireDocks64.mp3',
    '/VECTORGRAPHICSDESTINE.mp3',
    '/Night Observer - Yusuke Asano.mp3',
    '/Dance Off.mp3',
    '/Gran Turismo Annayamada - 4 Chords.mp3'
  ];

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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

      audioRef.current.play();
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleShuffleClick = () => {
    const audio = audioRef.current;
  
    // Check if audioRef is available before shuffling
    if (audio) {
      const shuffledSongs = shuffle([...songsArr]);
  
      setCurrentSongIndex(0);
      audioRef.current.src = shuffledSongs[0];
      audioRef.current.play();
      setIsAudioPlaying(true);
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
  };

  const handlePreviousClick = () => {
    const previousIndex = (currentSongIndex - 1 + songsArr.length) % songsArr.length;
    setCurrentSongIndex(previousIndex);
    audioRef.current.src = songsArr[previousIndex];
    audioRef.current.play();
  };

  const handleSaveClick = () => {
    const audio = audioRef.current;

    if (audio) {
      fetch(audio.src)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `song_${currentSongIndex + 1}.mp3`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(error => console.error('Error fetching audio file:', error));
    }
  };

  return (
    <Draggable handle=".window-header">
      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        <Window style={{ maxWidth: '250px', margin: '5vw', transition: 'width 0.5s' }}>
          <WindowHeader className="window-header">
            <span className="CdMusic_16x16_4"></span>
            Tunes.exe
          </WindowHeader>
          <Toolbar noPadding>
            <Button variant="thin">
              Favorite
            </Button>
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
                size="sm"
                active={open}
              >
                Music
              </Button>
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
                  <MenuListItem
                    onClick={handlePlayClick}
                    size="sm"
                  >
                    Play
                  </MenuListItem>
                  <MenuListItem
                    onClick={handleShuffleClick}
                    size="sm"
                  >
                    Shuffle
                  </MenuListItem>
                  <MenuListItem
                    onClick={handleNextClick}
                    size="sm"
                  >
                    Next
                  </MenuListItem>
                  <MenuListItem
                    onClick={handlePreviousClick}
                    size="sm"
                  >
                    Previous
                  </MenuListItem>
                  <MenuListItem
                    onClick={handlePauseClick}
                    size="sm"
                  >
                    Pause
                  </MenuListItem>
                  <MenuListItem
                    onClick={handleResumeClick}
                    size="sm"
                  >
                    Resume
                  </MenuListItem>
                  <Separator />
                  <MenuListItem size="sm" disabled>
                    MySpace
                  </MenuListItem>
                </MenuList>
              )}
            </div>
          </Toolbar>
          <WindowContent style={{ padding: '0.25rem' }}>
            <ScrollView>
              {isAudioPlaying && (
                <Image
                  style={{ opacity: '70%', width:'100%',height:'100%'}}
                  src={CD}
                  alt="boombox"
                />
              )}
            </ScrollView>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
