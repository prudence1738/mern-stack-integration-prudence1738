const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/', catCtrl.getAll);
router.post('/', auth, catCtrl.createValidators, catCtrl.create);

module.exports = router;
