import { Router } from "express";
import { 
    createTask, 
    getTasks, 
    getTask, 
    updateTask, 
    deleteTask 
} from "../controller/task.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";


const router = Router();

router.get('/tasks', isAuth, getTasks)

router.get('/task/:id', isAuth, getTask)

router.post('/task/create', isAuth, createTask)

router.put('/task/update/:id', isAuth, updateTask)

router.delete('/task/:id', isAuth, deleteTask)


export default router;