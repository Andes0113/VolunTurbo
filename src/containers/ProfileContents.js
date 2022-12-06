import React from 'react';
import {
  Box, 
  HStack,
  Text
} from '@chakra-ui/react'
import { getLocalUser } from '../calls/localuser';

function ProfileContents() {  
  let user = getLocalUser();

  return (
    <Box as="nav" paddingTop='10vh'>
    <HStack justify={'center'} spacing='20vw' >
        { sessionStorage.getItem('Bearer Token') != null ? (
          <Box>
            <Text>Welcome {user?.firstName}!</Text>         
          </Box>
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