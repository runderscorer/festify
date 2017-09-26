import React from 'react';

const LoginButton = (props) => {
  const authLink = 'http://accounts.spotify.com/authorize';
  const redirectUri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const responseType = 'code';
  const scope = encodeURIComponent('user-read-email user-top-read playlist-modify-public playlist-modify-private user-read-currently-playing user-read-recently-played user-read-playback-state');

  const loginLink = `${authLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`
  return (
    <div>
      <a href={loginLink}>Log in with Spotify</a>
    </div>
  )
}

export default LoginButton;
