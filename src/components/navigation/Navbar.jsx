import React from 'react';
import { Flex, Button, Spacer, Switch, InputLeftElement, Input, InputGroup, Menu, MenuButton, MenuList, MenuGroup, MenuItem, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { FaUser } from 'react-icons/fa';

function Navbar({ user, logout, isAuthenticated, darkMode, onDarkModeChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const guestLinks = (
    <Button as={Link} to='/signin' colorScheme="blue">
      Login
    </Button>
  );

  const authLinks = (
    <Menu>
      <MenuButton as={IconButton} aria-label='Perfil' icon={<FaUser />} />
      <MenuList>
        <MenuGroup title='Perfil'>
          <form method='POST' onSubmit={handleLogout}>
            <MenuItem as={Button} onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          </form>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  return (
    <Flex
      as='nav'
      alignItems='center'
      justifyContent='center'
      p={4}
      boxShadow='md'
      bg={darkMode ? 'gray.800' : 'white'}
      color={darkMode ? 'white' : 'black'}
    >
      <Spacer />

      <InputGroup w='550px'>
        <InputLeftElement>
          <SearchIcon color='gray.500' />
        </InputLeftElement>
        <Input type='text' placeholder='Buscar' border='1px solid black' />
      </InputGroup>

      <Spacer />
      {isAuthenticated ? authLinks : guestLinks}
    </Flex>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);