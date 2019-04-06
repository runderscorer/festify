import React from 'react';
import { Route } from 'react-router-dom';
import TopArtists from './TopArtists';

export default class Main extends React.Component {
  render() {
    const { displayName, token } = this.props;

    return (
      <main>
        <Route exact path='/' render={ (props) => <TopArtists displayName={displayName} token={token} {...props} />} />
      </main>
    )
  }
};
