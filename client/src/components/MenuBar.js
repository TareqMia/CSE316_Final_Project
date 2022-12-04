import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import FilterListIcon from '@mui/icons-material/FilterList';
import GlobalStoreContext from '../store';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MenuBar() {
  const { store } = React.useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const sortType = {
    NAME: 'name',
    DATE: 'date',
    LIKES: 'likes',
    DISLIKES: 'dislikes',
    LISTENS: 'listens'
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sortLists = (type) => {
    store.sortLists(type);
    handleMenuClose()
  }

  const handleAllUsersClicked = (event) => {
    store.loadAllPlaylists();
  }

  const handleHomeClicked = (event) => {
    store.loadOwnedPlaylists();
  }

  const handleUserClicked = (event) => {
    store.loadUserPlaylists()
  }

  const homeButton = store.screen === 'HOME' ? 
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <HomeIcon onClick={handleHomeClicked} />
          </IconButton> 
              :
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <HomeOutlinedIcon onClick={handleHomeClicked} />
          </IconButton>;
          
  const allUsersButton = store.screen === 'ALL_PLAYLISTS' ? 
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <GroupIcon onClick={handleAllUsersClicked} />
          </IconButton> 
              :
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <GroupOutlinedIcon onClick={handleAllUsersClicked} />
          </IconButton>;

const userButton = store.screen === 'USER' ? 
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <PersonIcon onClick={handleUserClicked} />
          </IconButton> 
              :
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <PersonOutlineIcon onClick={handleUserClicked} />
          </IconButton>;

  

              
              

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => sortLists(sortType.NAME)}>Name (A-Z)</MenuItem>
      <MenuItem onClick={() => sortLists(sortType.DATE)}>Publish Date (Newest)</MenuItem>
      <MenuItem onClick={() => sortLists(sortType.LISTENS)}>Listens (High - Low)</MenuItem>
      <MenuItem onClick={() => sortLists(sortType.LIKES)}>Likes (High - Low)</MenuItem>
      <MenuItem onClick={() => sortLists(sortType.DISLIKES)}>Dislikes (High - Low)</MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          { homeButton }
          { allUsersButton }
          { userButton }
          <Search style={{width: '50%'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              disabled={store.screen === 'HOME'}
              style={{width: '20vw'}}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }}/>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <FilterListIcon />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}