import React from 'react';
import Track from './Track';
import { getTop } from '../helpers/spotify.js';

export default class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    getTop(this.props.token, 'tracks').then(response => {
      this.setState({
        tracks: response.data.items
      })
    })
  }

  render() {
    const { tracks } = this.state;

    return (
      <div className='top-tracks'>
        {tracks.map(track => {
          return (
            <Track key={track.id} track={track} />
          )
        })}
      </div>
    )
  }
}
