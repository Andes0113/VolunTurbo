import Login from './Login'
import Logo from './help-fast-no-background-hor.png'
import * as React from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  FormLabel,
  Stack,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Select,
  useDisclosure,
  Textarea
} from '@chakra-ui/react'
import {
  Link as RouteLink
} from "react-router-dom";


function RegistrationForm() {  
  return (
    <Drawer
      isOpen={this.props.isOpen}
      placement='right'
      onClose={this.props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>
          Create a new account
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing='24px'>
            <Box>
              <FormLabel htmlFor='username'>Name</FormLabel>
              <Input
                id='username'
                placeholder='Please enter user name'
              />
            </Box>

            <Box>
              <FormLabel htmlFor='url'>Url</FormLabel>
              <InputGroup>
                <InputLeftAddon>http://</InputLeftAddon>
                <Input
                  type='url'
                  id='url'
                  placeholder='Please enter domain'
                />
                <InputRightAddon>.com</InputRightAddon>
              </InputGroup>
            </Box>

            <Box>
              <FormLabel htmlFor='owner'>Select Owner</FormLabel>
              <Select id='owner' defaultValue='segun'>
                <option value='segun'>Segun Adebayo</option>
                <option value='kola'>Kola Tioluwani</option>
              </Select>
            </Box>

            <Box>
              <FormLabel htmlFor='desc'>Description</FormLabel>
              <Textarea id='desc' />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default RegistrationForm;

