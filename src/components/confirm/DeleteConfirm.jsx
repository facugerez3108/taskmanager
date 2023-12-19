import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { delete_task } from "../../redux/actions/task";

function DeleteConfirm({ delete_task, onCancel, onDeleted, task }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onDeleted(); 
    onCancel(); 
  };

  const handleDelete = (id) => {
    delete_task(id);
    handleClose(); 
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={null} onClose={handleClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Borrar Tarea
            </AlertDialogHeader>
            <AlertDialogBody>Estas seguro que quieres eliminar esta tarea?</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={() => handleDelete(task.id)} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default connect(null, { delete_task })(DeleteConfirm);