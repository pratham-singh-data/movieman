import React from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './Navbar.styled';

const links = [
  { to: '/', text: 'Home Page', key: 1 },
  { to: '/starred', text: 'Starred Page', key: 2 },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {links.map(item => (
          <li key={item.key}>
            <LinkStyled
              className={item.to === location.pathname ? 'active' : ''}
              to={item.to}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navbar;
