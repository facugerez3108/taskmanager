import { createAccessToken } from '../libs/jsonwtoken.js';
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const createUser = async (req, res, next) => {
    
    const { username, email, password } = req.body;

    try {

        const existEmail = await User.findOne({
            where: {email}
        });
        if (existEmail){
            return res.status(400).json({message: "Email already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        }, 
        
        {
            fields: ["username", "email", "password"]
        });

        const token = await createAccessToken({id: newUser.id})

        res.cookie("token", token, {
            hhtpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.json(newUser)

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

export const getUsers = async (req, res, next) => {
    const users = await User.findAll()

    res.json(users)

}

export const getUser = async (req, res, next) => {
    const { id } = req.params

    const findUser = await User.findOne({
        where: {
            id
        }
    })

    console.log(findUser)

}

export const updateUser = async (req, res, next) => {
    const { id } = req.params

    const { username, email, password } = req.body

    const user = await User.update({
        username,
        email,
        password
    }, {
        where: {
            id
        }
    })

    console.log(user)
}

