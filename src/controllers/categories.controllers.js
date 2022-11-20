const CategoryService = require('../services/categories.service');

const newCategory = async (req, res) => {
    const { name } = await CategoryService.validateBody(req.body);
    res.status(201).json({ name });
};

const categoryAll = async (_req, res) => {
    const categories = await CategoryService.categoryAll();
    res.status(200).json(categories);
};
module.exports = { 
    newCategory, 
    categoryAll,
};
