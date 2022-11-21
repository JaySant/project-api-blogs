const { BlogPost, User, Category, PostCategory } = require('../models');

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

const getPostId = async (id) => {
    const postsId = await BlogPost.findOne(
        { where: { id },
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
    },
    );

    return postsId;
};

const createPost = async (id, title, content, categoryIds) => {
   const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
 if (categoryIds.length !== count) {
    const error = new Error('one or more "categoryIds" not found');
    error.status = 400;
    throw error;
}  
  const { dataValues } = await BlogPost.create({ 
    userId: Number(id), title, content, categoryIds, published: new Date(), updated: new Date() });
    console.log(dataValues);

    const categories = categoryIds.map((category) => ({
        postId: dataValues.id,
        categoryId: category,
    }));

    await PostCategory.bulkCreate(categories);
    return dataValues;
};

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const get = await getPostId(id);
  return get;
};

const removePost = async (id, user) => {
    const data = await getPostId(id);

    if (data === null) {
        const error = new Error('Post does not exist');
        error.status = 404;
        throw error;
    }

    if (data.dataValues.userId !== user.id) {
        const error = new Error('Unauthorized user');
        error.status = 401;
        throw error;
    }

    const postRemoved = await BlogPost.destroy({ where: { id } });
    console.log('função para remover', postRemoved);
    return postRemoved;
};

module.exports = { 
    postAll,
    getPostId,
    removePost,
    createPost,
    updatePost,
};