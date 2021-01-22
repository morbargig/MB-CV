const webpack = require('webpack');

module.exports = {

    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: {

        //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
        resolve: {
            symlinks: false
        }
    },
    css: {
        loaderOptions: {
            css: {
                url: false,
            },
            less: {
                appendData: `@import "@/assets/less/variables.less";`
            }
        }
    },
}
