import React from 'react';
import PropTypes from 'prop-types';
import ArtistAlbum from './ArtistAlbum';
import { getArtist, getArtistAlbums } from '../helpers/spotify.js';

export default class Artist extends React.Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      artist: {}
    }

    this.renderArtistAlbums = this.renderArtistAlbums.bind(this);
    this.renderArtistInfo = this.renderArtistInfo.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const { token } = this.props;

    getArtist(token, id).then(response => {
      const artist = response.data;
      this.setState({ artist: artist });
    });

    getArtistAlbums(token, id).then(response => {
      this.setState({ albums: response.data.items });
    });
  }

  renderArtistInfo(artist) {
    return (
      <div className='artist-info'>
        <img src={artist.images[1].url} />
        <p className='artist-name'>{artist.name}</p>
        <div className='genres'>
          <span>{artist.genres.slice(0, 3).join(' + ')}</span>
        </div>
        <a href={artist.external_urls.spotify}>Listen on Spotify</a>
      </div>
    )
  }

  renderArtistAlbums(albums) {
    return (
      <div className='artist-albums'>
        {albums.map(album => {
          return (
            <ArtistAlbum key={album.id} album={album} />
          )
        })}
      </div>
    )
  }

  render() {
    const { artist, albums } = this.state;

    return (
      <div className='artist'>
        {Object.keys(artist).length > 0 ? this.renderArtistInfo(artist) : null}
        {albums.length > 0 ? this.renderArtistAlbums(albums) : null}
      </div>
    )
  }
};

Artist.propTypes = {
  token: PropTypes.string.isRequired
};
