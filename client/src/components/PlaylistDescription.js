import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';





const PlaylistDescription = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '40vw'}}>
            <div style={{textAlign: 'center'}}>
                <Box>
                    <Typography>Now Playing</Typography>
                </Box>
            </div>

            <div>
                <Typography>Playlist:  </Typography>
                <Typography>Song #:   </Typography>
                <Typography>Title: </Typography>
                <Typography>Artist:  </Typography>

            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.5rem'}}>
                <Box  sx={{border: 1, width: '20rem', height: '5rem', display: 'flex', justifyContent: 'center', borderRadius: '15px'}}>
                    <IconButton size='large'>
                        <FastRewindIcon />
                    </IconButton>
                    <IconButton size='large'>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton size='large'>
                        <PauseIcon />
                    </IconButton>
                    <IconButton size='large'>
                        <FastForwardIcon />
                    </IconButton>

                </Box>

            </div>


        </div>
    );
}



export default PlaylistDescription;