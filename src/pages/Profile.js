import ProfileContents from '../containers/ProfileContents';
import Login from '../components/Login';
import { Box, Text } from '@chakra-ui/react';
import { getLocalUser } from '../calls/localuser';

function Profile() {
  const user = getLocalUser();
  return (
    <Box margin={'auto'} width={'90vh'}>
      <Box paddingTop={'5vh'} width="100%">
          <Text fontSize="3xl">Profile</Text>
          {user !== null && <Text fontSize="2xl">Welcome {user?.firstName}!</Text>}
        <ProfileContents />
        <Login />
      </Box>
    </Box>
  );
}

export default Profile;
