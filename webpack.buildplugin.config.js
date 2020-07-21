const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    return{  
        watch: true,
        entry: './src/plugin/simpleslider.ts',
        devtool: false,
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,                    
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
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: './simpleslider.jquery.js',
            path: path.resolve(__dirname, './plugindist'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './style.css'
            }),            
            new CopyWebpackPlugin({
                patterns: [
                    { from: './node_modules/jquery/dist/jquery.js', to: './lib/jquery.js' },
                ],
            }),
        ],
    }
};