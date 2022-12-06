import axios from 'axios';
import { setLocalUser } from './localuser';

export function updateSettings(settings) {
  let token = sessionStorage.getItem('Bearer Token');
  return axios
    .put(
      '/api/settings/',
      {
        settings,
      },
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
        },
      }
    )
    .then((res) => setLocalUser(res.data));
}
