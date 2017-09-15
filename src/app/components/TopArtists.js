import React from 'react';
import { Link } from 'react-router-dom';
import { getTop } from '../helpers/spotify.js';

export default class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }

    this.renderLineup = this.renderLineup.bind(this);
  }

  componentDidMount() {
    console.log('TopArtists props: ', this.props)
    getTop(this.props.token, 'artists').then(response => {
      this.setState({
        artists: response.data.items
      })
    })
  }

  renderLineup(artists, tier) {
    return (
      <div className={`${tier} tier`}>
        {artists.map(artist => {
          return (
            <Link to={`/top-artists/${artist.id}`} key={artist.id} >
              <span>{artist.name}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  render() {
    const { artists } = this.state;
    return (
      <div className='top-artists'>
        <div className='lineup-announcement'>
          <div className='bands'>
            {this.renderLineup(artists.slice(0, 1), 'headliner')}
            {this.renderLineup(artists.slice(1, 5), 'mainLineup')}
            {this.renderLineup(artists.slice(6, 12), 'midLineup')}
            {this.renderLineup(artists.slice(13, artists.length - 1), 'bottomLineup')}
          </div>
        </div>
      </div>
    )
  }
}
