import React from 'react';
import {
    Button,
  } from '@chakra-ui/react';
import { clearSeen } from '../calls/userinfo';
   

const ResetButton = () => {

    return ( 
        <Button onClick={clearSeen}>
            Reset Organizations
        </Button>
     );
}
 
export default ResetButton;