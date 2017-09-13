import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <Route path='/' render={ (props) => <Dashboard username={this.props.username} {...props} /> }/>
        <Route path='/top-artists' render={ (props) => <TopArtists token={this.props.token} {...props} />} />
        <Route path='/top-tracks' render={ (props) => <TopTracks token={this.props.token} {...props} />} />
      </main>
    )
  }
}
