module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-ts/'
  : '/',
  // 输出文件目录
  outputDir: 'vue-ts',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  devServer: {
    port: 8010, // 端口
    open: true
  }
};
