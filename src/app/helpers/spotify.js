
import axios from 'axios';

export function getUserInfo(access_token) {
  const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  return axios.get('https://api.spotify.com/v1/me', config);
}

export function getTop(access_token, type) {
  const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  return axios.get(`https://api.spotify.com/v1/me/top/${type}`, config);
}
