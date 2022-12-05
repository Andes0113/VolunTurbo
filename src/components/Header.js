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
      <Container>
        <HStack justify={'center'} spacing='15vw'>
                <img alt="Help Fast Logo" src={Logo} width={150} height={50} />
              <ButtonGroup variant="ghost" spacing={10} size='sm'>
                <RouteLink to="/match">
                  <Link style={{textDecoration: 'none'}}><Button key={'Match'}>{'Match'}</Button></Link>
                </RouteLink>  
                <RouteLink to="/matches">
                  <Link style={{textDecoration: 'none'}}><Button key={'Matches'}>{'Matches'}</Button></Link>
                </RouteLink>
                <RouteLink to="/settings">
                  <Link style={{textDecoration: 'none'}}><Button key={'Settings'}>{'Settings'}</Button></Link>
                </RouteLink>  
                <RouteLink to="/">
                  <Link style={{textDecoration: 'none'}}><Button key={'About'}>{'About'}</Button></Link>
                </RouteLink>  
                <Login />
              </ButtonGroup>
          </HStack>
      </Container>
    </Box>
  );
}

export default Header;

