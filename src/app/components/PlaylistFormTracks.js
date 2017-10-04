import React from 'react';
import PropTypes from 'prop-types';

export default class PlaylistFormTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [...props.tracks]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tracks: [...nextProps.tracks]
    })
  }

  handleClick(e) {
    this.props.clickHandler(e.target.value);
  }

  render() {
    const { tracks } = this.state;

    return (
      <ul>
        {tracks.map(track => {
          return (
            <li key={track.id}>
              <span>{track.artists[0].name} - {track.name}</span>
              <span>
                <button onClick={this.handleClick} value={track.id}>Remove</button>
              </span>
            </li>
          )
        })}
      </ul>
    );
  }
};

PlaylistFormTracks.propTypes = {
  tracks: PropTypes.array.isRequired
};
