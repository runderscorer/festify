import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const getDetails = (timeRange) => {
  const displayGuestFooter = window.sessionStorage.getItem('referrer') === 'npo3fm';

  if (displayGuestFooter) {
    return {
      name: 'NPO 3FM LINE-UP',
      headerClassName: 'guest-header-text',
      footerClassName: 'guest-footer'
    }
  }

  switch (timeRange) {
    case 'short_term':
      return {
        name: 'Volcanojam',
        headerClassName: 'header-text',
        footerClassName: 'volcano-jam'
      }
      break;
    case 'medium_term':
      return {
        name: 'Forestfest',
        headerClassName: 'header-text',
        footerClassName: 'forrestfest'
      }
      break;
    case 'long_term':
      return {
        name: 'Unholy Space',
        headerClassName: 'header-text',
        footerClassName: 'unholy-space'
      }
      break;
    default:
      null
  }
}

const groupLineup = (artists) => {
  const [
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    ...rest
  ] = artists;

  if (artists.length) {
    return (
      <div className='acts'>
        <div className='headliner'>{first}</div>
        <div className='co_headliner'>
          <span>{second}</span>
          <span>{third}</span>
        </div>
        <div className='top_bill'>
          <span>{fourth}</span>
          <span>{fifth}</span>
          <span>{sixth}</span>
        </div>
        <div className='supporting'>
          { rest.map(artist => <span key={artist}>{artist}</span>) }
        </div>
      </div>
    )
  }
}

export default class Lineup extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { name } = getDetails(this.props.timeRange);
    const node = document.getElementById('poster-layout');

    const blob = await domtoimage.toBlob(node);
    saveAs(blob, `${name}.png`)
  }

  render() {
    const { 
      artists, 
      clickHandler, 
      displayName,
      timeRange 
    } = this.props;

    const { 
      name,
      headerClassName,
      footerClassName
    } = getDetails(timeRange);

    return (
      <div className='lineup'>
        <div className='poster-container'>
          <div className='poster-sections'>
            <div className='close'>
              <h1 onClick={clickHandler}>X</h1>
            </div>

            <div id='poster'>
              <div id='poster-layout'>
                <div className='header'>
                  <div className='spotify-logo' />
                  <div className={headerClassName}>
                    { displayName ? <h3>{displayName}'s</h3> : null }
                    <h1>{ name } { new Date().getFullYear() }</h1>
                  </div>
                </div>

                { groupLineup(artists) }

                <div className={`footer ${footerClassName === 'guest-footer' ? 'guest-footer-container' : ''}`}>
                  <div className={footerClassName}>
                  </div>
                </div>
              </div>
            </div>

            <div className='download'>
              <a className='download-btn' onClick={this.handleClick}>Download</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}