import React, { SetStateAction, useState } from 'react';
import { Tab } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import Repository from '../repository/Repository';
import Favorite from '../favorite/Favorite';
import { AntTabs } from '../style/RecycleStyle';

const TabBar = ({ inputValue }: SetStateAction<any>) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <AntTabs value={selectedTab} variant="fullWidth" onChange={handleChange}>
        <Tab icon={<BookOutlinedIcon />} iconPosition="start" label="Repository" />
        <Tab icon={<StarsIcon />} iconPosition="start" label="Favorites" />
      </AntTabs>
      {selectedTab === 0 && <Repository inputValue={inputValue} />}
      {selectedTab === 1 && <Favorite />}
    </>
  );
};

export default TabBar;
