import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store';
import PlaylistDescription from './PlaylistDescription';

const YouTubePlayer = (props) => {
    const { store } = useContext(GlobalStoreContext);

    let currentList = store ? store.currentList : [];
    
    let playlist = currentList ? currentList.songs.map(song => song.youTubeId) : [];
    let currentSongIndex = 0;
    

    const [currentSong, setCurrentSong] = useState(currentList ? currentList.songs[0] : null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [index, setIndex] = useState(currentSongIndex);

    const [iFrame, setIFrame] = useState({});

    const playerOptions = {
        height: '350vh',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSongIndex];
        player.loadVideoById(song);
        player.playVideo();
        
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSongIndex++;
        currentSongIndex = currentSongIndex % playlist.length;
    }

    function onPlayerReady(event) {
        setIFrame(event.target);
        console.log(iFrame);
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");

        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            setCurrentSong(currentList[currentSongIndex]);
            setTitle(currentSong ? currentSong.title : '');
            setArtist(currentSong ? currentSong.artist : '');
            setIndex(currentSongIndex);
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    const handlePrevious = (event) => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = 0;
        }
        console.log(playlist);
        console.log(currentSongIndex);
        setCurrentSong(currentList[currentSongIndex]);
        setTitle(currentSong ? currentSong.title : '');
        setArtist(currentSong ? currentSong.artist : '');
        setIndex(currentSongIndex);
        loadAndPlayCurrentSong(iFrame);

    }

    const handlePlay = (event) => {
        iFrame.playVideo();
    }

    const handlePause = (event) => {
        iFrame.pauseVideo();
    }

    const handleSkip = (event) => {
        currentSongIndex++;
        // if (currentSongIndex > playlist.length - 1) {
        //     currentSongIndex = 0;
        // }
        console.log(currentSongIndex);
        console.log(playlist);
        setCurrentSong(currentList[currentSongIndex]);
        setTitle(currentSong ? currentSong.title : '');
        setArtist(currentSong ? currentSong.artist : '');
        setIndex(currentSongIndex);
        loadAndPlayCurrentSong(iFrame);
    }

    

    return (
        <div>
            <div>
            <YouTube
            videoId={playlist[currentSongIndex]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} 
            
            />
            </div>

            <div>
                <PlaylistDescription 
                song={currentSong}
                title={(currentList && currentList.songs.length > 0) ? currentList.songs[currentSongIndex].title : ''}
                artist={(currentList && currentList.songs.length > 0) ? currentList.songs[currentSongIndex].artist : ''}
                index={index}
                name={currentList ? currentList.name : ''}
                handlePrevious={handlePrevious}
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleSkip={handleSkip}
                />
            </div>
        
        </div>
       
    );
}


export default YouTubePlayer;