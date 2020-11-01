const express = require('express')
const app = express()

// 静态资源缓存一个小时
app.use(express.static(__dirname + '/dist', { maxAge: 1000 * 3600 }))
app.listen(3000, () => console.log('http://localhost:3000'))