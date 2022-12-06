import React, { useState, useEffect } from 'react';
import {
  Button, 
  Center,
} from '@chakra-ui/react'
import login, { setPosition } from '../calls/auth.js';
import { getLocalUser } from '../calls/localuser.js';

function Login() {
  const [signedIn, setSignedIn] = useState(getLocalUser() !== null);
  function handleCallbackResponse(response) {
    login(response.credential).then(() => 
      window.location.reload()
    )
    setSignedIn(true);
  };

  function handleSignOut(event) {
    sessionStorage.removeItem('Bearer Token');
    sessionStorage.removeItem('user');
    setSignedIn(false);
    window.location.reload(false);
  };

  function handleGoogle() {
    window.google.accounts.id.initialize({
      client_id: '37984234294-psrdnv52s1a2c5vqpff046l9rs7scho4.apps.googleusercontent.com',
      callback: handleCallbackResponse
    }, []);

    
    window.google.accounts.id.renderButton( document.getElementById("signIn"), {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangle",
      }
    );
  }

  useEffect(() => {
    if(signedIn){
      navigator.geolocation.getCurrentPosition(setPosition)
    }
    const googleScript = document.getElementById('google-gsi-script');
    if(window.google){
      handleGoogle();
    }
    googleScript.addEventListener('load', () => {
      handleGoogle();
    })
    }, []);

  return (
    <Center>
      { signedIn ? (
        <Button colorScheme='red' onClick={(e) => handleSignOut(e)}>Log Out</Button>             
      ) : (
        <div id='signIn'></div>
      )
      }

    </Center>
   
  );
}

export default Login;