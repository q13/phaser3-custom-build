'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

   //   mode: 'development',
   mode: 'production',

   entry: {
       'phaser-wechat': `./phaser-wechat.js`,
       'phaser-wechat.min': './phaser-wechat.js'
   },

   resolve: {
       alias: {
           'eventemitter3': path.resolve(__dirname, './node_modules/eventemitter3'),
           'lodash': path.resolve(__dirname, './node_modules/lodash')
       },
       modules: [ 'node_modules/phaser/src' ]
   },

   output: {
       path: `${__dirname}/dist/`,
       filename: '[name].js',
       library: 'Phaser',
       libraryTarget: 'umd',
       sourceMapFilename: '[file].map',
       devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
       devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
       umdNamedDefine: true
   },

   performance: { hints: false },

   optimization: {
       minimizer: [
           new UglifyJSPlugin({
               include: /\.min\.js$/,
               parallel: true,
               sourceMap: false,
               uglifyOptions: {
                   compress: true,
                   ie8: false,
                   ecma: 5,
                   output: {comments: false},
                   warnings: false
               },
               warningsFilter: () => false
           })
       ]
   },

   plugins: [
        new webpack.DefinePlugin({
           "typeof CANVAS_RENDERER": JSON.stringify(true),
           "typeof WEBGL_RENDERER": JSON.stringify(true),
           "typeof EXPERIMENTAL": JSON.stringify(false),
           "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
           "typeof PLUGIN_FBINSTANT": JSON.stringify(false)
        }),
        new webpack.NormalModuleReplacementPlugin(
            /ImageFile\.js/,
            // function(resource) {
            //     console.log(123, resource.request);
            // },
            path.resolve(__dirname, './wechat-adapter/loader/filetypes/ImageFile.js')
        ),
       new CleanWebpackPlugin()
   ],

   devtool: 'source-map'

};
