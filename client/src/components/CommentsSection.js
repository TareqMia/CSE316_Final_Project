import React, { useContext, useState } from 'react';
import { Box, TextField, List } from '@mui/material';
import Comment from './Comment';

import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';



const CommentsSection = () => {

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState('');

    let currentList = store.currentList ? store.currentList : null;
 
    let renderedList = null;

    if (currentList && currentList.comments) {
       
        renderedList = currentList.comments.map(comment => {
            return <Comment userName={comment.user} comment={comment.comment}/>
        })
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            store.addNewComment(text);
            setText('');
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (event.code === "Enter") {
            setText('');
        }
       
    } 

    return( 
    
        <div>
            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{overflowY: 'scroll', maxHeight: '60vh', height: '60vh'}}>
                    <List style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        {
                            renderedList
                        }
                    </List> 
                </div>
               
                <form onSubmit={handleSubmit}>
                    <TextField disabled={!store.currentList.published || !auth.loggedIn} value={text} onKeyPress={handleKeyPress} onChange={(event) => setText(event.target.value)} style={{width: '100%'}} label='Add Comment' variant='filled'/>
                </form>
                
            </Box>


        </div>
    );
}


export default CommentsSection;