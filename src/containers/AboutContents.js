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
        <Heading size='2xl' width='50vw'  paddingTop={"80px"}>Welcome to Help Fast!</Heading>
        <Text width='35vw'  paddingTop={"20px"}>Help Fast is a platform to network and become socially involved in your community.</Text>
      </VStack>
    </Box>   
    
    );
}

export default ViewportContent;