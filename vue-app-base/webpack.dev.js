const webpack = require('webpack')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')

// class deleteNotePlugin {
//     apply(complier){
//         complier.hooks.emit.tap('deleteNotePlugin', compilation =>{
//             // console.log(typeof compilation.assets)
//             for( let name in compilation.assets){
//                 if(name.endsWith('.js')){
//                     const content = compilation.assets[name].source()
//                     const newContent = content.replace(/\/\/*\*+\*\//g, '')
//                     compilation.assets[name] = {
//                         source: () => newContent,
//                         size: () => newContent.length
//                     }
//                 }
//             }
//         })
//     }
// }

module.exports = merge(common,{
    mode: 'development',
    devServer:{
        open:true,
        port:8989,
        contentBase: './public',
        hot:true,
        proxy: {
            '/pxr': {
                target: 'https://api.github.com',
                pathRewrite: {'^/pxr' : ''},
                changeOrigin: true
            }
        }
    },
    devtool: 'cheap-module-eval-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})