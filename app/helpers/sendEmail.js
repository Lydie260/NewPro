const nodemailer = require('nodemailer');
const user = require('dotenv');
const pass = require('dotenv');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: user,
        pass: pass,
    }
});

const mailOptions = {
    from: user,
    to:'lmuhawemimana021@daviscollege.com',
    subject: 'subject',
    text:'the message'

};
transporter.sendMail(mailOptions,(error,info) =>{
    if(error){
        console.log(error);
    }else{
        console.log('email sent:' + info.response);
    }
});

























// const nodemailer = require('nodemailer');
// const password = require('dotenv');



// const mail = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: 'gatarelydie370@gmail.com',
//         password: password,
//     }
// });


// const mailOptions = {
//     from:'user',
//     to:'lmuhawemimana021@daviscollege.com',
//     subject:'hello student ',
//     text: 'How are you?'
// };
// transporter.sendMail(mailOptions,function(error,info){
//     if (error){
//         console.log(error);
//     } else{
//         console.log('email sent:'+ info.response);
//     }
// });


// module.exports = sendConfirmationEmail = async(name, email, token) => {
//     var transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "3efc8ed9e6aa8d",
//     pass: "e647a31c0064ba"
//   }
// });
//     console.log("check");
//     transport.sendMail({
//         from: 'gatarelydie370@gmail.com',
//         to: email,
//         subject: "please confirm your account",
//         html: `<h1>Email Confirmation</h1>
//         <h2>Hello ${name}</h2>
//         <p> Please confirm your email by clicking on the following link</p>
//         <a href=http://localhost:8081/confirm/${token}> Click here</a>
//         </div>`,
//     }).catch(err => console.log(err));
// };
