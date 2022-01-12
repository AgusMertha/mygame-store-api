const express = require('express');
const router = express.Router();

const {index, viewCreate, postPayment, viewEdit, updatePayment, deletePayment} = require('./controller')

router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', postPayment)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', updatePayment)
router.delete('/delete/:id', deletePayment)

module.exports = router