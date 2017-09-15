import React from 'react';
import { truncateString } from '../helpers/truncate.js';

const Track = (props) => {
  const { track } = props;
  
  return (
    <div className='track'>
      <img src={track.album.images[1].url} />
      <div className='track-details'>
        <p>{track.artists[0].name}</p>
        <p>{track.name}</p>
        <p>{truncateString(track.album.name)}</p>
      </div>
    </div>
  )
}

export default Track;
