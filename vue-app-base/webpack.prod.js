const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common,{
    mode: 'production',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'output.js'
    },
    plugins:[
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),

   ]
})