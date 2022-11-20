const express = require('express');
const userControllers = require('../controllers/user.controllers');

const router = express.Router();

router.post('/', userControllers.create);
router.get('/', userControllers.getAll);
router.get('/:id', userControllers.getId);

module.exports = router;