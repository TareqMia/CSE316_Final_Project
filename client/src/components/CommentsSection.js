import React from 'react';
import { Box, TextField, List } from '@mui/material';
import Comment from './Comment';



const CommentsSection = () => {
    return( 
    
        <div>
            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{overflowY: 'scroll', maxHeight: '60vh', height: '60vh'}}>
                <List style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />
                <Comment userName={'tmia'} comment={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"} />

                </List> 
                </div>
               
                
                <TextField style={{width: '100%'}} label='Add Comment' variant='filled'/>
            </Box>


        </div>
    );
}


export default CommentsSection;