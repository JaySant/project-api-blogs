const Joi = require('joi');
const jwtUtil = require('../utils/jwt.utils');
const { User } = require('../models');

const validateBody = (parm) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error, value } = schema.validate(parm);
    if (error) {
        error.status = 400;
        error.message = 'Some required fields are missing';
        throw error;
    }
    return value;
};

const validateLogin = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    
    if (!user || user.password !== password) {
        const error = new Error();
        error.message = 'Invalid fields';
        error.status = 400;
        throw error;
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwtUtil.createToken(userWithoutPassword);
    return token;
};

module.exports = {
    validateBody,
    validateLogin,
};