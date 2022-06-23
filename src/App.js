import React from 'react';
import {Switch, Route} from "react-router-dom";

import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

function App() {
  return (
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/starred" exact><Starred/></Route>
        <Route path="/show/:id" exact><Show/></Route>
        <Route>Page Not Found</Route>
      </Switch>
  );
}

export default App;
