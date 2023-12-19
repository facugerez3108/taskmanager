import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

import userRoutes from './src/routes/users.routes.js'
import taskRoutes from './src/routes/task.routes.js'
import authRoutes from './src/routes/auth.routes.js'


const app = express()

//Import Rutas

//Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'hhtp://127.0.0.1:3000'],
    credentials: true,
    exposedHeaders: ['Authorization', 'Set-Cookie']
}))
app.use(morgan('dev'))
app.use(cookieParser('MY_SECRET'))


//Rutas
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

// Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  });

export default app;