import React from 'react';
import { getTop } from '../helpers/spotify.js';

export default class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    getTop(this.props.token, 'artists').then(response => {
      this.setState({
        artists: response.data.items
      })
    })
  }

  render() {
    const { artists } = this.state;
    console.log('artists: ', artists)

    return (
      <div>
        <h3>Top Artists</h3>
        {artists.map(artist => {
          return (
            <div key={artist.id}>
              <p>Name: {artist.name}</p>
              <p>Genres: {artist.genres.join(', ')}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
