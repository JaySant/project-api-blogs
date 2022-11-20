const { BlogPost, User, Category } = require('../models');

const postAll = async () => {
    const posts = await BlogPost.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            {
                model: Category,
                as: 'categories',
                through: { attributes: [] },
            },
        ],
    });
    return posts;
};

const postId = async (id) => {
    const postsId = await BlogPost.findByPk(id, {
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            {
                model: Category,
                as: 'categories',
                through: { attributes: [] },
            },
        ],
    });
    return postsId;
};

module.exports = { 
    postAll,
    postId,

};