import { StrictMode, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth';
import EditToolbar from './EditToolbar.js';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PublishIcon from '@mui/icons-material/Publish';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { setPublished } = props;
    store.history = useHistory();  



    const handleDeleteList = async (event, id) => {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }


    let editToolbar = "";
    if (auth.loggedIn && store.currentList && !store.currentList.published) {
        editToolbar = <EditToolbar />;
    }

    if (!store.currentList) {
        return null;
    }

    const handlePublish = () => {
        if (auth.loggedIn) {
            store.publishPlaylist();
            setPublished(true);
        }
    }
    
    return (
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}

        >   
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        style={{zIndex: '10'}}
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>
         <div style={{display: 'flex', flexDirection: 'row'}}>
            
                <IconButton style={{display: 'flex', flexDirection: 'column'}}>
                    <DeleteIcon style={{height: '30px'}} onClick={(event) => handleDeleteList(event, store.currentList._id)} />
                    <div style={{fontSize: '10px'}}>Delete</div>   
                </IconButton>

                <IconButton style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <FileCopyIcon />
                    <div style={{fontSize: '10px'}}>Duplicate</div> 
                </IconButton>
                
                {!store.currentList.published ? 
                
                <IconButton style={{display: 'flex', flexDirection: 'column', gap: '5px'}}
                onClick={handlePublish}
                >
                    <PublishIcon />
                    <div style={{fontSize: '10px'}}>Publish</div> 
                </IconButton> : null }
                <Box style={{width: '20%'}}></Box>
                { editToolbar }
         
            
        </div>                     
         
         </Box>
    )
}

export default WorkspaceScreen;

