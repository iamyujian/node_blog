const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let Schema = mongoose.Schema

let userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 这里的data.now 后面不能加()，因为会立即执行
    // 这里直接给一个方法，当new 的时候，才会执行
    default: Date.now
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录使用
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)