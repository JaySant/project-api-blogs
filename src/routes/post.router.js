const express = require('express');
const postControllers = require('../controllers/post.controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware.validateToken, postControllers.createPost);
router.get('/', authMiddleware.validateToken, postControllers.postAll);
router.get('/:id', authMiddleware.validateToken, postControllers.getPostId);
router.put('/:id', authMiddleware.validateToken, postControllers.updatePost);
router.delete('/:id', authMiddleware.validateToken, postControllers.removePost);

module.exports = router;