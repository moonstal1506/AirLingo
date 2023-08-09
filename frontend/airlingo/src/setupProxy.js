const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/dictionary",
        createProxyMiddleware({
            target: "https://glosbe.com",
            changeOrigin: true,
            // pathRewrite: { "^/dictionary": "" },
        }),
    );
};
