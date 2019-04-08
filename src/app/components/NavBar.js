import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import festifyLogo from '../assets/images/festify_logo.png';

const NavBar = ({ loggedIn }) => (
  <div className='navbar'>
    <img src={festifyLogo} />
    <div className='links'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      { loggedIn ? <a href='/log-out'>Log Out</a> : null }
    </div>
  </div>
)

export default NavBar