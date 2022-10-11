import React, { useEffect, useRef, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import RegularList from '../../recycleComponents/list/RegularList';
import RepositoryListItem from '../../recycleComponents/list/RepositoryListItem';
import _LocalStorage from '../../utills/LocalStorage';
import { FAVORITE_TYPE, ISSUE_TYPE } from '../../utills/type';
import { AUTH_FIRST, AUTH_SECOND, AUTH_THIRD } from '../../constants/auth';
import Pagination from '../pagination/pagination';
import IssueListItem from '../../recycleComponents/list/IssueListItem';
import StarsIcon from '@mui/icons-material/Stars';
import { errorHandler } from '../../utills/error';
import FavoriteTab from './Tab/FavoriteTab';
import IssueTab from './Tab/IssueTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
/******************************************************************************************
 * 즐겨찾기 페이지 컴포넌트
 *
 *
 *****************************************************************************************/
const Favorite = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        sx={{
          color: 'yellow',
        }}
        value={selectedTab}
        variant="fullWidth"
        onChange={handleChange}
      >
        <Tab icon={<StarsIcon />} iconPosition="start" label="FAVORITES" />
        <Tab icon={<AdjustOutlinedIcon />} iconPosition="start" label="Issue" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <FavoriteTab/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <IssueTab/>
      </TabPanel>
    </Box>
  );
};

export default Favorite;
