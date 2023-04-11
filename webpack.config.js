const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    output: {
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    // devtool: isProduction ? 'none' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    externals: {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    },
};