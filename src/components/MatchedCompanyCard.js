import React from 'react';
import {
  Box, 
  HStack, 
  Text,
  VStack,
  Badge
} from '@chakra-ui/react'

//Organization name


function MatchedCompanyCard({organization}) {
  return (
    <Box
        height='10vh'
        width='100%'
        boxShadow='0 2px 5px rgba(100, 100, 100, 0.35)'
        borderRadius='10px'>
        <HStack alight='stretch' spacing='40%'>
          <VStack justifyContent='left' align='left'>
            <Box padding='10px'>
              <Text fontSize='1rem' fontWeight='bold'>{organization.name}</Text>
              <Text fontSize='0.75rem' fontWeight='light'>{organization.description}</Text>
            </Box>
          </VStack>
          <VStack justifyContent='left' align='right'>
            <Box padding='10px'>
              {Object.keys(organization.categories).map((category) => {
                return (
                  category !== 'id' &&
                  organization.categories[category] > 0 && (
                  <Badge borderRadius="full" px="2" mr="2" colorScheme="teal">
                    {category.split('_').join(' ')}
                  </Badge>
                  )
                );
              })}
            </Box>
          </VStack>    
        </HStack>
      

    </Box>   
    );
}

export default MatchedCompanyCard;