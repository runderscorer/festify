import React from 'react';

export default class MobileLogout extends React.Component {
  render() {

    return (
      <div className='mobile-logout'>
        <a href='/api/log-out'>Log Out</a>
      </div>
    );
  }
};