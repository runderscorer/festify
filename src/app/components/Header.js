import React from 'react';
import LoginButton from './LoginButton';
import Navigation from './Navigation';

export default class Header extends React.Component {
  renderHeader() {
    const { username } = this.props;

    if (username) {
      return (
        <Navigation username={username} />
      )
    } else {
      return (
        <LoginButton />
      )
    }
  }

  render() {
    return (
      this.renderHeader()
    )
  }
}
