import Login from './Login'
import Logo from './help-fast-no-background-hor.png'
import * as React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  HStack,
} from '@chakra-ui/react'
import {
  Link as RouteLink
} from "react-router-dom";

function Header() {  
  return (
    <Box as="nav">
        <HStack justify={'center'} spacing='20vw'>
            <img src={Logo} width={200} height={200}></img> 
            <ButtonGroup variant="ghost" spacing={10} size='md'>
              <RouteLink to="/home">
                <Link style={{textDecoration: 'none'}}><Button key={'Home'}>{'Home'}</Button></Link>
              </RouteLink>  
              <RouteLink to="/profile">
                <Link style={{textDecoration: 'none'}}><Button key={'Profile'}>{'Profile'}</Button></Link>
              </RouteLink>
              <RouteLink to="/matches">
                <Link style={{textDecoration: 'none'}}><Button key={'Matches'}>{'Matches'}</Button></Link>
              </RouteLink>
              <RouteLink to="/settings">
                <Link style={{textDecoration: 'none'}}><Button key={'Settings'}>{'Settings'}</Button></Link>
              </RouteLink>    
              <Login />
            </ButtonGroup>
        </HStack>
    </Box>
  );
}

export default Header;

