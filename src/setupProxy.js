/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/14 17:12
 */
// import axios from 'axios';
const { createProxyMiddleware } = require('http-proxy-middleware');

// 全局的 axios 默认值
// axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', {
            target: 'http://api.zhuishushenqi.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }));
    app.use(createProxyMiddleware('/chapter', {
            target: 'http://chapterup.zhuishushenqi.com/chapter',
            changeOrigin: true,
            pathRewrite: {
                '^/chapter': ''
            }
        }));
}

