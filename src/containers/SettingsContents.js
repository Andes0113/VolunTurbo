import React, { useState } from 'react';
import {
  Box, 
  Grid,
  FormLabel,
  Input,
  Checkbox,
  Button,
  HStack
} from '@chakra-ui/react'
import axios from 'axios';
import { setLocalUser } from '../calls/localuser';

function SettingContents() {  

  const [userinfo, setUserInfo] = useState({
    categories: [],
    response: [],
  });
  
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { categories } = userinfo;
    if (checked) {
      setUserInfo({
        categories: [...categories, value],
        response: [...categories, value],
      });
    }
    else {
      setUserInfo({
        categories: categories.filter((e) => e !== value),
        response: categories.filter((e) => e !== value),
      });
    }
  };

  function updatePrefereneces() {
    var token = sessionStorage.getItem('token');
    const body = {
      radius: 32
      // opt-out: "true",
    };
    axios.put('auth/login/', body)
    .then((res) => {
      setLocalUser(res.data.profile)
    }, (error) => {
      console.log(error);
    });
  };

  function resetPreferences() {
    var token = sessionStorage.getItem('token');
    const body = {
      radius: 32
      // opt-out: "true",
    };
    axios.put('auth/login/', body)
    .then((res) => {
      console.log(res.data.profile.settings);
    }, (error) => {
      console.log(error);
    });
  }

  function getPreferences() {
    var token = sessionStorage.getItem('token');
    const body = {
      id: token
    }
    axios.post('auth/login/', body)
    .then((res) => {
      console.log(res.data.profile.settings);
    }, (error) => {
      console.log(error);
    });

  }

  return (
    <Box as="nav">
      <Grid templateColumns='repeat(2, 1fr)' gap={4} paddingTop='10vh' justify={'center'}> 
        <FormLabel htmlFor='name'>Share my data with organizations.</FormLabel>
        <Box>
          <Checkbox
            id='sendUserData'
          />
        </Box>
        <FormLabel htmlFor='email'>Search radius.</FormLabel>
        <Box>
          <Input
            id='viewRadius'
          />
        </Box>
      </Grid>
      <HStack paddingTop={'30vh'} justifyContent='right'> 
      <Button mr={3} 
              onClick={ () => {
                resetPreferences();
                handleChange();
              }}
              colorScheme='green'>
              Reset
      </Button>
      <Button mr={3} 
              onClick={ () => {
                updatePrefereneces();
                handleChange();
              }}
              colorScheme='blue'>
              Apply
        </Button>
      </HStack>
   

    </Box>
    );
}

export default SettingContents;