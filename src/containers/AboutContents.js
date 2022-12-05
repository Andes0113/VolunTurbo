import React from 'react';
import {
  Box, 
  VStack,
  Text,
  Heading
} from '@chakra-ui/react'

console.log(window.user);

function ViewportContent() {  
  return (
 
    <Box as="nav">
      <VStack align-content='center' margin='auto'>
        <Heading size='2xl' width='50vw'  paddingTop={"80px"}>Welcome to Volun<i>Turbo</i>!</Heading>
        <Text width='35vw' paddingTop={"20px"}>Volun<i>Turbo</i> is a platform to network and become socially involved in your community.</Text>
      </VStack>
    </Box>   
    
    );
}

export default ViewportContent;