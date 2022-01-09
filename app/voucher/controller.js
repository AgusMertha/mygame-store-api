const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus}
      const vouchers = await Voucher.find().populate('category').populate('nominals')

      res.render('admin/voucher/view_voucher', {
        alert,
        vouchers
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/voucher')
    }
  },
  viewCreate: async(req, res) => {
    try {
      const categories = await Category.find()
      const nominals = await Nominal.find()
      res.render('admin/voucher/create', {
        categories,
        nominals
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/voucher')
    }
  },
  postVoucher: async(req, res) => {
    try {
      const {name, category, nominals} = req.body

      if(req.file){
        // upload thumbnail
        let tmp_path = req.file.path
        let originalExtension = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
        let filename = req.file.filename + '.' + originalExtension
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename
            })

            await voucher.save()

            req.flash('alertMessage', 'Berhasil tambah voucher')
            req.flash('alertStatus', 'success')

            res.redirect('/voucher')
          } catch (error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')

            res.redirect('/voucher')
          }
        })
      }else{
        const voucher = new Voucher({
          name,
          category,
          nominals
        })

        await voucher.save()

        req.flash('alertMessage', 'Berhasil tambah voucher')
        req.flash('alertStatus', 'success')

        res.redirect('/voucher')
      }

      
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/voucher')
    }
  },
  viewEdit: async(req, res) => {
    try {
      const {id} = req.params
      
      const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals')
      const categories = await Category.find()
      const nominals = await Nominal.find()

      res.render('admin/voucher/edit', {
        categories,
        nominals,
        voucher
      })
    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')

      res.redirect('/voucher')
    }
  }
}