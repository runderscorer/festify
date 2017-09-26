import React from 'react';
import PlaylistFormTracks from './PlaylistFormTracks';
import { Transition } from 'react-transition-group';
import { addTracksToPlaylist, createPlaylist } from '../helpers/spotify';
import { timeRangeFilters } from '../constants/filters';

export default class PlaylistForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeClassName: props.activeClassName,
      description: '',
      descriptionValid: '',
      formErrors: {description: '', name: ''},
      formValid: true,
      name: `Top Tracks - ${timeRangeFilters[props.timeRange]}`,
      nameValid: '',
      playlistId: '',
      playlistUrl: '',
      token: props.token,
      tracks: [...props.tracks],
      userId: JSON.parse(sessionStorage.getItem('user')).id
    };

    this.buildPlaylist = this.buildPlaylist.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeClassName: nextProps.activeClassName,
      name: `Top Tracks - ${timeRangeFilters[nextProps.timeRange]}`,
      tracks: [...nextProps.tracks]
    }, this.validateInput)
  }

  handleButtonClick(e) {
    e.preventDefault();

    this.setState({ active: !this.state.active });
  }

  handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    this.setState({
      [inputName]: inputValue
    }, this.validateInput);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      description,
      formValid,
      name,
      token,
      userId
    } = this.state;

    if (!formValid) {
      return;
    }

    const playlistData = { description: description, name: name, public: 'true' };

    createPlaylist(token, userId, playlistData).then(response => {
      this.setState({
        playlistId: response.data.id,
        playlistUrl: response.data.external_urls.spotify
      });
    }).then(() => {
      return this.buildPlaylist(userId, this.state.playlistId, this.state.tracks);
    }).then((response) => {
      this.handleConfirmation({
        playlistUrl: this.state.playlistUrl,
        status: response.status
      });
    })
  }

  handleConfirmation(data) {
    this.props.toggleSlider();
    this.props.handleModal(data);
    this.resetPlaylist();
  }

  buildPlaylist(userId, playlistId, tracks) {
    const { token } = this.state;
    const trackUris = tracks.map(track => { return track.uri });

    return addTracksToPlaylist(token, userId, playlistId, trackUris).then(response => {
      return {
        data: response.data,
        status: response.status
      }
    })
  }

  resetPlaylist() {
    this.setState({
      description: '',
      name: '',
      playlistId: '',
      playlistUrl: ''
    })
  }

  removeTrack(trackId) {
    const { tracks } = this.state;
    const filteredTracks = tracks.filter(track => {
      return track.id !== trackId
    });

    this.setState({
      tracks: filteredTracks
    });
  }

  validateInput() {
    const { description, name } = this.state;
    let formValidationErrors = this.state.formErrors;

    let descriptionValid = description ? description.length < 301 : true;
    formValidationErrors.description = !descriptionValid ? 'must be fewer than 300 characters.' : '';

    let nameValid = name.length > 0 && name.length < 101;
    formValidationErrors.name = !nameValid ? 'must be fewer than 100 characters.' : '';

    this.setState({
      formValidationErrors: formValidationErrors,
      descriptionValid: descriptionValid,
      nameValid: nameValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.descriptionValid
    })
  }

  render() {
    const { activeClassName, formErrors, name, tracks } = this.state;

    return (
      <div className={`playlist-form ${activeClassName}`}>
        <form onSubmit={this.handleSubmit}>
          <label>Name (required) <span className='error'>{formErrors.name}</span></label>
          <input type='text' name='name' onChange={this.handleChange} value={name} />

          <label>Description <span className='error'>{formErrors.description}</span></label>
          <input type='text' name='description' onChange={this.handleChange} value={this.state.description} />

          <PlaylistFormTracks tracks={tracks} clickHandler={this.removeTrack}/>

          <button className='btn' type='submit'>Create Playlist</button>
        </form>
      </div>
    )
  }
}
