const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, "src", "index.js")],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/",
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            inject: false
        })
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    watch: true
};