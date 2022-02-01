const express = require('express');
const router = express.Router();
const {isLoginPlayer} = require('../middleware/auth')
const multer = require('multer')
const os = require('os')

const {landingPage, detailPage, category, checkout, historyTransactions, detailHistoryTransaction, dashboard, profile, updateProfile} = require('./controller')

router.get('/landing-page', landingPage)
router.get('/detail/:id', detailPage)
router.get('/category', category)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/history-transaction', isLoginPlayer, historyTransactions)
router.get('/history-transaction/:id', isLoginPlayer, detailHistoryTransaction)
router.get('/dashboard', isLoginPlayer, dashboard)
router.get('/profile', isLoginPlayer, profile)
router.put('/edit-profile', multer({dest: os.tmpdir()}).single('avatar'), isLoginPlayer, updateProfile)

module.exports = router