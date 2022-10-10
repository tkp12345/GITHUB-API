import React from 'react';
import {Box} from "@mui/material";

const Contents = (children:any) => {
  return (
    <Box bgcolor="lightyellow" flex={4}>
      {children}
    </Box>
  );
};

export default Contents;