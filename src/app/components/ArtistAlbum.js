import React from 'react';
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
}

export default ArtistAlbum;
