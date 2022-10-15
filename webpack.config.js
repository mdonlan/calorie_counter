const path = require('path');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();

const styledComponentsTransformer = createStyledComponentsTransformer({
    getDisplayName: (filename, bindingName) => {
      let formattedFilename = '';
      filenamePaths = filename.split('/');
  
      if (filename.endsWith('index.tsx')) {
        formattedFilename = filenamePaths[filenamePaths.length - 2];
      } else {
        formattedFilename = filenamePaths[filenamePaths.length - 1];
      }
  
      return `${formattedFilename}-${bindingName}`;
    },
  });

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/dist/'),
        publicPath: ''
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
                loader: "ts-loader",
                options: {
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })

                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
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
    },
};