const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  shorten_url: {
    type: String,
    unique: true,
    required: true
  },
  true_url: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
