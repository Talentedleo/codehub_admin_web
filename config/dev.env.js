'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //URL地址是本地启动的easy-mock新建的项目的BASE-URL
  //BASE_API: '"http://192.168.12.19:7300/mock/5c0fccff21b9fe089205875a/tensquare"'
  BASE_API: '"http://127.0.0.1:9011"'
})