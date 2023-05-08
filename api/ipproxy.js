/*
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
	let target = "";

	// 代理目标地址
	// 这里使用 backend-ip 主要用于区分 vercel serverless 的 api 路径
	if (req.url.startsWith("/backend-ip")) {
		target = "https://ipapi.co";
	}

	// 创建代理对象并转发请求
	createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			// 通过路径重写，去除请求路径中的 `/backend`
			// 例如 /backend/user/login 将被转发到 https://ipapi.co
			"^/backend-ip/": "/",
		},
	})(req, res);
};
*/
const { createProxyMiddleware } = require("http-proxy-middleware");
const requestIp = require("request-ip");

module.exports = async (req, res) => {
	try {
		// 获取用户IP地址
		const ip = await requestIp.getClientIp(req);

		if (!ip) {
			// 没有获取到用户IP地址，返回错误信息
			return res.status(400).send("Unable to get user IP address");
		}

		const target = `https://ipapi.co/${ip}/json`;

		// 创建代理对象并转发请求
		createProxyMiddleware({
			target,
			changeOrigin: true,
			secure: false,
			headers: {
				Connection: "keep-alive",
			},
			pathRewrite: {
				"^/backend-ip/": "/",
			},
			cache: false, //禁用缓存
		})(req, res);
	} catch (error) {
		// 出错处理逻辑
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};
