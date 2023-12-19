import React from "react";
import {
  Box,
  Card,
  Center,
  Text,
  IconButton,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { Grid } from "react-loader-spinner";

const AddTaskCard = () => {
  return (
    <SimpleGrid>
      <GridItem>
        <Link to="/task/create">
          <Card
            borderRadius="lg"
            p="4"
            cursor="pointer"
            _hover={{ shadow: "md" }}
          >
            <Center flexDirection="column">
              <IconButton
                icon={<AddIcon />}
                fontSize="24px"
                color="blue.500"
                aria-label="Agregar tarea"
                mb="2"
              />
              <Text fontWeight="bold" fontSize="lg">
                Agregar tarea
              </Text>
            </Center>
          </Card>
        </Link>
      </GridItem>
    </SimpleGrid>
  );
};

export default AddTaskCard;
