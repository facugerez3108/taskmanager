import { Router } from "express";
import {signin, logout, forgotPassword, resetPassword, check_authenticated  } from '../controller/auth.controller.js'
import { verifyResetToken } from "../middleware/token.middleware.js";

//Schemas y validaciones
import { isAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signinSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post('/signin', validateSchema(signinSchema), signin)
router.post('/logout', logout)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', verifyResetToken, resetPassword)

router.post('/authenticated', isAuth, check_authenticated)

export default router;