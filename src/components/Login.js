import React, { useEffect } from 'react';
import {
  Box,
  Button, 
} from '@chakra-ui/react'
import login from '../calls/auth.js';

function Login() {
 
  function handleCallbackResponse(response) {
    console.log("JWT Token: " + response.credential);
    login(response.credential);
    setProfile(response.credential);
    document.getElementById("signIn").hidden=true;
    sessionStorage.setItem('token', response.credential);
    window.location.reload(true);
  };

  function handleSignOut(event) {
    sessionStorage.removeItem('Bearer Token');
    setProfile({});
    document.getElementById("signIn").hidden=false;
    sessionStorage.removeItem('token');
    window.location.reload(true);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '37984234294-psrdnv52s1a2c5vqpff046l9rs7scho4.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    
    window.google.accounts.id.renderButton( document.getElementById("signIn"), {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangle",
      }
    );

    }, []);

  return (
    <Box>
      { sessionStorage.getItem('token') != null ? (
        <Button colorScheme='red' onClick={(e) => handleSignOut(e)}>Log Out</Button>             
      ) : (
        <div id='signIn'></div>
      )
      }

    </Box>
   
  );
}

export default Login;