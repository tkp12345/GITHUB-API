import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material';
import React from 'react';

export function AntCircularProgress(props: CircularProgressProps) {
  const size = 130;
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={size}
        thickness={4}
        {...props}
        value={130}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#000' : '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={size}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
