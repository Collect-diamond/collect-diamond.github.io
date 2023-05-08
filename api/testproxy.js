const { createProxyMiddleware } = require("http-proxy-middleware");
const requestIp = require("request-ip");

module.exports = async (req, res) => {
	try {
		const api_key = "69eea6af430b21f802683f2d9b198ba8";
		// 获取用户IP地址
		const ip = await requestIp.getClientIp(req);

		if (!ip) {
			// 没有获取到用户IP地址，返回错误信息
			return res.status(400).send("Unable to get user IP address");
		}

		const target = `http://api.ipapi.com/api/${ip}
    ? access_key = ${api_key}`;

		// 创建代理对象并转发请求
		createProxyMiddleware({
			target,
			changeOrigin: true,
			secure: false,
			headers: {
				Connection: "keep-alive",
			},
			pathRewrite: {
				"^/backend/": "/",
			},
		})(req, res);
	} catch (error) {
		// 出错处理逻辑
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};
