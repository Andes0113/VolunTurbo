import React from 'react';
import { useState } from 'react';
import {
  Box,
  Badge,
  Button,
  VStack,
  HStack,
  Flex,
  Link,
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

let organizations = [];

function MatchContents() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  let organization = organizations[index];

  React.useEffect(() => {
    if (organizations.length === 0) {
      findMatches().then((data) => {
        organizations = data;
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const viewNextOrganization = () => {
    if (organizations.length > 1) {
      if (maxIndex === index) setMaxIndex(maxIndex + 1);
      setIndex(index + 1);
    } else {
      findMatches().then((data) => {
        organizations = organizations.concat(data.slice(1));
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
    <div>
      <Flex
        bgGradient="linear(to-t, green.300, blue.200, blue.400)"
        justify="space-around"
        height={'91vh'}
      >
        <VStack spacing={'5'}>
          <Box p="6"></Box>
          <Box
            width={'750px'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bgColor="white"
          >
            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                fontSize="xl"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {loading && 'Loading...'}
                {organization && organization.name}
                {!loading &&
                  index >= organizations.length &&
                  'No more organizations found in your area :(. Try increasing the area of your search.'}
              </Box>
              <Box>{organization && organization.address}</Box>
              <Box pt="2" display="flex" alignItems="baseline">
                {organization &&
                  Object.keys(organization.categories).map((category) => {
                    return (
                      category !== 'id' &&
                      organization.categories[category] > 0 && (
                        <Badge borderRadius="full" px="2" mr="2" colorScheme="teal">
                          {category.split('_').join(' ')}
                        </Badge>
                      )
                    );
                  })}
              </Box>
              <Box pt="2">{organization && organization.description}</Box>
              <Box>
                {organization?.website && (
                  <Link color="teal.500" href={organization?.website}>
                    Learn More
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
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
    </div>
  );
}

export default MatchContents;
