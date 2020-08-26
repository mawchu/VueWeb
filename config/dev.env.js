'use strict'
//測試環境參數設定
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH:'"https://vue-course-api.hexschool.io"',
  API_ACCOUNT:'"mawchu"'
})
