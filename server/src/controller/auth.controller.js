import { User } from '../models/User.js'
import { createAccessToken, createResetPasswordToken } from '../libs/jsonwtoken.js'
import { sendResetPasswordEmail } from './email.controller.js'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'



export const signin = async (req, res) => {
    
    const { email, password } = req.body;
    
    const result = await User.findOne({
        where: {email}
    })

    if(!result){
        return res.status(400).json({message: "Email does not exist"})
    }

    const validPassword = await bcrypt.compare(password, result.password)

    if(!validPassword){
        return res.status(400).json({message: "Invalid password"})
    }

    const token = await createAccessToken({id: result.id})

    res.cookie("Authorization", token, {
        hhtpOnly: true,
        secure: false,
        sameSite: "Strict",
        path: "/",
        signed: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 dia
    })

    //return res.json(result)
    res.send()
}

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        });

        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const token = await createResetPasswordToken(user.id);

        console.log("Token a punto de ser enviado por correo:", token);
        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 dia
        })

        sendResetPasswordEmail(req.body.email, token);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export const resetPassword = async (req, res) => {

    const userId = req.userId

    if(!userId) {
        return res.status(400).json({ message: "Invalid token" });
    }
    
    console.log("Token recibido en resetPassword:", req.params.token);

    try{

       const newPassword = req.body.password;
       const encryptedPassword = await bcrypt.hash(newPassword, 10);

       await User.update(
           { password: encryptedPassword },
           { where: { id: userId } }
       );

       return res.json({ message: "Password updated successfully" });

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }
}
    
export const logout = (req, res) => {
    res.clearCookie("Authorization")
    res.sendStatus(200)
}

export const check_authenticated = (req, res) => {
    
    const token = req.headers.cookie

    if(!token){
        return res.sendStatus(401)
    }

    res.send('ok')

}