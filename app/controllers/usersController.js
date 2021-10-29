const db = require('../database/models');
const users = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const sendEmail = require("../helpers/sendEmail");

class usersController {
    static async createAccount(req, res) {

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
        await sendEmail('lydie','gatarelydie370@gmail.com',token);
        res.json({ message: 'account created', token: token });


    }

}








module.exports = usersController;
