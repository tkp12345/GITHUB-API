import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';


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

const Favorite = () => {
  console.log('Favorite')
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(selectedTab);
  };
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs orientation="vertical"  value={selectedTab}   variant="fullWidth" onChange={handleChange}>
        <Tab icon={<BookOutlinedIcon/>} iconPosition="start" label="Repository" />
        <Tab icon={<AdjustOutlinedIcon/>} iconPosition="start" label="Issue"  />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
    </Box>
    // {/*//     <Stack direction="row" spacing={2} justifyContent="space-between">*/}
    // {/*//     <Sidebar/>*/}
    // {/*//     <Contents/>*/}
    // {/*// </Stack>*/}
  );
};

export default Favorite;