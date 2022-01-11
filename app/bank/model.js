const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama pemilik harus diisi']
  },
   bankName: {
    type: String,
    require: [true, 'Nama bank harus diisi']
  },
  bankAccount: {
    type: String,
    require: [true, 'Nomor rekening harus diisi']
  }
})

module.exports = mongoose.model('Bank', bankSchema)