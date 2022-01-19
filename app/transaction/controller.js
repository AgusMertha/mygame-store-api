const Transaction = require('./model')
const Player = require('../player/model')
module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }

      const transactions = await Transaction.find().populate({ path: 'player', model: 'Player' })

      res.render('admin/transaction/view_transaction',{
        name: req.session.user.name,
        transactions,
        alert
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      console.log(error)

      res.redirect('/transaction')
    }
  },
  updateStatus: async (req, res) => {
    try {
      const {id} = req.params
      const {status} = req.query
      
      await Transaction.findOneAndUpdate({_id: id}, {status})

      req.flash('alertMessage', "berhasil ubah status")
      req.flash('alertStatus', 'success')

      res.redirect('/transaction')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/transaction')
    }
  }
}