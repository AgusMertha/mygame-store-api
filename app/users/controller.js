const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
  viewLogin: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }

      if(req.session.user == null || req.session.user == undefined){
        res.render('admin/users/view_login', {alert})
      }else{
        res.redirect('/dashboard')
      }
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/')
    }
  },
  actionLogin: async(req, res) => {
    try {
      const {email, password} = req.body

      // check user exists
      const userCheck = await User.findOne({email: email})

      if(userCheck){
        if(userCheck.status == 'Y'){
          const passwordCheck = await bcrypt.compare(password, userCheck.password)
          if(passwordCheck){
            req.session.user = {
              id: userCheck._id,
              email: userCheck.email,
              status: userCheck.status,
              name: userCheck.name
            }
            res.redirect('/dashboard')
          }else{
            req.flash('alertMessage', "Kata sandi salah")
            req.flash('alertStatus', 'danger')

            res.redirect('/')
          }
        }else{
          req.flash('alertMessage', "Status anda belum aktif")
          req.flash('alertStatus', 'danger')

          res.redirect('/')
        }
      }else{
        req.flash('alertMessage', "Email salah")
        req.flash('alertStatus', 'danger')

        res.redirect('/')
      }
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/')
    }
  },
  actionSignOut: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }
}