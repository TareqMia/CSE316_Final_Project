import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import SongCard from './SongCard';
import WorkspaceScreen from './WorkspaceScreen';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected} = props;
    const [likes, setLikes] = useState(idNamePair.numberOfLikes.length);
    const [dislikes, setDislikes] = useState(idNamePair.numberOfDislikes.length);
    const [liked, setLiked] = useState(!auth.guest ? idNamePair.numberOfLikes.includes(auth.user.email): 0);
    const [disliked, setDisliked] = useState(!auth.guest ? idNamePair.numberOfDislikes.includes(auth.user.email) : 0);
    const [published, setPublished] = useState(idNamePair.published);
    const [expanded, setExpanded] = useState(false);


    let date = new Date(idNamePair.publishedOn).toDateString();

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
        console.log(store.currentList.published);
        if (store.currentList && !store.currentList.published) {
            toggleEdit();
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    const handleLikePlaylist = () => {
        let newLikes = store.handleLike();

        if (!idNamePair.numberOfLikes.includes(auth.user.email)) {
            setLiked(true);
        }
        setLikes(newLikes);
    }

    const handleDislikePlaylist = () => {
        let newDislikes = store.handleDislike();
        
        if (!idNamePair.numberOfDislikes.includes(auth.user.email)) {
            setDisliked(true);
        }
        setDislikes(newDislikes);
    }

    const handleExpandChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if (store.currentList) {
           if (idNamePair._id === store.currentList._id) {
                store.closeCurrentList()
           }
           else if (idNamePair._id !== store.currentList._id) {
                store.setCurrentList(idNamePair._id);
           }
        }
        else {
            store.setCurrentList(idNamePair._id)
        }
    }

    let expand = store.currentList && store.currentList._id === idNamePair._id;

    let playlistLiked = liked ? 
        <ThumbUpIcon disabled={auth.guest} size='large' fullWidth={false} /> : <ThumbUpOffAltIcon disabled={auth.guest} size='large' fullWidth={false} />;
    
    let playlistDisliked = disliked ? 
        <ThumbDownIcon disabled={auth.guest} size='large' fullWidth={false} /> : <ThumbDownOffAltIcon disabled={auth.guest} size='large' fullWidth={false} />;

    let color =  selected ? '#c1c3c7' : 'white';

    let cardElement = 
        <ListItem
            disableRipple
            className={selectClass}
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                width: '100%', 
                fontSize: '30pt', 
                margin: '10px', 
                padding: '20px', 
                borderRadius: '25px',
                backgroundColor:'white', 
                zIndex: '5',
                backgroundColor: `${color}`
            }}
            button
            onDoubleClick={(event) => handleToggleEdit(event,  idNamePair._id)}
        >
            <Box sx={{ p: 1, flexGrow: 1, borderRadius: '25px'}} style={{backgroundColor:`${color}`}}>
                <Box style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', alignItems: 'center'}}
                onClick={(event) => {   
                        handleLoadList(event, idNamePair._id);
                }}
                >
                    <div style={{'display': 'flex', 'flexDirection':'column', 'justifyContent': 'space-between'}}
                    
                    >
                        <Typography style={{fontSize:'25pt'}}
                        >
                            {idNamePair.name}
                        </Typography> 
                        {published  ? 
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                                <Typography style={{ marginTop:'10px'}}>
                                        {`By: ${idNamePair.publishedBy}`}
                                </Typography>
                                <Typography style={{ marginTop:'10px'}} color='green'>
                                    {`Published: ${date}`}
                                </Typography>
                            </div>
                        </div>
                        : null }
                    </div>
                    <Box style={{width: '20%'}}></Box>

                    {published ?  
                    <div style={{display: 'flex',  flexDirection:'column', alignItems: 'center', gap: '10px'}}>
                         <div style={{display: 'flex', gap: '15px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <IconButton fullWidth={false} style={{ backgroundColor: 'transparent', }}
                                onClick={handleLikePlaylist}
                                >
                                        { playlistLiked }
                                </IconButton>
                                <Typography>{likes}</Typography>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <IconButton fullWidth={false} style={{ backgroundColor: 'transparent', }}
                                onClick={handleDislikePlaylist}
                                >
                                        { playlistDisliked }
                                </IconButton>
                                <Typography>{dislikes}</Typography>
                            </div>      
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <Typography>{`Listens:  ${idNamePair.numberOfListens}`}</Typography>
                        </div>
                    </div>
                    : null}
                </Box>
                <Accordion elevation={0}
                    expanded={expand}
                    style={{backgroundColor: color}}  
                    sx={{
                        '&:before': {
                            display: 'none',
                        }
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={handleExpandChange('panel' + idNamePair._id)} />}
                    >
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <WorkspaceScreen setPublished={setPublished} className='workspace' />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </ListItem>
        

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;