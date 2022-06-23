import React from 'react';
import {Switch, Route} from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact><Home/></Route>
          <Route path="/starred" exact><Starred/></Route>
          <Route path="/show/:id" exact><Show/></Route>
          <Route>Page Not Found</Route>
        </Switch>
      </ThemeProvider>
  );
}

export default App;
