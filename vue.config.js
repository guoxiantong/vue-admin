const path = require('path');

module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    lintOnSave: false,
    chainWebpack: (config) => {
    },
    configureWebpack: (config) => {
        config.resolve = {  //配置目录别名
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                // 'public': path.resolve(__dirname, './public'),
                '@c': path.resolve(__dirname, './src/components')
                // 'common': path.resolve(__dirname, './src/common'),
                // 'api': path.resolve(__dirname, './src/api'),
                // 'views': path.resolve(__dirname, './src/views'),
                // 'data': path.resolve(__dirname, './src/data')
            }
        }
    },
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            css: {},
            sass: { prependData: `@import "./src/styles/main.scss";` }
        },
        requireModuleExtension: true,
    },
    parallel: require('os').cpus.length > 1,
    pwa: {},
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hot: true,
        hotOnly: false,
        proxy: null,
        overlay: {
            warnings: true,
            error: true,
        },
        before: app => {

        },
    },
    pluginOptions: {},
}