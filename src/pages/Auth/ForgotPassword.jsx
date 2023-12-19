import React, { useState, useEffect } from "react";
import { Box, Heading, Link, Input, Button, VStack, Spacer, Text } from '@chakra-ui/react';
import {  useNavigate ,Link as RouterLink, Navigate } from 'react-router-dom';
import { reset_password } from "../../redux/actions/auth";
import { connect } from 'react-redux';
import Layout from '../../hooks/Layout';
import { CloseIcon } from "@chakra-ui/icons";


function ForgotPassword({reset_password, loading}){
  
    useEffect(() => {
      window.scrollTo(0, 0);
    
    },[])
    
    const navigate = useNavigate();
  
    const [formData, setFormData] = React.useState({
      email: '',
    })

    const [requestSend, setRequestSent] = useState(false)
  
    const {email} = formData;
  
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  
    const onSubmit = e => {
      e.preventDefault();
      reset_password(email);
      setRequestSent(true);
    }
    
    if(requestSend && !loading){
        return <Navigate to='/signin'/>
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
          position="relative"
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
            Recuperar
          </Heading>
          <Text>Para poder recuperar tu contraseña, necesitamos tu correo electrónico:</Text>
          <form onSubmit={e => onSubmit(e)}>
          <Input
            value={email}
            name='email'
            placeholder="Correo electrónico"
            size="lg"
            variant="filled"
            onChange={e => onChange(e)}
            mt={4}
            mb={4}
            required
          />

          <Button colorScheme="blue" type='submit'size="lg" mr={5} width="50%">
            Enviar
          </Button>
          </form>
        
        </Box>
          </VStack>
        </Layout>
      )
  }
  
  const mapStateToProps = state => ({
     loading: state.Auth.loading
  })
  
  export default connect(mapStateToProps, {
        reset_password
  })(ForgotPassword);