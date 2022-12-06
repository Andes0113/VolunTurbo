import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  Center,
  VStack
} from '@chakra-ui/react';
import InterestSlider from './InterestSlider';
import { updateInterests } from '../calls/interests';
import { getLocalUser } from '../calls/localuser';

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

const InterestForm = () => {
  const [interests, ] = useState(getLocalUser().interests);

  const handleSliderChange = (value, category) => {
    interests[category.toLowerCase().split(' ').join('_')] = value;
    updateInterests(interests);
  }

  return (
    <Box>
      <Center mt="4vh" mb="15vh">
        <VStack>
          <Text>Set Your Interests</Text>
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
          >
            {categories.map((category) => (
              <InterestSlider setValue={handleSliderChange} defaultValue={interests[category.toLowerCase().split(' ').join('_')]} category={category} key={category} />
            ))}
          </Grid>
        </VStack>
      </Center>
    </Box>
  );
};

export default InterestForm;
