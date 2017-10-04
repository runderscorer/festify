import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { message, playlistUrl, toggleModal } = props;

  return (
    <div className='modal'>
      <p>{message}</p>
      <a href={playlistUrl}>Listen on Spotify</a>
      <button className='btn' onClick={toggleModal}>Close</button>
    </div>
  )
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  playlistUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
