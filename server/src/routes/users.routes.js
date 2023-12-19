import { Router } from "express";
import { 
    createUser, 
    getUser, 
    getUsers 
} from '../controller/user.controller.js';

//Schemas y validaciones
import { isAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signupSchema } from "../schemas/auth.schema.js";



const router = Router();


router.get('/getUser:id', isAuth, getUser)

router.post('/signup', validateSchema(signupSchema), createUser)

router.put('/getUsers', getUsers)

export default router;