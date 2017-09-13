import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginButton from './LoginButton';
import { getUserInfo } from '../helpers/spotify.js';

export default class Dashboard extends React.Component {
  renderDashboard() {
    const { username } = this.props;

    if (username) {
      return (
        <nav>
          <NavLink to='/'>Welcome, {username}</NavLink>
          <NavLink to='/top-tracks'>Top Tracks</NavLink>
          <NavLink to='/top-artists'>Top Artists</NavLink>
        </nav>
      )
    } else {
      return (
        <LoginButton />
      )
    }
  }

  render() {
    return (
      this.renderDashboard()
    )
  }
}
