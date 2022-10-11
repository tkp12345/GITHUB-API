import styled from 'styled-components';
import { createTheme, InputBase, Tabs, Toolbar } from '@mui/material';

export const RowDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const SpanText = styled.div`
  padding: 0px 8px;
`;

export const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vw;
  font-size: 4vw;
  font-weight: bold;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Ul_flex = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
});

export const Search = styled('div')(() => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: '6px',
  width: '40%',
  margin: '0 20px',
}));

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: '#000',
}));

export const AntTabs = styled(Tabs)({
  background: 'rgba(128, 128, 128, 0.075) ',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .Mui-selected': {
    fontSize: 18,
    fontWeight: 'bold',
    borderRight: '2px solid rgba(0, 0, 0, 0.274)',
    borderLeft: '2px solid rgba(0, 0, 0, 0.274)',
    borderTop: '2px solid rgba(0, 0, 0, 0.274)',
    backgroundColor: '#fff',
  },
});
