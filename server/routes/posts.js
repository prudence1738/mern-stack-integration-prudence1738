const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// list + search + pagination
router.get('/', postCtrl.list);
router.get('/:id', postCtrl.get);

// create (auth required)
router.post('/', auth, upload.single('featuredImage'), postCtrl.createValidators, postCtrl.create);

// update
router.put('/:id', auth, upload.single('featuredImage'), postCtrl.updateValidators, postCtrl.update);

// delete
router.delete('/:id', auth, postCtrl.remove);

// comments for a post
router.get('/:id/comments', postCtrl.getComments);

module.exports = router;
