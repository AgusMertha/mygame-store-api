var express = require('express');
var router = express.Router();
const {index, viewCreate, postCategory, viewEdit, updateCategory, deleteCategory } = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
router.get('/create', viewCreate)
router.post('/create', postCategory)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', updateCategory)
router.delete('/delete/:id', deleteCategory)

module.exports = router;