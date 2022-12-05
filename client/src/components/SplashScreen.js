import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../auth";

export default function SplashScreen () {
  const { auth } = useContext(AuthContext);
  return (

    <div id='splash-screen' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{width: '30vw', display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <Typography variant="h2">Welcome to</Typography>
          <img src="playlister.png"
          style={{
            "width": "300px",
            "height": "100px",
            "justify-content": "left"
          }}
          />
           <Typography variant="h6" 
          gutterBottom 
          justifyContent='center' 
          textAlign='left'
          width='90%'
          color='black'
          >
            This app allows you to create, view, edit, share, and publish YouTube Music Video playlists. 
            Create your own playlists, share with friends and view theirs as well.  
          </Typography>

          <Box>
             <Typography color='black'>Tareq Mia | Fall 2022</Typography>
          </Box>

        </div>

    
        <div style={{display: 'flex', 'flexDirection': 'column', gap: '10px'}}>
          <Button size="large" variant='outlined' alignSelf='flex-start'>
                    <Link to='/login/' style={{ textDecoration: 'none' }}>
                      Log In
                    </Link> 
          </Button>
                
          <Button size="large" variant='outlined'>
              <Link to='/register/' style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
          </Button>

          <Button size="large" variant='outlined' onClick={() => auth.loginGuest()}>
            <Link to='/loginguest' style={{ textDecoration: 'none' }}>Continue as Guest</Link>
            
          </Button>
        </div>
    </div>

    // <Box id='splash-screen' display='flex' justifyContent='space-between' flexDirection='row' alignItems='center'>

    //       <Box alignItems='left' 
    //         display='flex' 
    //         flexDirection='column' 
    //         width='340px'
    //         justifyContent='center'
            
    //         >
    //         <Typography variant="h2" gutterBottom
    //           color='black'
    //         >
    //           Welcome to
    //       </Typography>
    //       <img src="playlister.png"
    //       style={{
    //         "width": "300px",
    //         "height": "100px",
    //         "justify-content": "left"
    //       }}
    //       />
    //       <Typography variant="h6" 
    //       gutterBottom 
    //       justifyContent='center' 
    //       textAlign='left'
    //       // width='40%'
    //       color='black'
    //       >
    //         This app allows you to create, view, edit, share, and publish YouTube Music Video playlists. 
    //         Create your own playlists, share with friends and view theirs as well.  
    //       </Typography>
    //       </Box>

    //       <Box alignSelf='flex-end'>
    //         <Typography color='black'>Tareq Mia | Fall 2022</Typography>
    //       </Box>

    //       <Box display='flex' flexDirection='column' alignSelf='center' width='25%' justifyContent='space-between'>
    //         <Box justifyContent='space-between'>
    //           <Button size="large" variant='outlined' alignSelf='flex-start'>
    //             <Link to='/login/' style={{ textDecoration: 'none' }}>
    //               Log In
    //             </Link> 
    //           </Button>
              
    //           <Button size="large" variant='outlined'>
    //           <Link to='/register/' style={{ textDecoration: 'none' }}>
    //               Sign Up
    //             </Link>
    //           </Button>
    //           <Button size="large" variant='outlined'>Continue as Guest</Button>
    //         </Box>
    //       </Box>   
    // </Box>
  );
}


