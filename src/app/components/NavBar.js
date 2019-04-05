import React, { Component } from 'react';
import festifyLogo from '../assets/images/festify_logo.png';

const NavBar = () => (
  <div className='navbar'>
    <img src={festifyLogo} />
    <ul className='links'>
      <li>Home</li>
      <li>About</li>
    </ul>
  </div>
)

export default NavBar