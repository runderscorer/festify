import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const { username } = props;

  return (
    <nav>
      <NavLink exact to='/'>Welcome, {username}</NavLink>
      <NavLink to='/top-tracks'>Top Tracks</NavLink>
      <NavLink to='/top-artists'>Top Artists</NavLink>
      <a href='/log-out'>Log Out</a>
    </nav>
  )
};

export default Navigation;
