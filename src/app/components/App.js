import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import LoginButton from './LoginButton';
import Main from './Main';
import { getUserInfo } from '../helpers/spotify';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      username: ''
    }

    this.setToken = this.setToken.bind(this);
  }

  componentDidMount() {
    const token = document.cookie ?
      document.cookie.split('&')[0].match(/token=(.*)/)[1] :
      ''
    if (token) {
      this.setToken(token);
      this.setUserName(token)
    }
  }

  setUserName(token) {
    getUserInfo(token).then( response => {
      this.setState({
        username: response.data.display_name
      })
    })
  }

  setToken(token) {
    this.setState({
      token: token
    })
  }

  render() {
    if (this.state.token === '') {
      return (
        <LoginButton />
      )
    }

    return (
      <div>
        <Header username={this.state.username} />
        <Main token={this.state.token} />
      </div>
    )
  }
};
