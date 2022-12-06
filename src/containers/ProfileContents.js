import React from 'react';
import {
  Box, 
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import { getLocalUser } from '../calls/localuser';
import InterestForm from '../components/InterestForm';

function ProfileContents() {  
  let user = getLocalUser();

  return (
    <Box paddingTop='10vh'>
    <HStack justify={'center'} spacing='20vw' >
        { sessionStorage.getItem('Bearer Token') != null ? (
          <VStack>
            <Box>
              <Text>Welcome {user?.firstName}!</Text>
            </Box>
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