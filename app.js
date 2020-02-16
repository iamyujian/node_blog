const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

let app = express()

// 公开资源文件
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 配置模板引擎
app.engine('html', require('express-art-template'));

// 配置body-parse
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 配置 session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由 
app.use(router)

// 配置一个处理 404 的中间件,如果所有路由都不符合就进入这个页面
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000, function () {
  console.log('running...');
})