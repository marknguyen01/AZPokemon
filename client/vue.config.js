module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:80'
            }
        }
    },
    css: {
        requireModuleExtension: false,
        loaderOptions: {
          scss: {
            additionalData: `
              @import "@/scss/_variables.scss";
              @import "@/scss/_mixins.scss";
              @import "/node_modules/bootstrap/scss/bootstrap";
              @import "@/scss/style.scss";
            `
          }
        }
    }
};