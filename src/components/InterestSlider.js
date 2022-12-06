import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Text,
  GridItem,
} from '@chakra-ui/react';

const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
};

const InterestSlider = ({ defaultValue, category, setValue }) => {
    console.log(defaultValue);
  return (
    <GridItem key={category}>
      <Text mt="5vh">{category}</Text>
      <Slider
        width={'40vh'}
        onChangeEnd={(value) => setValue(value, category)}
        defaultValue={defaultValue}
        min={-10}
        max={10}
        step={1}
      >
        <SliderTrack bg="tomato">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="teal" />
        </SliderTrack>
        <SliderMark value={-9} {...labelStyles}>
          Disinterested
        </SliderMark>
        <SliderMark value={7} {...labelStyles}>
          Interested
        </SliderMark>
        <SliderThumb boxSize={4} />
      </Slider>
    </GridItem>
  );
};

export default InterestSlider;
