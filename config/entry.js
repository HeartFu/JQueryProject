module.exports = {
    // 多入口文件
    index: ['babel-polyfill', './src/pages/index/index.js'],
    login: ['babel-polyfill', './src/pages/login/index.js'],
    showConsent: ['babel-polyfill', './src/pages/showConsent/index.js'],
    mederaHome: ['babel-polyfill', './src/pages/mederaHome/index.js']
}