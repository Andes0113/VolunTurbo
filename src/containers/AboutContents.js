import React, { useState } from "react";
import axios from "axios";
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
  Grid,
  Checkbox,
  Stack,
  HStack,
  VStack,
  Input,
  useDisclosure,
  Text,
  Heading,
  Link,
  FormControl,
  CheckboxGroup
} from '@chakra-ui/react'
import {
  Link as RouteLink,
} from "react-router-dom";
import Profile from "../pages/Profile";

function ViewportContent() {  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userinfo, setUserInfo] = useState({
    categories: [],
    response: [],
  });
  
  const handleChange = (e) => {

    const { value, checked } = e.target;
    const { categories } = userinfo;
    if (checked) {
      setUserInfo({
        categories: [...categories, value],
        response: [...categories, value],
      });
    }
    else {
      setUserInfo({
        categories: categories.filter((e) => e !== value),
        response: categories.filter((e) => e !== value),
      });
    }
  };

  function createJSON() {

    var inputs = document.querySelectorAll('Input');  
    var myObject = {};
    for (var i = 0; i < inputs.length; i++) { 
      myObject[inputs[i].id] = inputs[i].value;
    }

    myObject['categories'] = userinfo.categories;
    myObject['matchInfo'] = {};
    myObject['isTestData'] = true;
    myObject['approved'] = false;

    console.log(JSON.parse(JSON.stringify(myObject)));
    axios.post('/dev/registerorg', {
      data:myObject
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };


  return (
    <VStack  justify={'center'}>
      <h1>{window.user}</h1>
      <Heading size='2xl' paddingTop={"10vh"} justifyContent='center' textAlign={'center'}>
        Welcome to Help Fast!
      </Heading>
      <Text width='30vw' paddingTop={"3vh"} justifyContent='center' textAlign={'center'}>
        Help Fast is a platform to network and become 
        involved in your community. Join us and help us make a change. 
      </Text>
      <HStack paddingTop={'5vh'}>
        <RouteLink onClick={onOpen}>
          <Link style={{textDecoration: 'none'}}>
            <Box  width='15vw' borderWidth='1px' borderRadius='lg'>
              <Box padding={'10px'} fontSize='0.75rem' fontWeight={'bold'} textAlign='center' overflowWrap={'break-word'}>
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
                      <FormControl>
                        <Box paddingTop='2vh'>
                          <FormLabel htmlFor='name'>Organization Name</FormLabel>
                          <Input
                            id='name'
                          />
                        </Box>
                        <Box paddingTop='2vh'>
                          <FormLabel htmlFor='email'>Email</FormLabel>
                          <Input
                            id='email'
                          />
                        </Box>
                        <Box paddingTop='2vh'>
                          <FormLabel htmlFor='website'>Website</FormLabel>
                          <Input                             
                            id='website' />
                        </Box>
                        <Box paddingTop='2vh'>
                          <FormLabel htmlFor='address'>Address</FormLabel>
                          <Input
                            id='address'
                          />
                        </Box>
                        <Box paddingTop='2vh'>
                          <FormLabel htmlFor='desc'>Description</FormLabel>
                          <Input 
                            id='description' />
                        </Box>

                        <FormLabel htmlFor='desc'  paddingTop='2vh'>Categories</FormLabel>
                        <CheckboxGroup id='categories' colorScheme={'green'}>
                          <Grid templateColumns='repeat(5, 1fr)' gap={4} paddingTop='0.5vh'>          
                            <Checkbox id='categories' value='animals' onChange={handleChange}>Animals</Checkbox>
                            <Checkbox id='categories' value='arts' onChange={handleChange}>Arts</Checkbox>
                            <Checkbox id='categories' value='children' onChange={handleChange}>Children</Checkbox>
                            <Checkbox id='categories' value='community' onChange={handleChange}>Community</Checkbox>
                            <Checkbox id='categories'value='crisis' onChange={handleChange}>Crisis Support</Checkbox>
                            <Checkbox id='categories'value='disaster' onChange={handleChange}>Disaster Relief</Checkbox>
                            <Checkbox id='categories'value='education' onChange={handleChange}>Education</Checkbox>
                            <Checkbox id='categories'value='emergency' onChange={handleChange}>Emergency</Checkbox>
                            <Checkbox id='categories'value='evironment' onChange={handleChange}>Environment</Checkbox>                        
                            <Checkbox id='categories'value='faith' onChange={handleChange}>Faith-based</Checkbox>
                            <Checkbox id='categories'value='family' onChange={handleChange}>Family Support</Checkbox>
                            <Checkbox id='categories'value='health' onChange={handleChange}>Health</Checkbox> 
                            <Checkbox id='categories' value='housing' onChange={handleChange}>Housing</Checkbox> 
                            <Checkbox id='categories' value='hunger' onChange={handleChange}>Hunger</Checkbox>
                            <Checkbox id='categories' value='legal' onChange={handleChange}>Legal</Checkbox>
                            <Checkbox id='categories' value='mentalhealth' onChange={handleChange}>Mental Health</Checkbox>
                            <Checkbox id='categories' value='seniors' onChange={handleChange}>Seniors</Checkbox>
                            <Checkbox id='categories' value='specialneeds' onChange={handleChange}>Special Needs</Checkbox>
                            <Checkbox id='categories' value='sports' onChange={handleChange}>Sports + Recreation</Checkbox>
                            <Checkbox id='categories' value='veterans' onChange={handleChange}>Veterans</Checkbox>
                            <Checkbox id='categories' value='women' onChange={handleChange}>Women</Checkbox>
                          </Grid>
                        </CheckboxGroup>    
                      </FormControl>
                    </Stack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth='1px'>
                    <Button mr={3} onClick={onClose} colorScheme='red'>Cancel</Button>
                    <Button mr={3} 
                      onClick={() => {
                        createJSON();
                        onClose();
                      }} colorScheme='blue'>Submit</Button>
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