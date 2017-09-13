import React from 'react';
import { getTop } from '../helpers/spotify.js';

export default class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    console.log('TopTracks props: ', this.props)
    getTop(this.props.token, 'tracks').then(response => {
      this.setState({
        tracks: response.data.items
      })
    })
  }

  render() {
    const { tracks } = this.state;

    return (
      <div>
        <h3>Top Tracks</h3>
        {tracks.map(track => {
          return (
            <div key={track.id}>
              <p>Title: {track.name}</p>
              <p>Artist: {track.artists[0].name}</p>
              <p>Album: {track.album.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
