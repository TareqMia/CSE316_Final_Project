import React, { useContext } from 'react';
import { Box, TextField, List } from '@mui/material';
import Comment from './Comment';

import { GlobalStoreContext } from '../store';



const CommentsSection = () => {

    const { store } = useContext(GlobalStoreContext);

    let currentList = store.currentList ? store.currentList : null;
 
    let renderedList = null;

    if (currentList && currentList.comments) {
       
        renderedList = currentList.comments.map(comment => {
            return <Comment userName={comment.user} comment={comment.comment}/>
        })
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
               
                
                <TextField style={{width: '100%'}} label='Add Comment' variant='filled'/>
            </Box>


        </div>
    );
}


export default CommentsSection;