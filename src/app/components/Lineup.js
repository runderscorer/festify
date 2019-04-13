import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import forestFooter from '../assets/images/forest_footer.png';
import volcanoFooter from '../assets/images/volcano_footer.png';
import posterHeader from '../assets/images/poster_header.png';
import unholyFooter from '../assets/images/unholy_footer.png';

const getDetails = (timeRange) => {
  switch (timeRange) {
    case 'short_term':
      return {
        header: posterHeader,
        footer: volcanoFooter,
        name: 'Volcanojam'
      }
      break;
    case 'medium_term':
      return {
        header: posterHeader,
        footer: forestFooter,
        name: 'Forestfest'
      }
      break;
    case 'long_term':
      return {
        header: posterHeader,
        footer: unholyFooter,
        name: 'Unholy Space'
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
      header,
      footer,
      name
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
                  <img src={header} />
                  <div className='header-text'>
                    { displayName ? <h3>{displayName}'s</h3> : null }
                    <h1>{ name } { new Date().getFullYear() }</h1>
                  </div>
                </div>

                { groupLineup(artists) }

                <div className='footer'>
                  <img src={footer} />
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