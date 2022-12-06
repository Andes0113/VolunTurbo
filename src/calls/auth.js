import axios from 'axios';

export default function login(googleToken) {
  axios
    .post('auth/login/', {
      id: googleToken,
    })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem('Bearer Token', res.data.token);
    })
    .then(navigator.geolocation.getCurrentPosition(setPosition));
}

async function setPosition(position) {
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
