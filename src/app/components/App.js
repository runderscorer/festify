import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginButton from './LoginButton';
import Main from './Main';
import Navigation from './Navigation';
import { refreshToken } from '../helpers/spotify';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    }

    this.clearSession = this.clearSession.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  componentDidMount() {
    const tokenCookie = document.cookie.match(/token=([^;]*).*$/);
    const refreshCookie = document.cookie.match(/refresh=([^;]*).*$/);
    const token = tokenCookie ? tokenCookie[1] : null;
    const refresh =  refreshCookie ? refreshCookie[1] : null;

    if (token) {
      this.setToken(token);
    } else if (!token && refresh) {
      refreshToken(refresh).then(response => {
        this.setToken(response.data.access_token)
      });
    } else {
      return null;
    }
  }

  clearSession() {
    Object.keys(sessionStorage).forEach(key => {
      sessionStorage.removeItem(key);
    });
    this.setState({
      token: ''
    });
    axios.get('/log-out');
  }

  setToken(token) {
    this.setState({
      token: token
    })
  }

  render() {
    const { token } = this.state;

    if (token) {
      return (
        <div>
          <Navigation clickHandler={this.clearSession} />
          <Main token={this.state.token} />
        </div>
      )
    }

    return <LoginButton />
  }
};
