const express = require('express');
const router = express.Router();
const multer = require('multer')
const os = require('os')
const  {index, viewCreate, postVoucher, viewEdit, updateVoucher, deleteVoucher, updateStatus} = require('./controller')

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({dest: os.tmpdir()}).single('thumbnail'), postVoucher);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id',multer({dest: os.tmpdir()}).single('thumbnail'), updateVoucher);
router.delete('/delete/:id', deleteVoucher);
router.post('/update-status/:id', updateStatus);

module.exports = router