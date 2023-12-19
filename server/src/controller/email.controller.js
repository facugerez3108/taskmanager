import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'facuugerez37@gmail.com',
        pass: 'pmcp nrgz grat cpqe'
    }
})
transport.verify().then(() => {
    console.log('Ready for send emails')
})

  

export const sendResetPasswordEmail = async (to, token) => {
    const subject = 'Reset password'
    const url = `http://localhost:3000/reset-password/${token}`
    const text = `Querido usuario,
    para re-establecer su contraseña, ingrese al siguiente link: ${url}
    Si usted no solicito este correo, por favor ignorelo`

    await sendEmail( to, subject, text )
    console.log('Email sent')
}

export const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text }
    await transport.sendMail(msg)
    console.log('Email sent')
}