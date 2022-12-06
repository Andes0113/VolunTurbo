import React, { useState, useEffect } from 'react';
import {
  Box,
  Button, 
} from '@chakra-ui/react'
import login from '../calls/auth.js';

function Login() {
  const [signedIn, setSignedIn] = useState(sessionStorage.getItem('Bearer Token') !== null);
 
  function handleCallbackResponse(response) {
    login(response.credential)
    setSignedIn(true);
  };

  function handleSignOut(event) {
    sessionStorage.removeItem('Bearer Token');
    setSignedIn(false);
    window.location.reload(false);
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
      { signedIn ? (
        <Button colorScheme='red' onClick={(e) => handleSignOut(e)}>Log Out</Button>             
      ) : (
        <div id='signIn'></div>
      )
      }

    </Box>
   
  );
}

export default Login;