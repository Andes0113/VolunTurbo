import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  FormLabel,
  Stack,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Select,
  useDisclosure,
  Textarea,
  Text,
  Heading,
  Link
} from '@chakra-ui/react'
import {
  Link as RouteLink
} from "react-router-dom";
import RegistrationForm from '../components/RegistrationForm';

console.log(window.user);

function ViewportContent() {  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()

  return (
 
    <VStack  justify={'center'}>
      <Heading size='2xl' paddingTop={"80px"} justifyContent='center' textAlign={'center'}>
        Welcome to Help Fast!
      </Heading>
      <Text width='20vw' paddingTop={"3vh"} justifyContent='center' textAlign={'center'}>
        Help Fast is a platform to network and become 
        involved in your community. Join us and help us make a change. 
      </Text>
      <HStack paddingTop={'5vh'}>
        <RouteLink onClick={onOpen}>
          <Link style={{textDecoration: 'none'}}>
            <Box  width='15vw' borderWidth='1px' borderRadius='lg' whiteSpace={'nowrap'}>
              <Box padding={'10px'} fontSize='0.75rem' fontWeight={'bold'} textAlign='center'>
                Register Organization
              </Box>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size='lg'
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth='1px'>
                    Create a new account
                  </DrawerHeader>

                  <DrawerBody>
                    <Stack spacing='24px'>
                      <Box>
                        <FormLabel htmlFor='username'>Organization Name</FormLabel>
                        <Input
                          id='username'
                          placeholder='Please enter user name'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                          id='email'
                          placeholder='Email'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                        <Input
                          id='phone'
                          placeholder='Phone'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='website'>Website</FormLabel>
                        <InputGroup size='sm'>
                          <Input placeholder='Website' />
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='desc'>Description</FormLabel>
                        <Textarea id='desc' />
                      </Box>
                    </Stack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth='1px'>
                    <Button mr={3} onClick={onClose} colorScheme='red'>
                      Cancel
                    </Button>
                    <Button colorScheme='blue'>Submit</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Box>
          </Link>
        </RouteLink>
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