import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ playlistStatusCode, playlistUrl, toggleModal }) => {
  return (
    <div className='modal'>
      {renderMessage(playlistUrl, playlistStatusCode)}
      <button className='btn' onClick={toggleModal}>Close</button>
    </div>
  )
};

const renderMessage = (playlistUrl, statusCode) => {
  if (statusCode === 201) {
    return (
      <div className='message'>
        <p>Playlist successfully created!</p>
        <a href={playlistUrl}>Listen on Spotify</a>
      </div>
    );
  } else {
    return (
      <div className='message'>
        <p>Something went wrong.</p>
      </div>
    );
  }
}

Modal.propTypes = {
  playlistStatusCode: PropTypes.number.isRequired,
  playlistUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
