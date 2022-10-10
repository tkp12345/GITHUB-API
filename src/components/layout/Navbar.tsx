import React from 'react';
import {AppBar, Toolbar, styled, Box, InputBase, createTheme,ThemeProvider} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const StyledToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent:"center"
})

const Search = styled("div")(({theme})=>({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius:theme.shape.borderRadius,
  width:"40%",
  margin:"0 20px"
}))

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width:'100%',
  color: '#000',
}));

const Navbar = ({setInputValue}:any) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" >
        <StyledToolbar>
          <GitHubIcon  sx={{display:{xs: "none", sm:"block", fontSize: 30}}}/>
          <Search>
            <StyledInputBase onChange={(e)=>setInputValue(e.target.value)}
                             placeholder="Search Repositories..."/>
          </Search>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;