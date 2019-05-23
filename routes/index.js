const express = require('express')
const router = express.Router()
const shorten = require('../lib/shorten')
const Url = require('../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

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

router.post('/', (req, res) => {
  Url.findOne({ true_url: req.body.true_url }).exec((err, urls) => {
    if (err) throw err

    let shorten_url = process.env.LOCAL_URL || 'http://localhost:3000/'

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
