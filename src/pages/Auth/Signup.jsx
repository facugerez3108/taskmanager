import {useState, useEffect} from "react";
import { Box, Heading, Input, Button, VStack, FormControl, Text } from '@chakra-ui/react';
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate ,Link, Link as RouterLink } from 'react-router-dom';

import { signup } from "../../redux/actions/auth";
import { connect } from "react-redux";
import Layout from "../../hooks/Layout";

function Signup({signup}){
    
    useEffect(() => { 
      window.scrollTo(0, 0);
    }, [])

    const navigate = useNavigate();
    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        'username': '',
        'email': '', 
        'password': ''
    })

    const {username, email, password} = formData;

    const onChangue = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
      e.preventDefault();
      signup(username, email, password);
      setAccountCreated(true);
      navigate('/signin');
      window.scrollTo(0, 0);
    }
    return(
        <>
          <Layout>
            <VStack align='center' justify='center' minHeight='100vh'>
                <Box
                    p={8}
                    maxW='xl'
                    borderWidth={1}
                    borderRadius='lg'
                    boxShadow='lg'
                    textAlign='center'
                    position='relative'
                >
                    <RouterLink to="/signin">
                        <CloseIcon
                          aria-label="Cerrar"
                          position="absolute"
                          top={2}
                          right={2}
                        />
                    </RouterLink>
                    <Heading size="lg" mb={4}>
                        Registrar cuenta
                    </Heading>

                    <form onSubmit={e=> onSubmit(e)}>
                        <FormControl>
                          <Input
                          name='username'
                          value={username}
                          placeholder="Nombre de usuario"
                          size="lg"
                          variant="filled"
                          mb={4}
                          onChange={e => onChangue(e)}
                          required
                        />
                        <Input
                          name='email'
                          value={email}
                          placeholder="Correo electrónico"
                          size="lg"
                          variant="filled"
                          mb={4}
                          onChange={e => onChangue(e)}
                          required
                        />
                        <Input
                          name='password'
                          value={password}
                          placeholder="Contraseña"
                          type="password"
                          onChange={e => onChangue(e)}
                          size="lg"
                          variant="filled"
                          mb={4}
                          required
                        />
                        <Button colorScheme="blue" type='submit'size="lg" width="100%">
                          Registrar
                        </Button>
                        </FormControl>
                    </form>
                    <Text mt={4}>¿Ya tienes una cuenta?</Text>
                    <Link to="/signin">
                        <Text color="blue.500">Inicia sesión</Text>
                    </Link>
                </Box>
            </VStack>
          </Layout>
        </>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  signup
})(Signup);