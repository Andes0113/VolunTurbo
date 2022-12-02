import React from 'react';
import {
  Box, 
  HStack,
  Text
} from '@chakra-ui/react'
import MatchedCompanyCard from '../components/MatchedCompanyCard';
import axios from 'axios';

//Get all matched organizations
//Create components based on the number of matches
function ViewportContent() {  

  var matches = [];

  function getUserToken () {
    axios.post('/auth/login/', {
      headers: {},
      data: {
        id: `${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res.data);
    }, (error) => {
      console.log(error);
    });
  }


  return (
    <Box as="nav" paddingTop='10vh'>
      <HStack justify={'center'} spacing='20vw' onLoad={getUserToken()}>
        <MatchedCompanyCard/>      
      </HStack>
    </Box>   
    );
}

export default ViewportContent;