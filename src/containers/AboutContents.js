import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Link,
} from '@chakra-ui/react'
import {
  Link as RouteLink,
} from "react-router-dom";
import OrganizationRegistration from "../components/OrganizationRegistration";

function ViewportContent() {  

  return (
    <VStack  justify={'center'}>
      <h1>{window.user}</h1>
      <Heading size='2xl' paddingTop={"10vh"} justifyContent='center' textAlign={'center'}>
      Welcome to Volun<i>Turbo</i>!
      </Heading>
      <Text width='30vw' paddingTop={"3vh"} justifyContent='center' textAlign={'center'}>
      Volun<i>Turbo</i> is a platform to network and become socially involved in your community.
      </Text>
      <HStack paddingTop={'5vh'}>
        <OrganizationRegistration />
        <RouteLink to="/match">
          <Link style={{textDecoration: 'none'}}>
            <Box  width='15vw' borderWidth='1px' borderRadius='lg' whiteSpace={'nowrap'}>
              <Box padding={'10px'} fontSize='0.75rem' fontWeight={'bold'} textAlign='center'>
                Start Matching
              </Box>
            </Box>
          </Link>
        </RouteLink>
      </HStack>
    </VStack>    
    );
}

export default ViewportContent;