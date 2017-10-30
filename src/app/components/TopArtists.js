import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Filters from './Filters';
import { getTopArtistsOrTracks } from '../helpers/spotify.js';

export default class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      type: 'artists',
      timeRange: this.timeRange()
    };

    this.renderLineup = this.renderLineup.bind(this);
    this.setActiveTimeRange = this.setActiveTimeRange.bind(this);
    this.setTopArtistsOrTracks = this.setTopArtistsOrTracks.bind(this);
    this.timeRange = this.timeRange.bind(this);
  }

  componentDidMount() {
    this.setTopArtistsOrTracks(this.state.timeRange);
  }

  setActiveTimeRange(timeRange) {
    this.setState({ timeRange: timeRange });
  }

  setTopArtistsOrTracks(timeRange) {
    const cachedArtists = sessionStorage.getItem(`artists[${timeRange}]`);

    if (cachedArtists) {
      this.setState({ artists: JSON.parse(cachedArtists) });
      return;
    }

    getTopArtistsOrTracks(this.props.token, this.state.type, timeRange).then(response => {
      this.setState({ artists: response.data.items });
      sessionStorage.setItem(`artists[${timeRange}]`, JSON.stringify(this.state.artists));
    });
  }

  timeRange() {
    const queryString = this.props.location.search;
    return queryString.split('=')[1] || 'medium_term';
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

    if (artists.length === 0) {
      return <Loader />
    }

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
};

TopArtists.propTypes = {
  token: PropTypes.string.isRequired
};
