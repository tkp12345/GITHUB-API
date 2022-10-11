import React, { SetStateAction } from 'react';
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  InputBase,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { darkTheme, Search, StyledToolbar } from '../style/RecycleStyle';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: '#000',
}));

const Navbar = ({ setInputValue }: SetStateAction<any>) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <StyledToolbar>
          <GitHubIcon
            sx={{ display: { xs: 'none', sm: 'block', fontSize: 30 } }}
          />
          <Search>
            <StyledInputBase
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Repositories..."
            />
          </Search>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
