import React, { useState, useEffect } from 'react';
import {
  Button, 
} from '@chakra-ui/react'

function Login() {
  const [profile, setProfile] = useState({});
 
  function handleCallbackResponse(response) {
    console.log("JWT Token: " + response.credential);
    sessionStorage.setItem('token', response.credential);
    setProfile(response.credential);
    document.getElementById("signIn").hidden=true;
  };

  function handleSignOut(event) {
    sessionStorage.removeItem('token');
    setProfile({});
    document.getElementById("signIn").hidden=false;
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '37984234294-psrdnv52s1a2c5vqpff046l9rs7scho4.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    
    window.google.accounts.id.renderButton(
      document.getElementById("signIn"), {
        theme: "outline", 
        size: "large",
      });

    window.google.accounts.id.prompt();
    }, []);

  return (
    <div>
      <div id='signIn'></div>   
      
      { Object.keys(profile).length != 0 &&
        <Button onClick={(e) => handleSignOut(e)}>Log Out</Button>
      }

    </div>
   
  );
}

export default Login;