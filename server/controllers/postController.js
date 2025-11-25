const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.listValidators = []; // pagination/search handled via query

exports.list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const q = req.query.q ? { $text: { $search: req.query.q } } : {};
    // if asking by category id
    if (req.query.category) q.categories = req.query.category;

    const [items, total] = await Promise.all([
      Post.find(q).populate('author', 'username').populate('categories').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.countDocuments(q)
    ]);

    res.json({ items, meta: { page, limit, totalPages: Math.ceil(total/limit), total } });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('categories');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.createValidators = [
  body('title').isLength({ min: 1 }),
  body('body').isLength({ min: 1 })
];

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, body: content, categories = [] } = req.body;
    const featuredImage = req.file ? `/${process.env.UPLOAD_DIR || 'uploads'}/${req.file.filename}` : undefined;
    const post = new Post({
      title,
      body: content,
      featuredImage,
      author: req.user._id,
      categories
    });
    await post.save();
    await post.populate('author', 'username').execPopulate();
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.updateValidators = [
  body('title').optional().isLength({ min: 1 }),
  body('body').optional().isLength({ min: 1 })
];

exports.update = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    if (req.file) post.featuredImage = `/${process.env.UPLOAD_DIR || 'uploads'}/${req.file.filename}`;
    ['title', 'body', 'categories'].forEach(field => {
      if (req.body[field] !== undefined) post[field] = req.body[field];
    });
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

// comments for a post (simple)
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { next(err); }
};
