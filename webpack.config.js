const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/dist/'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            { 
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8082,
        hot: true,
        historyApiFallback: true // why is this needed? w/out manual routes fail on dev mode!
    },
    resolve: {
        extensions: ['.tsx', '.js'],
      }
};