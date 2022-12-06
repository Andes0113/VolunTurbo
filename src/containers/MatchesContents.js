import React, { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import MatchedCompanyCard from '../components/MatchedCompanyCard';
import { getMatches } from '../calls/userinfo';
import { useEffect } from 'react';

function ViewportContent() {
  const [matches, setMatches] = useState([
    // {
    //   name: "Test",
    //   categories: [{"Test1": 0}, {"Test2": 1}],
    //   description: "fjkasdjfldsjafkajs"
    // }
  ]);

  useEffect(() => {
    getMatches().then((data) => setMatches(data));
  }, []) 

  return (
    <Box as="nav" paddingTop="10vh">
      <HStack justify={'center'} spacing="20vw">
        {matches.map((match, idx) => {
          return <MatchedCompanyCard organization={match} key={idx} />;
        })}
      </HStack>
    </Box>
  );
}

export default ViewportContent;
