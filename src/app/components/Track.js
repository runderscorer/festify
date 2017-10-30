import React from 'react';
import PropTypes from 'prop-types';
import { truncateString } from '../helpers/truncate.js';

const Track = ({ track }) => {
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
};

Track.propTypes = {
  track: PropTypes.object.isRequired
};

export default Track;
