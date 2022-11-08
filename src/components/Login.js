import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi} from 'gapi-script';
import {
  Box,
  Button,
} from '@chakra-ui/react'

function Login() {

  const [ profile, setProfile ] = useState([]);
  const clientId = '37984234294-psrdnv52s1a2c5vqpff046l9rs7scho4.apps.googleusercontent.com';
  
  useEffect(() => {
      const initClient = () => {
          gapi.client.init({
              clientId: clientId,
              scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  });
  
  const onSuccess = (res) => {
      setProfile(res.profileObj);
  };
  
  const onFailure = (err) => {
      console.log('failed', err);
  };
  
  const logOut = () => {
      setProfile(null);
  };
  
  return (
      <div>
          {profile ? (
              <GoogleLogout
              clientId={clientId} 
              onLogoutSuccess={logOut}   
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
              cookiePolicy={'single_host_origin'}
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