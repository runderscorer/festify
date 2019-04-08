import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import festifyLogo from '../assets/images/festify_logo.png';

const NavBar = () => (
  <div className='navbar'>
    <img src={festifyLogo} />
    <div className='links'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </div>
  </div>
)

export default NavBar