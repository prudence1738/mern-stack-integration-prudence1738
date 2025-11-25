const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (err) { next(err); }
};

exports.createValidators = [ body('name').isLength({ min: 1 }) ];

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Category exists' });
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) { next(err); }
};
