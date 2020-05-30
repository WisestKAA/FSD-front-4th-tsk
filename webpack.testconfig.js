const path = require('path');
const webpack = require ('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    watch: true,
    entry: './src/index',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, 
                        options: {
                            publicPath: './out/',
                        }
                    },
                    'css-loader', 
                    'sass-loader'
                ]                
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        hot: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],
};