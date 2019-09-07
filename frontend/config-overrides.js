const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
      modifyVars: { 
          "@layout-body-background": "#f4f4f4",
          "@layout-header-background": "#ffffff",
          "@layout-footer-background": "#189eff" 
      },
      javascriptEnabled: true
    })(config, env);
    return config;
};