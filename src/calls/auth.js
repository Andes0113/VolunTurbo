import axios from 'axios';
import { setLocalUser } from './localuser';

export default function login(googleToken) {
  return axios
    .post('auth/login/', {
      id: googleToken,
    })
    .then((res) => {
      setLocalUser(res.data.profile);
      sessionStorage.setItem('Bearer Token', res.data.token);
    })
}

export async function setPosition(position) {
  const token = sessionStorage.getItem('Bearer Token');
  axios.post(
    'updatelocation/',
    {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
    {
      headers: {
        Authorization: `Bearer Token ${token}`,
      },
    }
  );
}
