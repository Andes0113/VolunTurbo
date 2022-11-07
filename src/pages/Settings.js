import Header from '../components/Header';
import SettingContents from '../containers/SettingsContents'
import { BrowserRouter as Router } from 'react-router-dom';
import {withRouter} from 'react-router';

function Settings() {  
    return (
        <SettingContents />
    );
  }
  
  export default Settings;
  
  