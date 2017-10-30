import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import Track from './Track';
import { getUserInfo, getUserRecentlyPlayed } from '../helpers/spotify';
import { dedupeTracks } from '../helpers/dedupe'

export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      recentlyPlayed: [],
      user: {}
    }

    this.renderRecentlyPlayed = this.renderRecentlyPlayed.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;

    getUserRecentlyPlayed(token).then(response => {
      this.setState({ recentlyPlayed: response.data.items });
    })

    const cachedUser = JSON.parse(sessionStorage.getItem('user'));

    if (cachedUser) {
      this.setState({ user: cachedUser });
      return;
    }

    getUserInfo(token).then(response => {
      this.setState({ user: response.data });
      sessionStorage.setItem('user', JSON.stringify(this.state.user));
    })
  }

  renderUserInfo(user) {
    return (
      <div className='user-info'>
        <img src={user.images[0].url} />
        <p className='username'>{user.display_name}</p>
        <div className='followers'>
          <span>{user.followers.total} followers</span>
        </div>
        <a href={user.external_urls.spotify}>Listen on Spotify</a>
      </div>
    )
  }

  renderRecentlyPlayed(recentlyPlayed) {
    return (
      <div className='recently-played'>
        <h3>Recently Played</h3>
        {dedupeTracks(recentlyPlayed).map(item => {
          return (
            <Track key={item.track.id} track={item.track} />
          )
        })}
      </div>
    )
  }

  render() {
    const { recentlyPlayed, user } = this.state;

    if (recentlyPlayed.length === 0) {
      return <Loader />
    }

    return (
      <div className='user'>
        {Object.keys(user).length > 0 ? this.renderUserInfo(user) : null}
        {this.renderRecentlyPlayed(recentlyPlayed)}
      </div>
    )
  }
};

Dashboard.propTypes = {
  token: PropTypes.string.isRequired
};
