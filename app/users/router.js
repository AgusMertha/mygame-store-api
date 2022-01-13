const express = require('express');
const router = express.Router();

const {viewLogin, actionLogin, actionSignOut} = require('./controller')

router.get('/', viewLogin)
router.post('/', actionLogin)
router.get('/logout', actionSignOut)

module.exports = router