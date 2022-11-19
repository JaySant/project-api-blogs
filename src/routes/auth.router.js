const express = require('express');
const authControllers = require('../controllers/authLogin.controllers');

const router = express.Router();

router.post('/', authControllers.userLogin);

module.exports = router;