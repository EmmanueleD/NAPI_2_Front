module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/projects/guelcom-app' : '/',
      chainWebpack: config => {
            config.module
              .rule('images')
                .set('parser', {
                  dataUrlCondition: {
                    maxSize: 4 * 1024 // 4KiB
                  }
                })
          }
}