import { Task } from "../models/Task.js";
import jwt from 'jsonwebtoken';

export const createTask = async (req, res) => {
    const { title, description, done } = req.body;
    
    const token = req.signedCookies.Authorization;
    const decodedToken = jwt.verify(token, "xyz123");
    const userId = decodedToken.id;
    
    if(!userId){
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            done,
            userId
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear la tarea" });
    }

}

export const getTasks = async (req, res, next) => {
    const task = await Task.findAll()

    res.json(task)
}

export const getTask = async (req, res, next) => {
    const { id } = req.params;

    const findTask = await Task.findOne({
        where: {id}
    })

    res.json(findTask);
}


export const updateTask = async (req, res) => {
    const { title, description, done } = req.body;
    const { id } = req.params; 
    
    const token = req.signedCookies.Authorization;
    const decodedToken = jwt.verify(token, "xyz123");
    const userId = decodedToken.id;

    if(!userId){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const task = await Task.update(
            {
                title: title,
                description: description,
                done: done
            },
            {
                where: {
                    id: id
                }
            }
        )
        res.json(task);
    } catch (error) {
        console.log(error);
    }

}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.destroy({
            where: {
                id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }

}