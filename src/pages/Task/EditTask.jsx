import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_task, update_task} from "../../redux/actions/task";
import { connect } from "react-redux";
import {
  Flex,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Layout from "../../hooks/Layout";
import { useNavigate } from "react-router-dom";

function EditTask({ get_task, task, update_task }) {
 

  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  

  useEffect(() => {
    window.scrollTo(0, 0);
    get_task(id);
  }, []);

  // ACTUALIZA LA TAREA CON LOS DATOS DEL FORMULARIO
  useEffect(() => {
      if(task){
         setFormData({
            title: task.title,
            description: task.description
         })
      }
  }, [task])

    // Manejar cambios en campos de input
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    // Manejar envío del formulario
    const handleSubmit = (e) => {
      e.preventDefault();
      const { title, description } = formData;
      
      // Llamar a la función para actualizar la tarea
      update_task(id, title, description);
      navigate('/');
    };


  return (
    <>
      <Layout>
        <Flex alignItems="center" justifyContent="center" mt={9}>
              <Card value={id}>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <Heading size="md">
                      <Text>Titulo</Text>
                      <Input
                        type="text"
                        mt={2}
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Heading size="md">
                      <Text>Descripción</Text>
                      <Textarea
                        type="text"
                        mt={2}
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}

                      />
                    </Heading>
                  </CardBody>
                  <CardFooter borderTop="1px black solid">
                    <Button
                      colorScheme="green"
                      type="submit"
                      size="lg"
                      width="100%"
                    >
                      Guardar
                    </Button>             
                  </CardFooter>
                </form>
              </Card>
        </Flex>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => {
    console.log('redux state', state)
    return {
        task: state.Task.task
    }
};

export default connect(mapStateToProps, { get_task, update_task })(EditTask);
