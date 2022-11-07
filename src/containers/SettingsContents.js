import React from 'react';
import {
  Box, 
  HStack,
  Text
} from '@chakra-ui/react'

function SettingContents() {  
  return (
    <Box as="nav">
      <HStack justify={'center'} spacing='20vw'>
        <Text>Write Settings Contents Here</Text>
      </HStack>
    </Box>
    );
}

export default SettingContents;