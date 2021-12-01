const express = require ('express');
const usersController = require('../controllers/usersController');
const router = express.Router();


router.get('/', (req, res) =>{
    res.send({
        message: 'Hello world'
    });
});
router.post('/register', usersController.createAccount);
router.post('/login', usersController.login);






module.exports = router;






