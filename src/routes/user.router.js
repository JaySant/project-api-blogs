const express = require('express');
const userControllers = require('../controllers/user.controllers');

const router = express.Router();

router.post('/', userControllers.create);

module.exports = router;