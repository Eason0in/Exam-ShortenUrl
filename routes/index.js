const express = require('express')
const router = express.Router()
const shorten = require('../public/javascripts/shorten')
const Url = require('../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  Url.findOne({ true_url: req.body.true_url }).exec((err, urls) => {
    if (err) throw err

    let shorten_url = 'http://localhost:3000/e/'

    if (urls) {
      shorten_url += urls.shorten_url
      res.render('index', { shorten_url })
    } else {
      ;(async () => {
        try {
          shorten_url += await shorten(req.body.true_url)
          res.render('index', { shorten_url })
        } catch (e) {
          console.warn(e)
        }
      })()
    }
  })
})

module.exports = router
