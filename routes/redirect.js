const express = require('express')
const router = express.Router()
const Url = require('../models/url')

router.get('/:shorten_url', (req, res) => {
  Url.findOne({ shorten_url: req.params.shorten_url }, (err, url) => {
    if (err) throw err
    if (url) {
      res.redirect(url.true_url)
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router
