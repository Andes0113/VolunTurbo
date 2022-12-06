import ProfileContents from '../containers/ProfileContents'
import Login from '../components/Login'
import {
  Box,
  Text
} from '@chakra-ui/react'

function Profile() {  
    return (
      <Box margin={'auto'} width={'90vh'}>
        <ProfileContents />
        <Box paddingTop={'10vh'} width="100%">
          <Login />
        </Box>
      </Box>
    );
  }
  
  export default Profile;
  
  