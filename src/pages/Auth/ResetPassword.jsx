import React, { useState, useEffect } from "react";
import { Box, Heading, Link, Input, Button, VStack, Spacer, Text } from '@chakra-ui/react';
import {  useNavigate, useParams ,Link as RouterLink, Navigate } from 'react-router-dom';
import { reset_password_confirm } from "../../redux/actions/auth";
import { Oval } from "react-loader-spinner";
import { connect } from 'react-redux';
import Layout from '../../hooks/Layout';
import { CloseIcon } from "@chakra-ui/icons";


function ResetPassword({reset_password_confirm, loading}){
  
    useEffect(() => {
      window.scrollTo(0, 0);
    
    },[])
    
    const { token } = useParams();

    console.log(token)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
    })

    const [requestSent, setRequestSent] = useState(false)

    const {password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();

        reset_password_confirm(token, password)
        setRequestSent(true)
    }

    if(requestSent !== loading){
        return <Navigate to="/signin" />
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
            Nueva contraseña
          </Heading>
          <Text>Ingrese su nueva contraseña:</Text>
          <form onSubmit={e => onSubmit(e)}>
          <Input
            value={password}
            name='password'
            type="password"
            placeholder="Contraseña nueva"
            size="lg"
            variant="filled"
            onChange={e => onChange(e)}
            mt={4}
            mb={4}
            required
          />

          <Box>
            {
                loading ? <Button>
                    <Oval
                        type='Oval'
                        color="#fff"
                        width={20}
                        height={20}
                    />
                </Button> 
                
                :
                
                <Button colorScheme="blue" type='submit'size="lg" mr={5} width="50%">
                    Enviar
                </Button>
            }
          </Box>
        
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
        reset_password_confirm
  })(ResetPassword);