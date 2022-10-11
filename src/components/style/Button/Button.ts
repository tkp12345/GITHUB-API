import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { SELECT_YELLOW } from '../color';

export const AntButton = styled(IconButton)<{ selected?: any }>`
  color:${(props) => props.selected && SELECT_YELLOW};
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '10px 8px',
  backgroundColor: '#ffffff',
  borderColor: 'transparent',
  '&:hover': {
    borderColor: 'transparent',
    boxShadow: 'none',
    color: SELECT_YELLOW,
  },
  '&:active': {},
  '&:focus': {
    color: SELECT_YELLOW,
  },
  '&:select': {
    color: SELECT_YELLOW,
  }
`;
