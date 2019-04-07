import React from 'react';
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

  return (
    <div className='acts'>
      <div className='headliner'>{first.name}</div>
      <div className='co_headliner'>
        <span>{second.name}</span>
        <span>{third.name}</span>
      </div>
      <div className='top_bill'>
        <span>{fourth.name}</span>
        <span>{fifth.name}</span>
        <span>{sixth.name}</span>
      </div>
      <div className='supporting'>
        { rest.map(artist => <span key={artist.id}>{artist.name}</span>) }
      </div>
    </div>
  )
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

  const [
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    ...rest
  ] = artists;

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

        { groupLineup(artists) }

        <div className='footer'>
          <img src={footer} />
        </div>
      </div>
    </div>
  )
}

export default Lineup