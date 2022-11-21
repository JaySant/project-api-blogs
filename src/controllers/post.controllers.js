const PostService = require('../services/post.service');

const postAll = async (_req, res) => {
    const post = await PostService.postAll();
    res.status(200).json(post);
};

const getPostId = async (req, res) => {
    const { id } = req.params;
     const postsId = await PostService.getPostId(id);
     if (!postsId) {
         return res.status(404).json({ message: 'Post does not exist' });
     }
     res.status(200).json(postsId);
 };

 const removePost = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    await PostService.removePost(id, user);
    return res.status(204).end();
 };

 const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    if (!title || !content || !categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const result = await PostService.createPost(id, title, content, categoryIds);
    return res.status(201).json(result);
 };

module.exports = {
    postAll,
    getPostId,
    removePost,
    createPost,
};