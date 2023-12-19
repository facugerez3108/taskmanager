import React, {useEffect, useState} from 'react'
import {Box, Flex, Card, Input, Button, CardHeader, Heading, Text, CardBody, CardFooter, Textarea} from '@chakra-ui/react'
import Layout from '../../hooks/Layout'
import { connect } from 'react-redux'
import { create_task } from '../../redux/actions/task'
import { useNavigate } from 'react-router-dom'


function CreateTask ({create_task}) {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    

    const navigate = useNavigate();
    const [taskChangue, setTaskChangue]  = useState(false)

    const [formData, setFormData] = useState({
        'title': '',
        'description': '',
    })

    const { title, description } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        create_task(title, description);
        setTaskChangue(true)
        navigate('/');
    }

    return (
        <Layout>
            <Flex alignItems="center" justifyContent='center' mt={9}>
                <Card>
                    <form onSubmit={e => onSubmit(e)}>
                        <CardHeader>
                            <Heading size="md">
                                <Text >Titulo</Text>
                                <Input
                                    type='text'
                                    mt={2}
                                    name='title'
                                    value={title}
                                    onChange={e => onChange(e)}
                                    required
                                >
                                </Input>
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Heading size="md">
                                <Text >Descripción</Text>
                                <Textarea
                                    type='text'
                                    mt={2}
                                    name='description'
                                    value={description}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </Heading>
                        </CardBody>
                        <CardFooter borderTop='1px black solid'>
                            <Button colorScheme="green" type='submit' size="lg" width="100%">
                                Guardar 
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Flex>
        </Layout>
    )
}

const mapStateToProps = state => ({
    task: state.Task.task
})

export default connect(mapStateToProps, {create_task})(CreateTask)