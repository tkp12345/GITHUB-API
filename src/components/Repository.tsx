import React from 'react';
import Contents from './Layout/Contents';
import { Stack } from '@mui/material';

const Repository = () => {
  console.log('Repository')

  return (
    <Stack direction="row" >
      <Contents/>
    </Stack>
  );
};

export default Repository;