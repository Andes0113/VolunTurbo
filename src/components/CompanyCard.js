import React from 'react';
import {
  Box,
  Badge,
  Link,
} from '@chakra-ui/react';

const CompanyCard = ({ loading, organization, empty }) => {
  return (
    <Box
      width={'80vw'}
      borderWidth="1px"
      borderRadius="lg"
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
          {empty && (
            <>
              <Box>{'No organizations left in your area :('}</Box>
            </>
          )}
        </Box>
        <Box>{organization && organization.address}</Box>
        <Box pt="2" display="flex" alignItems="baseline">
          {organization &&
            Object.keys(organization.categories).map((category) => {
              return (
                category !== 'id' &&
                organization.categories[category] > 0 && (
                  <Badge
                    key={category}
                    borderRadius="full"
                    px="2"
                    mr="2"
                    colorScheme="teal"
                  >
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
  );
};

export default CompanyCard;
