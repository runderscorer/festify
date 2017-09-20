import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const { clickHandler } = props;

  return (
    <nav>
      <div>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to='/top-tracks'>Top Tracks</NavLink>
        <NavLink to='/top-artists'>Top Artists</NavLink>
      </div>
      <div className='log-out'>
        <Link to='/' onClick={clickHandler}>Log Out</Link>
      </div>
    </nav>
  )
};

export default Navigation;
