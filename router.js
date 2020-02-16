const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5')

let router = express.Router()

router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {

  let body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message
      // })
      return next(err)
    }

    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/logout', function (req, res) {
  // 清除登录状态，重定向
  req.session.user = null
  res.redirect('/login')
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', async function (req, res) {
    // 1.获取表单提交的数据 req.body
    let body = req.body
    // 2.操作数据库
    // 判断用户是否存在
    try {
      if (await User.findOne({
          email: body.email
        })) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email is exist.'
        })
      }
      if (await User.findOne({
          nickname: body.nickname
        })) {
        return res.status(200).json({
          err_code: 2,
          message: 'Nickname is exist.'
        })
      }

      body.password = md5(md5(body.password))

      await new User(body).save()
      req.session.user = body



      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    } catch (err) {
      return next(err)
    }
  }

)

// 3.发送响应

module.exports = router