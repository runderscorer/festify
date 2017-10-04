import React from 'react';

const Loader = (props) => {
  return (
    <div className='loader'>
      <div className='loader-out'>
        <div className='loader-in'>
        </div>
      </div>
      <span>Loading...</span>
    </div>
  )
};

export default Loader;
