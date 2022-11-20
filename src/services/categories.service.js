const Joi = require('joi');
const { Category } = require('../models');

const validateBody = (parm) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });

    const { error, value } = schema.validate(parm);
    if (error) {
        error.status = 400;
        throw error;
    }
    return value;
};

const newCategory = async ({ name }) => {
    const nameCategory = await Category.create({ name });
    return nameCategory;
};

const categoryAll = async () => {
    const categories = await Category.findAll();
    return categories;
};

module.exports = {
    newCategory,
    validateBody,
    categoryAll,
};