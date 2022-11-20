const express = require('express');
const postControllers = require('../controllers/post.controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware.validateToken, postControllers.postAll);

module.exports = router;