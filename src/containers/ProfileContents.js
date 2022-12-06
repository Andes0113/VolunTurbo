import React from 'react';
import {
  Box, 
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import InterestForm from '../components/InterestForm';
import ResetButton from '../components/ResetButton';
import { getLocalUser } from '../calls/localuser';

function ProfileContents() {  
  return (
    <Box paddingTop='5vh'>
    <HStack justify={'center'} spacing='20vw' >
        { sessionStorage.getItem('Bearer Token') !== null && getLocalUser().interests ? (
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