const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/authJwt');
const errHanddler = require('../middlewares/errorHanddler');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.use(auth.authentication);
router.use(errHanddler)

module.exports = router;
