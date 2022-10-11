import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const AntButton = styled(IconButton)({
  color:'#000',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding:'10px 8px',
  backgroundColor: '#ffffff',
  borderColor:'transparent',
  '&:hover': {
    // backgroundColor: '#0069d9',
    borderColor:'transparent',
    boxShadow: 'none',
  },
  '&:active': {
  },
  '&:focus': {
    color: 'rgb(255,215,0)'
  },
  '&:select': {
    color: 'rgb(255,215,0)',
  },
});