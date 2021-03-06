const Nominal = require('./model')

module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }

      const nominals = await Nominal.find()

      res.render('admin/nominal/view_nominal',{
        name: req.session.user.name,
        nominals,
        alert
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/nominal')
    }
  },
  viewCreate: async(req, res) => {
    try {
      res.render('admin/nominal/create', {name: req.session.user.name,})
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/nominal')
    }
  },
  postNominal: async(req, res) => {
    try {
      const {coinName, coinQuantity, price} = req.body
      let nominal = await Nominal({coinQuantity, coinName, price})
      await nominal.save()

      req.flash('alertMessage', 'Berhasil tambah nominal')
      req.flash('alertStatus', 'success')

      res.redirect('/nominal')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/nominal')
    }
  },
  viewEdit: async(req, res) => {
    try {
      const  {id} = req.params
      const nominal = await Nominal.findOne({_id: id})

      res.render('admin/nominal/edit', {
        name: req.session.user.name,
        nominal
      })
    } catch (error) {
      
    }
  },
  updateNominal: async(req, res) => {
    try {
      const {id} = req.params
      const {coinName, coinQuantity, price} = req.body

      await Nominal.findOneAndUpdate({
        _id: id
      }, {coinQuantity, coinName, price})

      req.flash('alertMessage', 'Berhasil ubah nominal')
      req.flash('alertStatus', 'success')

      res.redirect('/nominal')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/nominal')
    }
  },
  deleteNominal: async(req, res) => {
    try {
      const { id } = req.params
      await Nominal.findOneAndRemove({
        _id: id
      })

      req.flash('alertMessage', "Berhasil hapus nominal")
      req.flash('alertStatus', 'success')

      res.redirect('/nominal')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/nominal')
    }
  }
}