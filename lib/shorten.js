const Url = require('../models/url')

const shorten = async true_url => {
  try {
    const urlCode = getRandomUrl(5)
    const checkUrlCode = await confirmUsable(urlCode)

    while (checkUrlCode === false) {
      shorten(true_url)
    }
    await addUrl(true_url, urlCode)
    return urlCode
  } catch (error) {
    console.warn(error)
  }
}

//確認是否重複
const confirmUsable = shorten_url => {
  return new Promise((resolve, reject) => {
    Url.findOne({ shorten_url }).exec((err, url) => {
      if (err) reject(err)
      resolve(url ? false : true)
    })
  })
}

//依照digits產生英文大小寫+數字亂數
const getRandomUrl = digits => {
  let temporaryUrl = ''
  const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < digits; i++) {
    temporaryUrl += text.charAt(Math.floor(Math.random() * text.length))
  }
  return temporaryUrl
}

//DB寫入對應的網址及縮網址
const addUrl = (true_url, shorten_url) => {
  return new Promise((resolve, reject) => {
    const newUrl = new Url({ true_url, shorten_url })
    newUrl.save(err => (err ? reject(err) : resolve(shorten_url)))
  })
}

module.exports = shorten
