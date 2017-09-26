import React from 'react';
import { Transition } from 'react-transition-group';
import Filters from './Filters';
import Modal from './Modal';
import PlaylistForm from './PlaylistForm';
import Track from './Track';
import { getTopArtistsOrTracks } from '../helpers/spotify.js';

export default class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      displaySlider: false,
      message: '',
      playlistUrl: '',
      timeRange: 'medium_term',
      tracks: [],
      type: 'tracks',
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.setActiveTimeRange = this.setActiveTimeRange.bind(this);
    this.setTopArtistsOrTracks = this.setTopArtistsOrTracks.bind(this);
    this.timeRange = this.timeRange.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSlider = this.toggleSlider.bind(this);
  }

  componentDidMount() {
    const timeRange = this.timeRange();

    this.setState({
      timeRange: timeRange
    }, () => {
      this.setTopArtistsOrTracks(this.state.timeRange);
    })
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({
      displaySlider: !this.state.displaySlider
    })
  }

  handleModal(data) {
    const message = data.status === 201 ?
      'Your playlist was created successfully!' :
      'Something went wrong.'

    this.setState({
      message: message,
      playlistUrl: data.playlistUrl
    }, this.toggleModal);
  }

  setActiveTimeRange(timeRange) {
    this.setState({
      timeRange: timeRange
    })
  }

  setTopArtistsOrTracks(timeRange) {
    const cachedTracks = sessionStorage.getItem(`tracks[${timeRange}]`);

    if (cachedTracks) {
      this.setState({
        tracks: JSON.parse(cachedTracks)
      });
      return;
    }

    getTopArtistsOrTracks(this.props.token, this.state.type, timeRange).then(response => {
      this.setState({
        tracks: response.data.items
      });
      sessionStorage.setItem(`tracks[${timeRange}]`, JSON.stringify(this.state.tracks));
    });
  }

  timeRange() {
    const queryString = this.props.location.search;
    return queryString.substr(queryString.indexOf('=') + 1, queryString.length) || this.state.timeRange;
  }

  toggleModal() {
    this.setState({
      displayModal: !this.state.displayModal
    })
  }

  toggleSlider() {
    this.setState({
      displaySlider: !this.state.displaySlider
    })
  }

  renderModal() {
    const { displayModal, message, playlistUrl } = this.state;
    if (displayModal) {
      return (
        <Modal
          message={message}
          playlistUrl={playlistUrl}
          toggleModal={this.toggleModal}
          />
      )
    }
  }

  render() {
    const {
      displaySlider,
      message,
      timeRange,
      tracks
    } = this.state;

    return (
      <div className='top-tracks'>
        {this.renderModal()}
        <div className='filters'>
          <Filters
            activeFilterCallback={this.setActiveTimeRange}
            activeFilter={timeRange}
            filterCallback={this.setTopArtistsOrTracks}
          />
        </div>

        <div className='export'>
          <span>
            <button onClick={this.handleClick}>
              {`${displaySlider ? 'Cancel' : 'Export to'} Spotify Playlist`}
            </button>
          </span>
        </div>

        <div className='tracks-container'>
          <div className='tracks'>
            {tracks.map(track => {
              return (
                <Track key={track.id} track={track} />
              )
            })}
          </div>

          <Transition in={displaySlider} timeout={150}>
            {(state) => (
              <PlaylistForm
                activeClassName={`playlist-form-${state}`}
                handleModal={this.handleModal}
                timeRange={timeRange}
                token={this.props.token}
                toggleSlider={this.toggleSlider}
                tracks={tracks}
              />
            )}
          </Transition>
        </div>
      </div>
    )
  }
}
