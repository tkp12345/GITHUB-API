import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Box} from "@mui/material";
import Navbar from './src/components/layout/Navbar';
import TabBar from './src/components/layout/TabBar';



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route
          path="/"
          render={(history)=>(
            <Box>
              <Navbar/>
              <TabBar history={history}/>
              {/*<Stack direction="row" spacing={2} justifyContent="space-between">*/}
              {/*    <Sidebar/>*/}
              {/*    <Contents/>*/}
              {/*</Stack>*/}
            </Box>
          )}
        />

      </BrowserRouter>
    </div>
  );
};

export default App;