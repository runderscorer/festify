import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import FilterOption from './FilterOption';
import Lineup from './Lineup';
import { getTopArtistsOrTracks } from '../helpers/spotify.js';
import { timeRangeFilters } from '../constants/filters';

export default class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      type: 'artists',
      timeRange: this.timeRange(),
      displayModal: false,
    };

    this.setActiveTimeRange = this.setActiveTimeRange.bind(this);
    this.setTopArtistsOrTracks = this.setTopArtistsOrTracks.bind(this);
    this.timeRange = this.timeRange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setTopArtistsOrTracks(this.state.timeRange);
  }

  handleClick(value) {
    this.setState({
      displayModal: true,
      timeRange: value
    }, () => {
      this.setTopArtistsOrTracks(this.state.timeRange);
    })
  }

  closeModal() {
    this.setState({ displayModal: false })
  }

  setActiveTimeRange(timeRange) {
    this.setState({ timeRange: timeRange });
  }

  async setTopArtistsOrTracks(timeRange) {
    const cachedArtists = sessionStorage.getItem(`artists[${timeRange}]`);

    if (cachedArtists) {
      this.setState({ artists: JSON.parse(cachedArtists) });
      return;
    }

    const response = await getTopArtistsOrTracks(this.props.token, this.state.type, timeRange);
    const { data: { items } } = response;

    this.setState({ artists: items });
    sessionStorage.setItem(`artists[${timeRange}]`, JSON.stringify(this.state.artists));
  }

  timeRange() {
    const queryString = this.props.location.search;
    return queryString.split('=')[1] || 'medium_term';
  }

  render() {
    const { 
      artists, 
      displayModal,
      timeRange
    } = this.state;

    const { displayName, token } = this.props;

    if (!token) {
      return <Home />
    } else {
      return (
        <div className='container'>
          <div className='text-header'>
            <h1>Click on a time frame, my dude.</h1>
          </div>
          <div className='filter-options'>
            { 
              Object.keys(timeRangeFilters).map(key => (
                <FilterOption 
                  key={key} 
                  value={key}
                  clickHandler={this.handleClick}
                >
                  {timeRangeFilters[key]}
                </FilterOption>
              ))
            }
          </div>
          { 
            displayModal ? 
              <Lineup 
                artists={artists} 
                displayName={displayName}
                timeRange={timeRange} 
                clickHandler={this.closeModal} 
              /> : 
              null 
          }

        </div>
      )
    }
  }
};

TopArtists.propTypes = {
  token: PropTypes.string.isRequired
};
