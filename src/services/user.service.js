const Joi = require('joi');
const { User } = require('../models');
const jwtUtil = require('../utils/jwt.utils');

const validateBody = (parm) => {
    const schema = Joi.object({
        displayName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.string().optional(),
    });

    const { error, value } = schema.validate(parm);
    if (error) {
        error.status = 400;
        throw error;
    }
    return value;
};

const isValidated = async (email) => {
    const userEmail = User.findOne({ where: { email } });
  return userEmail;
};

const create = async ({ displayName, email, password, image }) => {
    const userCreate = await User.create({ displayName, email, password, image });

    const { password: _, ...userWithoutPassword } = userCreate.dataValues;
    const token = jwtUtil.createToken(userWithoutPassword);
    return token;
};

const validateToken = (token) => {
    if (!token) {
        const e = new Error('Token obrigatório!');
        e.status = 401;
        throw e;
    }

    const user = jwtUtil.validateToken(token);

    return user;
};

const getAll = async () => {
    const user = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return user;
};

const getId = async (id) => {
    const userId = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
    });
    return userId;
};

const deleteUser = async (user) => {
    await User.destroy({ where: { id: user.id } });
};

module.exports = {
    validateBody,
    isValidated,
    validateToken,
    create,
    getAll,
    getId,
    deleteUser,
};