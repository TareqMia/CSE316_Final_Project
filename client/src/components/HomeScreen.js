import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MenuBar from './MenuBar';
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import MUITabs from './MUITabs';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [showPlaylist, setShowPlaylist] = useState([]);

    const toggleOpen = (id) => {
        if (showPlaylist.includes(id)) {
            setShowPlaylist(showPlaylist.filter(sid => sid != id));
        } else {
            showPlaylist.shift();
            showPlaylist.push(id);
            setShowPlaylist(showPlaylist);
        }
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', top:'5%' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
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
                
            </div>

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
                </div>
            <MUIDeleteModal />
        </div>)
}

export default HomeScreen;