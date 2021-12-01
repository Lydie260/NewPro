const env = require('dotenv');
const e = require('express');
env.config();
const nodemailer = require('nodemailer');
const user = process.env.EMAIL;
const pass = process.env.PASSWORD;



function sendEmail(message, email, token){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: user,
            pass: pass,
        }
    });
    
    const mailOptions = {
        from: user,
        to:email,
        subject: 'subject',
        text:message,
    
    };
    transporter.sendMail(mailOptions,(error,info) =>{
        if(error){
            console.log(error);
        }else{
            console.log('email sent:' + info.response);
        }
    });
}

module.exports = sendEmail;























