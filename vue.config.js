// 경로: 루트 디렉토리/vue.config.js
const path = require('path')
module.export = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://114.202.216.45:3001/corp',
                changeOrigin: true,
                pathRewrite: {
                    '^/corp': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    },
    outputDir: './public'
}
