import React from 'react';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import { getTopArtistsOrTracks } from '../helpers/spotify.js';

export default class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      type: 'artists',
      timeRange: 'medium_term'
    }

    this.renderLineup = this.renderLineup.bind(this);
    this.setActiveTimeRange = this.setActiveTimeRange.bind(this);
    this.setTopArtistsOrTracks = this.setTopArtistsOrTracks.bind(this);
    this.timeRange = this.timeRange.bind(this);
  }

  componentDidMount() {
    const timeRange = this.timeRange();

    this.setState({
      timeRange: timeRange
    }, () => {
      this.setTopArtistsOrTracks(this.state.timeRange)
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
        artists: response.data.items
      })
    })
  }

  timeRange() {
    const queryString = this.props.location.search;
    return queryString.substr(queryString.indexOf('=') + 1, queryString.length) || this.state.timeRange;
  }

  renderLineup(artists, tier) {
    return (
      <div className={`${tier} tier`}>
        {artists.map(artist => {
          return (
            <Link to={`/top-artists/${artist.id}`} key={artist.id} >
              <span>{artist.name}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  render() {
    const { artists, timeRange } = this.state;

    return (
      <div className='top-artists'>
        <div className='filters'>
          <Filters
            activeFilter={timeRange}
            activeFilterCallback={this.setActiveTimeRange}
            filterCallback={this.setTopArtistsOrTracks}
          />
        </div>
        <div className='lineup-announcement'>
          <div className='bands'>
            {this.renderLineup(artists.slice(0, 1), 'headliner')}
            {this.renderLineup(artists.slice(1, 5), 'mainLineup')}
            {this.renderLineup(artists.slice(6, 12), 'midLineup')}
            {this.renderLineup(artists.slice(13, artists.length - 1), 'bottomLineup')}
          </div>
        </div>
      </div>
    )
  }
}
