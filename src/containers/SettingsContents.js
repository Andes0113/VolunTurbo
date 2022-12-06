import React, { useState } from 'react';
import {
  Box,
  Grid,
  FormLabel,
  Checkbox,
  Button,
  HStack,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react';
import { getLocalUser } from '../calls/localuser';
import { updateSettings } from '../calls/settings';

function SettingContents() {
  const [sendUserData, setUserData] = useState(
    getLocalUser().settings.sendUserData
  );
  const [viewRadius, setViewRadius] = useState(
    getLocalUser().settings.viewRadius
  );

  const resetPreferences = () => {
    // updateSettings({
    //   sendUserData: false,
    //   viewRadius: 5
    // })
  };
  const updatePreferences = () => {
    let settings = {
      sendUserData: Boolean(sendUserData),
      viewRadius: viewRadius
    }
    updateSettings(settings);
  };

  return (
    <Box as="nav">
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        paddingTop="10vh"
        justify={'center'}
      >
        <FormLabel htmlFor="name">Share my data with organizations.</FormLabel>
        <Box>
          <Checkbox
            onChange={setUserData}
            id="sendUserData"
            value={sendUserData}
          />
        </Box>
        <FormLabel htmlFor="email">Search Radius</FormLabel>
        <Box>
          <NumberInput
            value={viewRadius}
            onChange={setViewRadius}
            id="viewRadius"
          >
            <NumberInputField />
          </NumberInput>
        </Box>
      </Grid>
      <HStack paddingTop={'30vh'} justifyContent="right">
        <Button
          mr={3}
          onClick={() => {
            resetPreferences();
          }}
          colorScheme="green"
        >
          Reset
        </Button>
        <Button mr={3} onClick={updatePreferences} colorScheme="blue">
          Apply
        </Button>
      </HStack>
    </Box>
  );
}

export default SettingContents;
