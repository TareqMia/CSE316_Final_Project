import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CommentsSection from './CommentsSection';
import YouTubePlayer from './YouTubePlayer';
import GlobalStoreContext from '../store';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MUITabs() {
  const [value, setValue] = React.useState(0);
  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '40vw'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{height: "63px"}}>
          <Tab label="YouTube Player" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
           {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
            {/* <YouTubePlayerExample /> */}
            <YouTubePlayer />
            {/* <PlaylistDescription /> */}
            {/* </div> */}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{width: '39vw'}}>
        <div style={{backgroundColor: 'beige'}}>
          {store.currentList ? <CommentsSection /> : null}
        </div>
      </TabPanel>
    </Box>
  );
}