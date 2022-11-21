import React from 'react';
import {
  Box, 
  HStack,
  Text
} from '@chakra-ui/react'

function MatchContents() {  
  return (
    <Box as="nav" paddingTop='10vh'>
      <HStack justify={'center'} spacing='20vw' >
        <Text>Write Match Contents Here</Text>
      </HStack>
    </Box>   
    );
}

export default MatchContents;