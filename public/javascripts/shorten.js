const Url = require('../../models/url')

const shorten = true_url => {
  return new Promise((resolve, reject) => {
    confirmUsable(5, urlCode => {
      const newUrl = new Url({
        true_url,
        shorten_url: urlCode
      })

      newUrl.save(err => {
        if (err) reject(err)
        resolve(urlCode)
      })
    })
  })
}

const confirmUsable = (digits, cb) => {
  let newUrl = getRandomUrl(digits)

  Url.findOne({ shorten_url: newUrl }).exec((err, url) => {
    if (err) throw err
    if (!url) {
      cb(newUrl)
    } else {
      return confirmUsable(digits, cb)
    }
  })
}

const getRandomUrl = digits => {
  let temporaryUrl = ''
  const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < digits; i++) {
    temporaryUrl += text.charAt(Math.floor(Math.random() * text.length))
  }
  return temporaryUrl
}

module.exports = shorten
