const Bank = require('./model')

module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }

      const banks = await Bank.find()

      res.render('admin/bank/view_bank', {banks, alert})
    } catch (error) {
      
    }
  },
  viewCreate: async(req, res) => {
    try {
      res.render('admin/bank/create')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/bank')
    }
  },
  postBank: async(req, res) => {
    try {
      const {name, bankName, bankAccount} = req.body
      let bank = await Bank({name, bankName, bankAccount})
      await bank.save()

      req.flash('alertMessage', "Berhasil tambah bank")
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/bank')
    }
  },
  viewEdit: async(req, res) => {
    try {
      const {id} = req.params
      const bank = await Bank.findOne({_id: id})

      res.render('admin/bank/edit', {bank})
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/bank')
    }
  },
  updateBank: async(req, res) => {
    try {
      const {id} = req.params
      const {name, bankName, bankAccount} = req.body

      await Bank.findOneAndUpdate({_id: id}, {name, bankName, bankAccount})

      req.flash('alertMessage', "Berhasil ubah bank")
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/bank')
    }
  },
  deleteBank: async(req, res) => {
    try {
      const {id} = req.params

      await Bank.findOneAndRemove({_id: id})

      req.flash('alertMessage', "Berhasil ubah bank")
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/bank')
    }
  }
}