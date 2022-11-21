const express = require('express');
const userControllers = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', userControllers.create);
router.get('/:id', authMiddleware.validateToken, userControllers.getId);
router.get('/', authMiddleware.validateToken, userControllers.getAll);
router.delete('/me', authMiddleware.validateToken, userControllers.deleteUser);

module.exports = router;