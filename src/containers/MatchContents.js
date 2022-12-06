import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ignore, match, findMatches } from '../calls/matching.js';
import CompanyCard from '../components/CompanyCard.js';

function MatchContents() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [organizations, setOrganizations] = useState([]);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  let organization = organizations[index];

  React.useEffect(() => {
    if (organizations.length === 0) {
      findMatches().then((data) => {
        setOrganizations(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const viewNextOrganization = () => {
    if (organizations.length - index > 1) {
      if (maxIndex === index) setMaxIndex(maxIndex + 1);
      setIndex(index + 1);
    } else {
      findMatches().then((data) => {
        setOrganizations(organizations.concat(data.slice(1)));
        if (maxIndex === index) setMaxIndex(maxIndex + 1);
        setIndex(index + 1);
      });
    }
  };

  const processChoice = (org, matched) => {
    if (matched) {
      onOpen();
      match(org);
    } else {
      ignore(org);
      viewNextOrganization();
    }
  };

  return (
    <Flex
      bgGradient="linear(to-t, green.300, blue.200, blue.400)"
      justify="space-around"
      height={'91vh'}
    >
      <VStack spacing={'5'}>
        <Box p="6"></Box>
        <CompanyCard
          organization={organization}
          empty={!loading && index >= organizations.length}
          loading={loading}
        />
        <VStack justify={'center'} spacing="5">
          {index < organizations.length && (
            <HStack justify="center" spacing={'20'}>
              <Button
                width={'xs'}
                onClick={() => processChoice(organization, false)}
              >
                Not Interested
              </Button>
              <Button
                width={'xs'}
                onClick={() => processChoice(organization, true)}
              >
                Interested
              </Button>
            </HStack>
          )}
          <HStack justify="center" spacing={'20'}>
            {index > 0 && (
              <Button
                width={'xs'}
                onClick={() => setIndex(Math.max(index - 1, 0))}
              >
                Previous
              </Button>
            )}
            {maxIndex > index && (
              <Button
                width={'xs'}
                onClick={() => setIndex(Math.max(index + 1, 0))}
              >
                Next
              </Button>
            )}
          </HStack>
        </VStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You've Found a Match!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>{organization?.matchInfo}</div>
            <div>{organization?.email}</div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                viewNextOrganization();
              }}
            >
              Awesome!
            </Button>
            {/* <Button variant='ghost'></Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default MatchContents;
