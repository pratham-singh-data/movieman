import React from 'react';

import Navbar from './Navbar';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title title="Movieman" subtitle="Your favourite movie destination" />
      <Navbar />

      {children}
    </div>
  );
};

export default MainPageLayout;
