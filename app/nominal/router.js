const express = require('express');
const router = express.Router();
const {index, viewCreate, postNominal, deleteNominal, viewEdit, updateNominal} = require('./controller')

router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', postNominal)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', updateNominal)
router.delete('/delete/:id', deleteNominal)

module.exports = router;