import ProfileContents from '../containers/ProfileContents'
import Login from '../components/Login'
import {
  Box
} from '@chakra-ui/react'

function Profile() {  
    return (
      <Box margin={'auto'} width={'90vh'}>
        <ProfileContents />
        <Login />
      </Box>
    );
  }
  
  export default Profile;
  
  