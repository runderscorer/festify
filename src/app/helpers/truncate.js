export function truncateString(str) {
  if (str.length > 38) {
    return str.slice(0, 35) + '...'
  } else {
    return str
  }
};
