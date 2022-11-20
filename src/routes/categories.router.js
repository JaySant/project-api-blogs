const express = require('express');
const categoriesControllers = require('../controllers/categories.controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware.validateToken, categoriesControllers.newCategory);
router.get('/', authMiddleware.validateToken, categoriesControllers.categoryAll);

module.exports = router;