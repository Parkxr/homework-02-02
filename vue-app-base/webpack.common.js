const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    module : {
        rules: [
            { 
                test: /\.vue$/, 
                loader: 'vue-loader', 
            },
            {
                test:/\.css$/,
                use: [
                    
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'vue-style-loader',
                    'css-loader',
                    'less-loader']
            },
            {
                test:/\.png$/,
                use: {
                    loader:'url-loader',
                    options:{
                        limit:1*1024,
                        esModule: false
                    }
                }
                
            }
        ]
    },
    plugins:[
        new vueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            filename:'index.html',
            title: 'pxr',
            favicon:'./public/favicon.ico',
          }
        ),
        new MiniCssExtractPlugin(),
        new optimizeCssAssetsWebpackPlugin()
   ]
}