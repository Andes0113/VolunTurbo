import axios from 'axios';
import { getLocalUser, setLocalUser } from './localuser';

export function updateInterests(interests) {
  let token = sessionStorage.getItem('Bearer Token');
  return axios
    .put(
      '/api/interests/',
      {
        interests,
      },
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
        },
      }
    )
    .then((res) => setLocalUser(res.data));
}
export function getInterests() {
  let token = sessionStorage.getItem('Bearer Token');
  return axios
    .get('/api/interests/', {
      headers: {
        Authorization: `Bearer Token ${token}`,
      },
    })
    .then((res) => setLocalUser(res.data));
}
