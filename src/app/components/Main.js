import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Artist from './Artist';
import Dashboard from './Dashboard';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <Route exact path='/' render={ (props) => <Dashboard token={this.props.token} {...props} />} />
        <Route exact path='/top-artists' render={ (props) => <TopArtists token={this.props.token} {...props} />} />
        <Route exact path='/top-artists/:id' render={ (props) => <Artist token={this.props.token} {...props} />} />
        <Route path='/top-tracks' render={ (props) => <TopTracks token={this.props.token} {...props} />} />
      </main>
    )
  }
};
