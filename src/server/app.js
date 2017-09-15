const express = require('express');
const path = require('path');
const request = require('request');
const queryString = require('querystring');

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/callback', (req, res) => {
  console.log('in /callback');
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form:{
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;

    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, (error, response, body) => {
      console.log('request to spotify:', body);
    });

    res.cookie('token', access_token);
    res.redirect('/');
    // res.redirect('/#' +
    //   queryString.stringify({
    //     access_token: access_token,
    //     refresh_token: refresh_token
    // }));
  });
})

app.get('/log-out', (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
})

app.get(['/', '/top-artists', '/top-tracks'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

module.exports = app;
