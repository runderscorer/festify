import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const Navigation = ({ clickHandler }) => {
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

Navigation.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default Navigation;
