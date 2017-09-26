import React from 'react';

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

export default Modal;
