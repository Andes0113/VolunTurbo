import React from 'react';
import { useState } from 'react';
import {
  Box, 
  Badge,
  Image,
  Button,
  VStack,
  HStack,
  Flex
} from '@chakra-ui/react'

function MatchContents() {  
  return (
    <div>
      <Flex bgGradient='linear(to-t, green.300, blue.200, blue.400)' justify='space-around' height={'578'}>
      <VStack spacing={'5'}>
        <Box p='6'></Box>
         <Box width={'1250px'} borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor='white'>
            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  Put Categories here
                </Badge>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                Company Title
              </Box>
              <Box>
                Company Location
              </Box>
            </Box>
          </Box>
        <VStack justify={'center'} spacing='5'>
        <HStack justify='center' spacing={'20'}>
          <Button width={'sm'}>
            Not Interested
          </Button>
          <Button width={'sm'}>
            Interested
          </Button>
        </HStack>
          <Button width={'sm'}>
              More Information
          </Button>
          </VStack>
      </VStack>
      </Flex>
      </div>
    );
}

export default MatchContents;