import React from 'react';
import ArtistAlbum from './ArtistAlbum';
import { getArtist, getArtistAlbums } from '../helpers/spotify.js';

export default class Artist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      artist: {}
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const { token } = this.props;

    getArtist(token, id).then(response => {
      console.log('artist response: ', response.data)
      const artist = response.data;
      this.setState({
        artist: artist
      })
    })

    getArtistAlbums(token, id).then(response => {
      console.log('artist albums response: ', response.data.items)
      this.setState({
        albums: response.data.items
      })
    })
  }

  render() {
    const { artist, albums } = this.state;

    if (Object.keys(artist).length < 1) {
      return null;
    }

    return (
      <div className='artist'>
        <div className='artist-info'>
          <img src={artist.images[1].url} />
          <p className='artist-name'>{artist.name}</p>
          <div className='genres'>
            <span>{artist.genres.slice(0, 3).join(' + ')}</span>
          </div>
        </div>
        <div className='artist-albums'>
          {albums.map(album => {
            return (
              <ArtistAlbum key={album.id} album={album} />
            )
          })}
        </div>
      </div>
    )
  }
}
