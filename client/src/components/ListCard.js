import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    let isPublished = idNamePair.published;
    let date = new Date(idNamePair.publishedOn);
    const month = date.toLocaleString('default', { month: 'long' }).substring(0, 3);

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

    async function handleDeleteList(event) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(_id);
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
    let cardElement = 
        <ListItem
            disableRipple
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '30pt', margin: '10px', padding: '20px', borderRadius: '25px', backgroundColor:'white'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id);
            }}
            onDoubleClick={(event) => handleToggleEdit(event,  idNamePair._id)}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>
                <Box style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', alignItems: 'center'}}>
                    <div style={{'display': 'flex', 'flexDirection':'column', 'justifyContent': 'space-between'}}>
                        <Typography style={{fontSize:'25pt'}}>
                            {idNamePair.name}
                        </Typography> 
                        {isPublished  ? 
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                                <Typography style={{ marginTop:'10px'}}>
                                        {`By: ${idNamePair.publishedBy}`}
                                </Typography>
                                <Typography style={{ marginTop:'10px'}} color='green'>
                                    {`Published: ${month} ${date.getDay()}, ${date.getFullYear()}`}
                                </Typography>
                            </div>
                        </div>
                        : null }
                    </div>

                    {isPublished ?  
                    <div style={{display: 'flex',  flexDirection:'column', alignItems: 'center', gap: '10px'}}>
                         <div style={{display: 'flex', gap: '15px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <IconButton fullWidth={false} style={{ backgroundColor: 'transparent', }}>
                                        <ThumbUpOffAltIcon size='large' fullWidth={false} />
                                </IconButton>
                                <Typography>{idNamePair.numberOfLikes}</Typography>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <IconButton fullWidth={false} style={{ backgroundColor: 'transparent', }}>
                                        <ThumbDownOffAltIcon size='large' fullWidth={false} />
                                </IconButton>
                                <Typography>{idNamePair.numberOfLikes}</Typography>
                            </div>      
                        </div>
                        <div>
                            <Typography>{`Listens:  ${idNamePair.numberOfListens}`}</Typography>
                        </div>
                    </div>
                    : null}

                    <IconButton fullWidth={false} style={{ backgroundColor: 'transparent' }}>
                        <ExpandMoreIcon size='large' fullWidth={false} />
                    </IconButton>
                </Box>
               
            </Box>




            {/* 
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box> */}
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