import Login from './Login'
import Logo from './help-fast-no-background-hor.png'
import * as React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  HStack,
  Container,
} from '@chakra-ui/react'
import {
  Link as RouteLink
} from "react-router-dom";

function Header() {  
  return (
    <Box as="nav" className='navigation'>
      <Container paddingTop='1vh' paddingBottom='1vh'>
        <HStack justify={'center'} spacing='15vw'>
              <img src={Logo} width={200} height={200}></img> 
              <ButtonGroup variant="ghost" spacing={10} size='sm'>
                <RouteLink to="/profile">
                  <Button key={'Profile'}>{'Profile'}</Button>
                </RouteLink>
                <RouteLink to="/match">
                  <Button key={'Match'}>{'Match'}</Button>
                </RouteLink>  
                <RouteLink to="/matches">
                  <Button key={'Matches'}>{'Matches'}</Button>
                </RouteLink>
                <RouteLink to="/settings">
                  <Button key={'Settings'}>{'Settings'}</Button>
                </RouteLink>  
                <RouteLink to="/">
                  <Button key={'About'}>{'About'}</Button>
                </RouteLink>  
                <Login />
              </ButtonGroup>
          </HStack>
      </Container>
    </Box>
  );
}

export default Header;

