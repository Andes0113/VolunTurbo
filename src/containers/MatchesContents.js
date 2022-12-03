import React, { useState } from 'react';
import {
  Box, 
  HStack,
  List,
  Text
} from '@chakra-ui/react'
import MatchedCompanyCard from '../components/MatchedCompanyCard';
import axios from 'axios';

function ViewportContent() {  

  const [matches, setmatches] = useState([]);

  function getUserToken () {
    var token = localStorage.getItem('token');
    console.log(token);

    const body = {
      id: token
    }
    axios.post('auth/login/', body)
    .then((res) => {
      // console.log(res);
      setmatches(res.data.matches);
    }, (error) => {
      console.log(error);
    });
  }


  return (
    <Box as="nav" paddingTop='10vh'>
      <HStack justify={'center'} spacing='20vw' onLoad={getUserToken()}>
        <MatchedCompanyCard/>      
        <List>

        </List>
      </HStack>
    </Box>   
    );
}

export default ViewportContent;