import React, { useEffect } from 'react';
import { Box, Heading, Link, Input, Button, VStack, Spacer } from '@chakra-ui/react';
import {  useNavigate ,Link as RouterLink } from 'react-router-dom';
import { signin } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import Layout from '../../hooks/Layout';



function Signin({signin}){
  
  useEffect(() => {
    window.scrollTo(0, 0);
  
  },[])
  
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    signin(email, password);
    navigate('/')
  }

  return(
      <Layout>
        <VStack align="center" justify="center" minHeight="100vh">
        <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        >
        <Heading size="lg" mb={4}>
          Iniciar sesión
        </Heading>
        <form onSubmit={e => onSubmit(e)}>
        <Input
          value={email}
          name='email'
          placeholder="Correo electrónico"
          size="lg"
          variant="filled"
          onChange={e => onChange(e)}
          mb={4}
          required
        />
        <Input
          value={password}
          name='password'
          placeholder="Contraseña"
          type="password"
          size="lg"
          variant="filled"
          onChange={e => onChange(e)}
          mb={4}
          required
        />
        <Button colorScheme="blue" type='submit'size="lg" width="100%">
          Ingresar
        </Button>
        </form>
        <Link
          as={RouterLink}
          to="/signup"
          color="blue.500"
          _hover={{ color: 'blue.700' }}
          mt='8px'
        >
          ¿No tienes una cuenta? Regístrate aquí.
        </Link>
        <Spacer />
        <Link
          as={RouterLink}
          to="/forgotpassword"
          color="blue.500"
          _hover={{ color: 'blue.700' }}
          mt='8px'
        >
          ¿Olvidate tu contraseña?
        </Link>
      </Box>
        </VStack>
      </Layout>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  signin
})(Signin);