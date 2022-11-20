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

const getAll = async (_req, res) => {
    const users = await UserService.getAll();
    res.status(200).json(users);
};

const getId = async (req, res) => {
   const { id } = req.params;
    const userId = await UserService.getId(id);
    if (!userId) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    res.status(200).json(userId);
};

module.exports = {
    create,
    getAll,
    getId,
};