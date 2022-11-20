import React, { useState } from 'react';
import {
  Box, 
  Grid,
  FormLabel,
  Input,
  Checkbox,
  Button,
  HStack
} from '@chakra-ui/react'

function SettingContents() {  

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

  function updatePrefereneces() {



  };

  function resetPreferences() {

  }

  return (
    <Box as="nav">
      <Grid templateColumns='repeat(2, 1fr)' gap={4} paddingTop='10vh' justify={'center'}> 
        <FormLabel htmlFor='name'>Share my data with organizations.</FormLabel>
        <Box>
          <Checkbox
            id='sendUserData'
          />
        </Box>
        <FormLabel htmlFor='email'>Search radius.</FormLabel>
        <Box>
          <Input
            id='viewRadius'
          />
        </Box>
      </Grid>

    <HStack paddingTop={'30vh'} justifyContent='right'> 
    <Button mr={3} 
            onClick={ () => {
              resetPreferences();
              handleChange();
            }}
            colorScheme='green'>
            Reset
    </Button>
    <Button mr={3} 
            onClick={ () => {
              updatePrefereneces();
              handleChange();
            }}
            colorScheme='blue'>
            Apply
      </Button>
    </HStack>
   

    </Box>
    );
}

export default SettingContents;