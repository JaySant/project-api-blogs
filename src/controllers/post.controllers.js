const PostService = require('../services/post.service');

const postAll = async (_req, res) => {
    const post = await PostService.postAll();
    res.status(200).json(post);
};

const postId = async (req, res) => {
    const { id } = req.params;
     const postsId = await PostService.postId(id);
     if (!postsId) {
         return res.status(404).json({ message: 'Post does not exist' });
     }
     res.status(200).json(postsId);
 };

module.exports = {
    postAll,
    postId,
};