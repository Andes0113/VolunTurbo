import MatchesContents from '../containers/MatchesContents';
import { Box, Text } from '@chakra-ui/react';

function Matches() {
  return (
    <Box margin={'auto'} width={'90vh'}>
      <Box paddingTop="5vh">
          <Text fontSize="3xl">My Matches</Text>
        <MatchesContents />
      </Box>
    </Box>
  );
}

export default Matches;
