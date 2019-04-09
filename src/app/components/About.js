import React, { Component } from 'react';
import aboutRick from '../assets/images/about_rick.png';
import aboutTony from '../assets/images/about_tony.png';
import vaseImg from '../assets/images/about_1.png'; 

export default class About extends Component {
  componentWillMount() {
    this.props.setBackgroundColor('blue');
  }

  render() {
    return (
      <div>
        <h1 className='about-header'>About</h1>
        <div className='about'>
          <div className='about-text'>
            <div>
              <p>Festify takes your most listened to Spotify artists and creates a visual line-up so you can share with your friends. Rick started this project in 2017, to play with the Spotify API. Tony then redesigned the app and cranked the whimsy to 11.</p>
            </div>

            <div className='section'>
              <div>
                <p>Festify is not affiliated with Spotify. The site is built on React, Express, the Spotify API, whimsical illustrations, and friendship.</p>
                <p>Why are you reading this? You must be bored. Go listen to more music.</p>
              </div>

              <div>
                <img src={vaseImg} />
              </div>
            </div>
          </div>

          <div className='team'>
            <h3>Team</h3>
            <div className='bio'>
              <div className='image'>
                <img src={aboutRick} />
              </div>
              <div>
                <div className='contact'>
                  <h3>Rick Rieta</h3>
                  <p>rickrieta@gmail.com</p>
                </div>

                <div className='blurb'>
                  <p>Hello, I used to eat a lot canned ravioli. My favorite style of music is whatever genre has the most hyphens in the name. Tony is my best friend.</p>
                </div>
              </div> 
            </div>

            <div className='bio'>
              <div className='image'>
              <img src={aboutTony} />
              </div>
              <div>
                <div className='contact'>
                  <h3>Tony Bui</h3>
                  <p>tonybui@tonybuifanclub.com</p>
                </div>

                <div className='blurb'>
                  <p>Hi, I am currently working as a freelance illustrator. I took an online UX course and decided to turn Rick's idea into my first class project. I like to buy Q-Tips and Flonase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

