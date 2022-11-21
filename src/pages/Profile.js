import ProfileContents from '../containers/ProfileContents'
import Login from '../components/Login'
import {
  Box
} from '@chakra-ui/react'

function Profile() {  
    return (
      <Box>
        <ProfileContents />
        <Login />
      </Box>
    );
  }
  
  export default Profile;
  
  