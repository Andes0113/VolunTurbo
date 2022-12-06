import ProfileContents from '../containers/ProfileContents'
import Login from '../components/Login'
import {
  Box,
} from '@chakra-ui/react'

function Profile() {  
    return (
      <Box margin={'auto'} width={'90vh'}>
        <Box paddingTop={'10vh'} width="100%">
          <ProfileContents />
          <Login />
        </Box>
      </Box>
    );
  }
  
  export default Profile;
  
  