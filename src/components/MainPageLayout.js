import React from 'react';

import Navbar from './Navbar';
import Title from './Title';

const MainPageLayout = ({children}) => {
  return (
    <div>
        <Title title="Movieman" subtitle="Your favourite movie destinaion"/>
      <Navbar/>

      {children}
    </div>
  );
}

export default MainPageLayout;
