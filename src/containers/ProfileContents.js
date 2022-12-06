import React from 'react';
import {
  Box, 
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import InterestForm from '../components/InterestForm';
import ResetButton from '../components/ResetButton';

function ProfileContents() {  
  console.log(sessionStorage.getItem('Bearer Token'));
  return (
    <Box paddingTop='5vh'>
    <HStack justify={'center'} spacing='20vw' >
        { sessionStorage.getItem('Bearer Token') !== null ? (
          <VStack>
            <Box>
            </Box>
            <ResetButton />
            <InterestForm />
          </VStack>
        ) : (
          <Box>
            <Text>Please Log In</Text>         
          </Box>
        )
        }
    </HStack>
  </Box>
    );
}

export default ProfileContents;