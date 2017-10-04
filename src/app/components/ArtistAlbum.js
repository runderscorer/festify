import React from 'react';
import PropTypes from 'prop-types';
import { truncateString } from '../helpers/truncate.js';

const ArtistAlbum = ({ album }) => {
  return (
    <div className='artist-album'>
      <img src={album.images[1].url} />
      <div className='album-name'>
        <p>{truncateString(album.name)}</p>
      </div>
    </div>
  )
};

ArtistAlbum.propTypes = {
  album: PropTypes.object.isRequired
};

export default ArtistAlbum;
