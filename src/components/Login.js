import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  Button,
} from '@chakra-ui/react'

function Login() {
  const [ profile, setProfile ] = useState(null);
  const clientId = '37984234294-psrdnv52s1a2c5vqpff046l9rs7scho4.apps.googleusercontent.com';

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  
  const onSuccess = (res) => {
      setProfile(res.profileObj);
      console.log(res.profileObj);
      console.log(res.getAuthResponse().id_token);
      sessionStorage.setItem('token', res.getAuthResponse().id_token);
  };
  
  const onFailure = (err) => {
      console.log('failed', err);
  };
  
  const logOut = () => {
      localStorage.removeItem('token');
      setProfile(null);
  };

  return (
      <div>
          {profile ? (
              <GoogleLogout
              clientId={clientId} 
              onLogoutSuccess={logOut}   
              isSignedIn={false}
              render={renderProps => (
                <Button colorScheme='red' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Log Out
                </Button>
              )}        
            />
          ) : (
              <GoogleLogin 
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              isSignedIn={true}
              render={renderProps => (
                <Button colorScheme='green' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Log In
                </Button>
              )} 
              />            
          )}
      </div>
  );
}

export default Login;