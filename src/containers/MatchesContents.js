import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import MatchedCompanyCard from '../components/MatchedCompanyCard';
import { useEffect } from 'react';
import { getLocalUser } from '../calls/localuser';

function ViewportContent() {
  const [matches, setMatches] = useState(getLocalUser().matches);

  useEffect(() => {
    setMatches(getLocalUser().matches)
  }, []);

  return (
    <Box as="nav" paddingTop="5vh">
      <VStack justify={'center'} spacing="2vw">
        {matches && matches.map((match, idx) => {
          return <MatchedCompanyCard organization={match} key={idx} />;
        })}
      </VStack>
    </Box>
  );
}

export default ViewportContent;
