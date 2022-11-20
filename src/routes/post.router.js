const express = require('express');
const postControllers = require('../controllers/post.controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', authMiddleware.validateToken, postControllers.postId);
router.get('/', authMiddleware.validateToken, postControllers.postAll);

module.exports = router;