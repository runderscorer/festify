import React from 'react';

const ArtistLink = ({ key, name, url }) => (
  <a href={url} key={key} target='_blank'>
    <span>{name}</span>
  </a>
);

export default ArtistLink;
