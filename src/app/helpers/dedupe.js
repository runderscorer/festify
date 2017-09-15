export const dedupeTracks = (array) => {
  const tracks = array.reduce((group, item) => {
    group[item.track.id] = item;
    return group;
  }, {});

  return Object.values(tracks);
}
