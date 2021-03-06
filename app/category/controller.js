const Category = require('./model')

module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      const categories = await Category.find()
      res.render('admin/category/view_category',{
        name: req.session.user.name,
        categories,
        alert
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      console.log(error)
      res.redirect('/category')
    }
  },
  viewCreate: async(req, res) => {
    try {
      res.render('admin/category/create', {name: req.session.user.name,})
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/category')
    }
  },

  postCategory: async(req, res) => {
    try {
      const { name } = req.body

      // save ke mongodb
      let category = await Category({name})
      await category.save()

      req.flash('alertMessage', "Berhasil tambah kategori")
      req.flash('alertStatus', 'success')

      res.redirect('/category')

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/category')
    }
  },

  viewEdit: async(req, res) => {
    try {
      const {id} = req.params
      const category = await Category.findOne({_id: id})
      res.render('admin/category/edit', {
        name: req.session.user.name,
        category
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/category')
    }
  },
  
  updateCategory: async(req, res) => {
    try {
      const { id } = req.params
      const { name } = req.body

      await Category.findOneAndUpdate({
        _id: id
      }, { name })     
      
      req.flash('alertMessage', "Berhasil edit kategori")
      req.flash('alertStatus', 'success')

      res.redirect('/category')

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/category')
    }
  },

  deleteCategory: async(req, res) => {
    try {
      const { id } = req.params
      await Category.findOneAndRemove({
        _id: id
      })

      req.flash('alertMessage', "Berhasil hapus kategori")
      req.flash('alertStatus', 'success')

      res.redirect('/category')
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/category')
    }
  }
}