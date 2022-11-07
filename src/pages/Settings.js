import Header from '../components/Header';
import SettingContents from '../containers/SettingsContents'
import { BrowserRouter as Router } from 'react-router-dom';

function Settings() {  
    return (
      <Router>
        <Header />
        <SettingContents />
      </Router>
    );
  }
  
  export default Settings;
  
  