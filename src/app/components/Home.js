import React, { Component } from 'react';
import LoginButton from './LoginButton';
import homepageIcons from '../assets/images/homepage_icons.png';

export default class Home extends Component {
  componentWillMount() {
    this.props.setBackgroundColor('blue');
  }

  render() {
    return (
      <div className='home'>
        <div className='container'>
          <div className='welcome'>
            <div className='text-header'>
              <h1>Whoa.</h1>
              <h1>Hello music lover!</h1>
            </div>

            <div className='cta'>
              <p>Are you ready to turn your favorite Spotify artists into a music festival line-up?</p>
            </div>
          </div>

          <div>
            <LoginButton />
          </div>

          <div className='bottom-banner'>
            <img src={homepageIcons} />
          </div>
        </div>
      </div>
    )
  }
}