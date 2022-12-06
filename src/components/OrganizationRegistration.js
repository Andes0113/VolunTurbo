import React, { useState } from 'react';
import axios from 'axios';
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
  Input,
  useDisclosure,
  Link,
  FormControl,
  FormHelperText,
  CheckboxGroup,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import getCookie from '../calls/cookie';

const categories = [
    'Arts and Culture',
    'Charity',
    'Children',
    'Community',
    'Disaster Relief',
    'Education',
    'Emergency',
    'Environment',
    'Faith Based',
    'Family Support',
    'Finance',
    'Health and Medicine',
    'Housing',
    'Hunger',
    'Legal',
    'Mental Health',
    'Nonprofit',
    'Pets',
    'Seniors',
    'Special Needs',
    'Sports and Recreation',
    'Veterans',
    'Women',
    'Wildlife',
  ];  

const csrftoken = getCookie('csrftoken');

// Refactor eventually, very long

const OrganizationRegistration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userinfo, setUserInfo] = useState({
    categories: [],
    response: [],
  });
  const getRequiredFields = () =>{
    let inputs = document.querySelectorAll('Input');
    let required = ['name', 'email', 'address', 'description', 'matchInfo'];
    let present = [];
    let missing = [];
    for(let i = 0; i < inputs.length; i++){
        if(required.includes(inputs[i].id) && inputs[i].value === ''){
            missing.push(inputs[i]);
        }else{
            present.push(inputs[i]);
        }
    }
    return [present, missing];
  }
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { categories } = userinfo;
    if (checked) {
      setUserInfo({
        categories: [...categories, value],
        response: [...categories, value],
      });
    } else {
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
    myObject['categories'] = userinfo.categories.reduce((category, v) => (
    {
        ...category,
        [v]: 1
    }), {});
    myObject['isTestData'] = false;

    axios
      .post('api/createorg/', {
        data: myObject,
      }, {
        headers: {
            'X-CSRFToken': csrftoken
        }
      })
  }

  return (
    <RouteLink onClick={onOpen}>
      <Link style={{ textDecoration: 'none' }}>
        <Box width="15vw" borderWidth="1px" borderRadius="lg">
          <Box
            padding={'10px'}
            fontSize="0.75rem"
            fontWeight={'bold'}
            textAlign="center"
            overflowWrap={'break-word'}
          >
            Register Organization
          </Box>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Register an Organization
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <FormControl>
                    <FormControl isRequired paddingTop="2vh">
                      <FormLabel htmlFor="name">Organization Name</FormLabel>
                      <Input id="name" />
                    </FormControl>
                    <FormControl isRequired paddingTop="2vh">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" />
                    </FormControl>
                    <Box paddingTop="2vh">
                      <FormLabel htmlFor="website">Website</FormLabel>
                      <Input id="website" />
                    </Box>
                    <FormControl isRequired paddingTop="2vh">
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <Input id="address" />
                      <FormHelperText>
                        If your organization doesn't have a set address, even
                        just a city name is ok.
                      </FormHelperText>
                    </FormControl>
                    <FormControl isRequired paddingTop="2vh">
                      <FormLabel htmlFor="desc">Description</FormLabel>
                      <Input id="description" />
                    </FormControl>
                    <FormControl isRequired paddingTop="2vh">
                      <FormLabel htmlFor="matchInfo">
                        Matching Information
                      </FormLabel>
                      <Input id="matchInfo" />
                      <FormHelperText>
                        Quick blurb about how to sign up for your organization.
                      </FormHelperText>
                    </FormControl>

                    <FormLabel htmlFor="desc" paddingTop="2vh">
                      Categories
                    </FormLabel>
                    <CheckboxGroup id="categories" colorScheme={'green'}>
                      <Grid
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                        paddingTop="0.5vh"
                      >
                        {categories.map((category) => {
                          return (
                            <Checkbox
                              id="categories"
                              value={category
                                .toLowerCase()
                                .split(' ')
                                .join('_')}
                              key={category}
                              onChange={handleChange}
                            >
                              {category}
                            </Checkbox>
                          );
                        })}
                      </Grid>
                    </CheckboxGroup>
                  </FormControl>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button mr={3} onClick={onClose} colorScheme="red">
                  Cancel
                </Button>
                <Button
                  mr={3}
                  onClick={() => {
                    let [present, missing] = getRequiredFields();
                    if(missing.length === 0){
                        createJSON();
                        onClose();
                    }else{
                        missing.forEach((field, idx) => {
                            field.style.borderColor = "red";
                            if(idx === 0){
                                field.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        })
                        present.forEach((field, idx) => {
                            field.style.borderColor = "#DDE5ED";
                        })
                    }
                  }}
                  colorScheme="blue"
                >
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Link>
    </RouteLink>
  );
};

export default OrganizationRegistration;
