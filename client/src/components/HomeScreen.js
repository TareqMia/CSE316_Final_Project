import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext} from '../store'
import AuthContext from '../auth';
import ListCard from './ListCard.js'
import MenuBar from './MenuBar';
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import MUITabs from './MUITabs';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Box from '@mui/material/Box';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [showPlaylist, setShowPlaylist] = useState([]);
    
    const toggleOpen = (id) => {
        if (showPlaylist.includes(id)) {
            setShowPlaylist(showPlaylist.filter(sid => sid !== id));
        } else {
            console.log(showPlaylist);
            showPlaylist.shift();
            showPlaylist.push(id);
            setShowPlaylist(showPlaylist);
        }
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store && store.screen === 'HOME') {
        listCard = 
            <List sx={{ width: '90%', left: '5%', top:'5%' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        style={{zIndex: '900'}}
                        key={pair._id}
                        idNamePair={pair}
                        selected={store.currentList && store.currentList._id === pair._id}
                        expandPlaylist={showPlaylist}
                        toggleOpen={toggleOpen}
                    />
                ))
            }
            </List>;
    }

    if (store.screen === "ALL_PLAYLISTS" && store.queryResult) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', top:'5%' }}>
            {
                store.queryResult.map((pair) => (
                    <ListCard
                        style={{zIndex: '900'}}
                        key={pair._id}
                        idNamePair={pair}
                        selected={store.currentList && store.currentList._id === pair._id}
                        expandPlaylist={showPlaylist}
                        toggleOpen={toggleOpen}
                    />
                ))
            }
            </List>;

    }
    return (
        <div id="playlister-list-selector">
            <div id='media-playlist'>

                <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                    <MenuBar />
                    <div id='list-selector-list'>
                        {
                            listCard
                        }
                    </div>
                </div>

                <div>
                    <MUITabs />
                </div>
                <MUIDeleteModal />
                { modalJSX }
            </div>

            {store.screen === "HOME" ? 
            <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h3">Your Lists</Typography>
            </div> : 
            <Box id="list-selector-heading">
                <Typography variant="h3">"Search Term"</Typography>
            </Box> }

            
        </div>)
}

export default HomeScreen;