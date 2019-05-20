const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  shorten_url: {
    type: String,
    required: true
  },
  true_url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
