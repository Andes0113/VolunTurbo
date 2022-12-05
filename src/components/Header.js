import Logo from './help-fast-no-background-hor.png'
import * as React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Container,
  Icon
} from '@chakra-ui/react'
import {
  Link as RouteLink
} from "react-router-dom";
import { UilUserCircle, UilSetting, UilStar, UilHeart, UilNotes } from '@iconscout/react-unicons'
function Header() {  
  return (
    <Box as="nav" className='navigation'>
      <Container>
        <HStack justify={'center'} spacing='15vw'>
              <img alt="Help Fast Logo" src={Logo} width={150} height={50} />
              <ButtonGroup variant="ghost" spacing={10} size='sm'>
                <RouteLink to="/match">
                  <Button key={'Match'}><Icon color={'red'} w={6} h={6} as={UilHeart }/></Button>
                </RouteLink>  
                <RouteLink to="/matches">
                  <Button key={'Matches'}><Icon color={'blue'} w={6} h={6} as={UilStar }/></Button>
                </RouteLink>
                <RouteLink to="/settings">
                  <Button key={'Settings'}><Icon color={'gray'} w={6} h={6} as={UilSetting}/></Button>
                </RouteLink>  
                <RouteLink to="/">
                  <Button key={'About'}><Icon color={'purple'} w={6} h={6} as={UilNotes}/></Button>
                </RouteLink> 
                <RouteLink to="/login">
                  <Button key={'Login'}><Icon color={'green'} w={6} h={6} as={UilUserCircle}/></Button>
                </RouteLink> 
              </ButtonGroup>
          </HStack>
      </Container>
    </Box>
  );
}

export default Header;

