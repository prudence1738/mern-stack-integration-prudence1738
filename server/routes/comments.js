const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

router.post('/', [ body('post').exists(), body('authorName').isLength({min:1}), body('content').isLength({min:1}) ], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) { next(err); }
});

module.exports = router;
