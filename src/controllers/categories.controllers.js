const CategoryService = require('../services/categories.service');

const newCategory = async (req, res) => {
    const { name } = await CategoryService.validateBody(req.body);
    res.status(201).json({ name });
};

module.exports = { newCategory };
