import SettingContents from '../containers/SettingsContents'
import { 
    Box
  } from '@chakra-ui/react'
  
function Settings() {  
    return (
        <Box margin={'auto'} width={'90vh'}>
            <SettingContents />
        </Box>
    );
  }
  
  export default Settings;
  
  