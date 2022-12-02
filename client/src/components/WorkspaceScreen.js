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
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
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
         <div>
            { editToolbar }
            <Button variant='outlined' onClick={(event) => handleDeleteList(event, store.currentList._id)}>Delete</Button>
            <Button variant='outlined'>Duplicate</Button>
        </div>                     
         
         </Box>
    )
}

export default WorkspaceScreen;

