const express = require('express');
const router = express.Router();
const multer = require('multer')
const os = require('os')
const  {index, viewCreate, postVoucher, viewEdit} = require('./controller')

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({dest: os.tmpdir()}).single('thumbnail'), postVoucher);
router.get('/edit/:id', viewEdit);

module.exports = router