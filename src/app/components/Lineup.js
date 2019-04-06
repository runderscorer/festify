import React from 'react';
import forestHeader from '../assets/images/forest_header.png';
import forestFooter from '../assets/images/forest_footer.png';
import volcanoHeader from '../assets/images/volcano_header.png';
import volcanoFooter from '../assets/images/volcano_footer.png';
import unholyHeader from '../assets/images/unholy_header.png';
import unholyFooter from '../assets/images/unholy_footer.png';

const getDetails = (timeRange) => {
  switch (timeRange) {
    case 'short_term':
      return {
        header: volcanoHeader,
        footer: volcanoFooter,
        name: 'Volcanojam'
      }
      break;
    case 'medium_term':
      return {
        header: forestHeader,
        footer: forestFooter,
        name: 'Forestfest'
      }
      break;
    case 'long_term':
      return {
        header: unholyHeader,
        footer: unholyFooter,
        name: 'Unholy Space'
      }
      break;
    default:
      null
  }
}

const Lineup = (props) => {
  const { 
    artists, 
    clickHandler, 
    displayName,
    timeRange 
  } = props;

  const { 
    header,
    footer,
    name
  } = getDetails(timeRange);

  return (
    <div className='poster-background' onClick={clickHandler}>
      <div className='poster'>
        <div>
          <img src={header} />
          <div className='header-text'>
            <h3>{ displayName }'s</h3>
            <h1>{ name } { new Date().getFullYear() }</h1>
          </div>
        </div>

        <div className='acts'>
          { artists.map(artist => <span key={artist.id}>{artist.name}</span>) }
        </div>

        <div className='footer'>
          <img src={footer} />
        </div>
      </div>
    </div>
  )
}

export default Lineup