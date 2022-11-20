const PostService = require('../services/post.service');

const postAll = async (_req, res) => {
    const post = await PostService.postAll();
    res.status(200).json(post);
};

module.exports = {
    postAll,
};