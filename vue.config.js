const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: '/', // 这样表示相对路径， 可以部署在任意路径下，如果为 / 则只能在nginx的html的根路径下面，如果指定为/app/ ，则可以部署在/app下面，默认为/
    outputDir: 'dist', // 构建输出目录
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: "static",
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        if (process.env.NODE_ENV === 'production') {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugins.delete('prefetch')
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css$|\.mp3/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }
    },
}