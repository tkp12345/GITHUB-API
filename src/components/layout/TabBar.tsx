import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import styled from '@emotion/styled';
import Repository from '../Repository';
import Favorite from '../Favorite';

const TabBar = (history:any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event:any, newValue:any) => {
    setSelectedTab(newValue);
  };

  const AntTabs = styled(Tabs)({
    background:'rgba(128, 128, 128, 0.075) ',
    '& .MuiTabs-indicator': {
      display: "none",
    },
    "& .Mui-selected": {
      fontSize: 18,
      fontWeight:'bold',
      borderRight: '2px solid rgba(0, 0, 0, 0.274)',
      borderLeft: '2px solid rgba(0, 0, 0, 0.274)',
      borderTop: '2px solid rgba(0, 0, 0, 0.274)',
      backgroundColor: '#fff',
    }
  });

  const routes = ["/repository","/favorites"]

  return (
    <>
      <AntTabs value={selectedTab}   variant="fullWidth" onChange={handleChange}>
        <Tab icon={<BookOutlinedIcon/>} iconPosition="start" label="Repository" />
        <Tab icon={<StarsIcon/>} iconPosition="start" label="Favorites"  />
      </AntTabs>
      {selectedTab === 0 && <Repository/>}
      {selectedTab === 1 && <Favorite/>}
    </>
  );
};

export default TabBar;