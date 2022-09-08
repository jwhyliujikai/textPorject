module.exports = {
    publicPath: './',
    assetsDir: './',
    lintOnSave: false,
    devServer: {
        open: true,
        https: false,
        hotOnly: true,
        disableHostCheck: true,
        proxy: {
            "/api/muyuan-hr-recruit/recruit": {
                target: "http://fenglangjuxuyinshan.com/", // 测试环境
                ws: true,
                pathRewrite: {
                    "^/api/muyuan-hr-recruit/recruit": "/test/recruit"
                }
            },
            "/imgApi": {
                target: "http://10.106.16.111:30010/", // 测试环境
                // target: "http://10.108.211.104:8209", // ip
                ws: true,
                pathRewrite: {
                    "^/imgApi": ""
                }
            },
        }
    },
}