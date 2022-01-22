const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: true,
  chainWebpack: config => {
    config.resolve.alias
        .set("@", resolve("src"))
        .set("@api", resolve("src/api"))
        .set("@assets", resolve("src/assets"))
        .set("@components", resolve("src/components"))
        .set("@views", resolve("src/views"))
        .set("@utils", resolve("src/utils"))

  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }


}