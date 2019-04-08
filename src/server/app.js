const express = require('express');
const path = require('path');
const request = require('request');
const cookieParser = require('cookie-parser');
const queryString = require('querystring');

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const app = express();
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/callback', (req, res) => {
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
    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;
    const maxAge = body.expires_in;
    const expiration = new Date(Number(new Date()) + (maxAge * 1000));

    res.cookie('token', accessToken, { expires: expiration, httpOnly: false});
    res.cookie('refresh', refreshToken);
    res.redirect('/');
  });
})

app.get('/refresh', (req, res) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const refreshToken = req.query.refresh;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form:{
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    },
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const accessToken = body.access_token;
    const maxAge = body.expires_in;
    const expiration = new Date(Number(new Date()) + (maxAge * 1000));

    res.cookie('token', accessToken, { 'expire': expiration, httpOnly: false});

    res.send({accessToken, type: 'refresh'});
  });
})

app.get('/log-out', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refresh');
  res.redirect('/');
})

app.get(['/', '/about'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

module.exports = app;
