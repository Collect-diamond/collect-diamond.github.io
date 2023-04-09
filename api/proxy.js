/*
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
	let target = "";

	// 代理目标地址
	// 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
	if (req.url.startsWith("/backend")) {
		target = "https://ipapi.co";
	}

	// 创建代理对象并转发请求
	createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			// 通过路径重写，去除请求路径中的 `/backend`
			// 例如 /backend/user/login 将被转发到 https://ipapi.co
			"^/backend/": "/",
		},
	})(req, res);
};
*/
const { createProxyMiddleware } = require("http-proxy-middleware");
const requestIp = require("request-ip");

module.exports = (req, res) => {
	let target = "";

	if (req.url.startsWith("/backend")) {
		target = "https://ipapi.co";
	}

	const proxy = createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			"^/backend/": "/",
		},
	});

	// 添加一个中间件来处理请求并提取 IP 地址
	const middleware = function (req, res, next) {
		const clientIp = requestIp.getClientIp(req);
		req.headers["x-forwarded-for"] = clientIp;
		next();
	};

	// 将中间件插入到代理的“栈”中
	proxy.stack.unshift(middleware);

	// 使用修改后的 proxy 处理请求
	proxy(req, res);
};
