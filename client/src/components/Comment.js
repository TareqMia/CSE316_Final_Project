import React from 'react';
import { Box } from '@mui/material';

const Comment = (props) => {
    let  { userName, comment } = props;

    return (
        <div>
            <Box border={1} 
            style={{
                borderRadius: '15px', 
                width: '95%', 
                display:'flex', 
                flexDirection:'column',
                margin: '10px', 
                backgroundColor: 'white'
                
            }}>
                <div style={{marginLeft: '1em'}}>{userName}</div>
                <div style={{marginLeft: '1em'}} >{comment}</div>   
            </Box>
        </div> 
    );
}

export default Comment;



    