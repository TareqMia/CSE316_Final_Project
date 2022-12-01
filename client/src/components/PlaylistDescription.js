import React, { useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import GlobalStoreContext from '../store';


const PlaylistDescription = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { song, index, name, title, artist, handlePrevious, handlePlay, handlePause, handleSkip } = props;

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '40vw'}}>
            <div style={{textAlign: 'center'}}>
                <Box>
                    <Typography>Now Playing</Typography>
                </Box>
            </div>

            <div>
                <Typography>Playlist: {name} </Typography>
                <Typography>Song #:  {title !== '' ? index + 1 : ''}</Typography>
                <Typography>Title: {title}</Typography>
                <Typography>Artist: {artist} </Typography>

            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.5rem'}}>
                <Box  sx={{border: 1, width: '20rem', height: '5rem', display: 'flex', justifyContent: 'center', borderRadius: '15px'}}>
                    <IconButton size='large' onClick={handlePrevious}>
                        <FastRewindIcon />
                    </IconButton>
                    <IconButton size='large' onClick={event => handlePlay(event)}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton size='large' onClick={handlePause}>
                        <PauseIcon />
                    </IconButton>
                    <IconButton size='large' onClick={handleSkip}>
                        <FastForwardIcon />
                    </IconButton>

                </Box>

            </div>


        </div>
    );
}



export default PlaylistDescription;