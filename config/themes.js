const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')
const themePath = path.join(__dirname, '../src/statics/css/themes.less')
const theme = lessToJs(fs.readFileSync(themePath, 'utf8'))
export default theme
