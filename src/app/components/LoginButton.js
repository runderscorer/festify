import React from 'react';
import spotifyLogo from '../assets/images/spotify.png';

const LoginButton = (props) => {
  const authLink = 'http://accounts.spotify.com/authorize';
  const redirectUri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const responseType = 'code';
  const scope = encodeURIComponent('user-read-email user-top-read');

  const loginLink = `${authLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`

  return (
    <a className='login-btn' href={loginLink}>
      <img src={spotifyLogo} />
      Login with Spotify
    </a>
  )
};

export default LoginButton;
