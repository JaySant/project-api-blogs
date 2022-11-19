const UserService = require('../services/user.service');

const create = async (req, res) => {
    const { displayName, email, password, image } = UserService.validateBody(req.body);
    const validateEmail = await UserService.isValidated(email);
    if (validateEmail) {
         return res.status(409).json({ message: 'User already registered' });
    }
    const token = await UserService.create({ displayName, email, password, image });
    res.status(201).json({ token });
};

module.exports = {
    create,
};