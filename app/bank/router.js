const express = require('express');
const router = express.Router();
const {index, viewCreate, postBank, viewEdit, updateBank, deleteBank} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', postBank)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', updateBank)
router.delete('/delete/:id', deleteBank)

module.exports = router