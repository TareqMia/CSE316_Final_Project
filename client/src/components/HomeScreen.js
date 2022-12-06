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

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let text = typeof(store.searchText) === 'undefined' ? "Playlists" : store.searchText + " Playlists"

    useEffect(() => {
        if (auth.guest) {
            store.loadAllPlaylists();
        }
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
                    />
                ))
            }
            </List>;
    }

    if ((store.screen === "ALL_PLAYLISTS" || store.screen === 'USER') && store.queryResult) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', top:'5%' }}>
            {
                store.queryResult.map((pair) => (
                    <ListCard
                        style={{zIndex: '900'}}
                        key={pair._id}
                        idNamePair={pair}
                        selected={store.currentList && store.currentList._id === pair._id}
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
                    style={{scale: '0.9'}}
                >
                    <AddIcon />
                </Fab>
                <Typography fontSize={'45px'} variant="h3">Your Lists</Typography>
            </div> : 
            <Box id="list-selector-heading">
                <Typography variant="h3" fontSize={'45px'}>{text}</Typography>
            </Box> }

            
        </div>)
}

export default HomeScreen;