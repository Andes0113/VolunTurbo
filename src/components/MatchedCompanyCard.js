import React from 'react';
import {
  Box, 
  HStack, 
  Text,
  VStack
} from '@chakra-ui/react'

//Organization name


function MatchedCompanyCard(orgId) {  
  return (
    <Box as="matchCard" 
        height='10vh'
        width='100%'
        boxShadow='0 2px 5px rgba(100, 100, 100, 0.35)'
        borderRadius='10px'>
        <HStack alight='stretch' spacing='40%'>
          <VStack justifyContent='left' align='left'>
            <Box padding='10px'>
              <Text fontSize='1rem' fontWeight='bold'>Organization.name</Text>
              <Text fontSize='0.75rem' fontWeight='light'>Organization.description</Text>
            </Box>
          </VStack>
          <VStack justifyContent='left' align='right'>
            <Box padding='10px'>
              <Text>Categories Here</Text> 
            </Box>
          </VStack>    
        </HStack>
      

    </Box>   
    );
}

export default MatchedCompanyCard;