
module.exports = {
devServer: {
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      '/service': {
          target: 'http://localhost',  // target host
          ws: false,  // proxy websockets 
          changeOrigin: true,  // needed for virtual hosted sites
          pathRewrite: {
            '^/service': ''
        }
      },
    } 
}
}