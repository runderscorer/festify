import React from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Main from './Main';
import MobileLogout from './MobileLogout';
import { getUserInfo, refreshToken } from '../helpers/spotify';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',
      displayName: '',
      backgroundColor: 'blue',
    }

    this.clearSession = this.clearSession.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setDisplayName = this.setDisplayName.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
  }

  componentDidMount() {
    const tokenCookie = document.cookie.match(/token=([^;]*).*$/);
    const refreshCookie = document.cookie.match(/refresh=([^;]*).*$/);
    const token = tokenCookie ? tokenCookie[1] : null;
    const refresh =  refreshCookie ? refreshCookie[1] : null;

    if (token) {
      this.setToken(token);
      this.setDisplayName(token);
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
    this.setState({ token: '' });
    axios.get('/log-out');
  }

  setToken(token) {
    this.setState({ token: token });
  }

  setBackgroundColor(value) {
    this.setState({ backgroundColor: value })
  }

  async setDisplayName(token) {
    const response = await getUserInfo(token)
    const { data: { display_name } } = response

    this.setState({ displayName: display_name })
  }

  render() {
    const { backgroundColor, displayName, token } = this.state;

    return (
      <div className={`app ${backgroundColor}`}>
        <NavBar loggedIn={token ? true : false} />
        <Main token={token} displayName={displayName} setBackgroundColor={this.setBackgroundColor} />
        {token ? <MobileLogout /> : null}
      </div>
    )
  }
};
