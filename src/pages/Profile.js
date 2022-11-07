import ProfileContents from '../containers/ProfileContents'
import { BrowserRouter as Router } from 'react-router-dom';

function Profile() {  
    return (
      <Router>
        <ProfileContents />
      </Router>
    );
  }
  
  export default Profile;
  
  