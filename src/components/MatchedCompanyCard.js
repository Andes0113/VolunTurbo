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
        width='100%'
        boxShadow='0 2px 5px rgba(100, 100, 100, 0.35)'
        borderRadius='10px'>
        <HStack alight='stretch' spacing='40%'>
          <VStack justifyContent='left' align='left'>
            <Box padding='10px'>
              <Text fontSize='1rem' fontWeight='bold'>{organization.name}</Text>
            </Box>
          </VStack>
          <HStack justifyContent='left' align='right'>
            <Box>
              {Object.keys(organization.categories).map((category) => {
                return (
                  category !== 'id' &&
                  organization.categories[category] > 0 && (
                  <Badge borderRadius="full" colorScheme="teal" key={category}>
                    {category.split('_').join(' ')}
                  </Badge>
                  )
                );
              })}
            </Box>
          </HStack>    
        </HStack>
        <Text mx="2vw" mb="1vh" fontSize='0.75rem' fontWeight='light'>{organization.description}</Text>

    </Box>   
    );
}

export default MatchedCompanyCard;