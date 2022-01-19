const Voucher = require('../voucher/model')
const Player = require('./model')

module.exports = {
  landingPage: async(req, res) => {
    try {
      const voucher = await Voucher.find().select("_id name status category thumbnail").populate('category')

      res.status(200).json({
        data: voucher
      })
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Terjadi kesalahan pada server'
      })
    }
  }
}