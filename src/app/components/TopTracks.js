import React from 'react';
import Filters from './Filters';
import Track from './Track';
import { getTopArtistsOrTracks } from '../helpers/spotify.js';

export default class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRange: 'medium_term',
      tracks: [],
      type: 'tracks'
    }

    this.setActiveTimeRange = this.setActiveTimeRange.bind(this);
    this.setTopArtistsOrTracks = this.setTopArtistsOrTracks.bind(this);
    this.timeRange = this.timeRange.bind(this);
  }

  componentDidMount() {
    const timeRange = this.timeRange();

    this.setState({
      timeRange: timeRange
    }, () => {
      this.setTopArtistsOrTracks(this.state.timeRange);
    })
  }
  
  setActiveTimeRange(timeRange) {
    this.setState({
      timeRange: timeRange
    })
  }

  setTopArtistsOrTracks(timeRange) {
    getTopArtistsOrTracks(this.props.token, this.state.type, timeRange).then(response => {
      this.setState({
        tracks: response.data.items
      })
    })
  }

  timeRange() {
    const queryString = this.props.location.search;
    return queryString.substr(queryString.indexOf('=') + 1, queryString.length) || this.state.timeRange;
  }

  render() {
    const {
      timeRange,
      tracks
    } = this.state;

    return (
      <div className='top-tracks'>
        <div className='filters'>
          <Filters
            activeFilterCallback={this.setActiveTimeRange}
            activeFilter={timeRange}
            filterCallback={this.setTopArtistsOrTracks}
          />
        </div>
        <div className='tracks'>
          {tracks.map(track => {
            return (
              <Track key={track.id} track={track} />
            )
          })}
        </div>
      </div>
    )
  }
}
