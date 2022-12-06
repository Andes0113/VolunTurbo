import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import MatchedCompanyCard from '../components/MatchedCompanyCard';
import { getMatches } from '../calls/userinfo';
import { useEffect } from 'react';

function ViewportContent() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches().then((data) => setMatches(data));
  }, []);

  return (
    <Box as="nav" paddingTop="5vh">
      <VStack justify={'center'} spacing="2vw">
        {matches.map((match, idx) => {
          return <MatchedCompanyCard organization={match} key={idx} />;
        })}
      </VStack>
    </Box>
  );
}

export default ViewportContent;
