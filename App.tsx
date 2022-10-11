import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './src/components/layout/Navbar';
import TabBar from './src/components/layout/TabBar';

const App = () => {

  const [inputValue, setInputValue] = useState('')

  return (
    <div>
        <Route
          path="/"
          render={(history)=>(
            <Box>
              <Navbar setInputValue={setInputValue}/>
              <TabBar inputValue={inputValue} history={history}/>
            </Box>
          )}
        />

    </div>
  );
};

export default App;