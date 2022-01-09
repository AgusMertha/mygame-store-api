var express = require('express');
var router = express.Router();
const {index, viewCreate, postCategory, viewEdit, updateCategory, deleteCategory } = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCreate)
router.post('/create', postCategory)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', updateCategory)
router.delete('/delete/:id', deleteCategory)

module.exports = router;