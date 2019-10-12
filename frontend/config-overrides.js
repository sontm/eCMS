const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      "@primary-color": "#1890FF",
      "@layout-body-background": "#f4f4f4",
      "@layout-header-background": "#189eff",
      "@layout-footer-background": "#189eff"
    }
  })
);