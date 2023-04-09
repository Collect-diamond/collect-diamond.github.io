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
	// 获取用户IP地址
	const ip = requestIp.getClientIp(req);

	const target = "";

	// 检测是否是目标请求路径
	if (req.url.startsWith("/backend")) {
		// 将目标重定向到一个新的代理服务器

		target = `https://ipapi.co/${ip}/json`;
	}

	// 创建代理对象并转发请求
	const proxy = createProxyMiddleware({
		target,
		changeOrigin: true,
		secure: false,
		headers: {
			Connection: "keep-alive",
		},
		pathRewrite: {
			"^/backend/": "/",
		},
	});

	proxy(req, res);
};
