const db = require('../database/models');
const users = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const sendEmail = require("../helpers/sendEmail");


class usersController {
    static async createAccount(req, res) {
try {
    const schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.number().max(10).required(),
        password: joi.string().min(5).max(10).required(),

    })

    const { error } = await schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const createdUser = await users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedpassword,

    });

    // const result = await schema.validateAsync(req.body)

    const dt = { id: createdUser.id, email: createdUser.email };
    const token = await jwt.sign(dt, 'secret', { expiresIn: '1h' });
    const url =`http://localhost:5000/confirmation/${token}`
    const message=`Hey  ${createdUser.firstName} Thanks for registering for an account on iReporter! Before we get started, we just need to confirm that this is you. Click below to verify your email address:<a href="${url}">${url}</a>`;
    await sendEmail(message,createdUser.email,token);
    res.json({ message: 'account created', token: token });


} catch (error) {
   console.log (error)
}
        
    }
    static async login(req, res) {
        try {
            const schema = joi.object({
                email: joi.string().email().required(),
                password: joi.string().min(5).max(10).required(),
        
            })


            const { error } = await schema.validate(req.body)
            if (error) {
                return res.status(400).json(error.details[0].message)
            }
            const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const logedUser = await users.create({
        email: req.body.email,
        password: hashedpassword,

    });
    const dt = { id: logedUser.id, email: logedUser.email };
    const token = await jwt.sign(dt, 'secret', { expiresIn: '1h' });
    // const message=`Hey  ${createdUser.firstName} Welcome to iReporter"`;
    // await sendEmail(message,createdUser.email,token);
    res.json({ message: 'log in successfull', token: token });


} catch (error) {
   console.log (error)
}
        
    }


}








module.exports = usersController;
