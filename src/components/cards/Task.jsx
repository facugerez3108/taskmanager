import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddTaskCard from "./AddTask";
import DeleteConfirm from "../confirm/DeleteConfirm";

const CardTask = ({ data, delete_task }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(( ) => {
    console.log(data)
  }, [data])

  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(data);

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleted = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Flex ml={5} justifyContent="center" alignItems="center">
        <SimpleGrid columns={4} gap={8} mt={7}>
          {data &&
            Array.isArray(data) &&
            data.map((task) => (
              <GridItem key={task.id}>
                <Card>
                  <CardHeader>
                    <Heading size="md">
                      <Link to={`/task/${task.id}`}>{task.title}</Link>
                    </Heading>
                  </CardHeader>
                  <CardBody>{task.description}</CardBody>
                  <CardFooter borderTop="1px solid black">
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteClick(task)}
                      mx="20px"
                    >
                      Eliminar
                    </Button>
                    <Button
                      as={Link}
                      to={`/task/update/${task.id}`}
                      colorScheme="purple"
                      mx="20px"
                    >
                      Editar
                    </Button>
                    {selectedTask && (
                      <DeleteConfirm
                        task={selectedTask}
                        delete_task={delete_task}
                        onCancel={() => setSelectedTask(null)}
                        onDeleted={() => {
                          const updatedTasks = tasks.filter((t) => t.id !== task.id);
                          setTasks(updatedTasks);
                          console.log("updatetask llamado", updatedTasks)
                          console.log(" ondeleted llamado")
                        }}
                      
                      />
                        
                    )}
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          <GridItem>
            <AddTaskCard />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default connect(null, {
})(CardTask);
