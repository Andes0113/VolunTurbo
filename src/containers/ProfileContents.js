import React from 'react';
import {
  Box, 
  HStack,
  Text
} from '@chakra-ui/react'

function ViewportContent() {  
  return (
    <Box as="nav">
        <HStack justify={'center'} spacing='20vw'>
          <Text>Write Profile Contents Here</Text>
        </HStack>
    </Box>
    );
}

export default ViewportContent;