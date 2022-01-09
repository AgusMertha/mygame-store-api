const mongoose = require('mongoose')
const  { mongoUrl } = require('../config')

mongoose.connect(mongoUrl, {})

const db = mongoose.connection
module.exports = db