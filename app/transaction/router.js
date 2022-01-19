const express = require('express');
const router = express.Router();

const {index, updateStatus} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.put('/status/:id', updateStatus)

module.exports = router