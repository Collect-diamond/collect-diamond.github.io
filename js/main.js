/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//弹窗样式
iziToast.settings({
	timeout: 10000,
	progressBar: false,
	close: false,
	closeOnEscape: true,
	position: "topCenter",
	transitionIn: "bounceInDown",
	transitionOut: "flipOutX",
	displayMode: "replace",
	layout: "1",
	backgroundColor: "#00000040",
	titleColor: "#efefef",
	messageColor: "#efefef",
	icon: "Fontawesome",
	iconColor: "#efefef",
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
	element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${
		y - halfAlementWidth2 + 1
	}px)`;
}

body.addEventListener("mousemove", (e) => {
	window.requestAnimationFrame(function () {
		setPosition(e.clientX, e.clientY);
	});
});

//加载完成后执行
window.addEventListener(
	"load",
	function () {
		//载入动画
		$("#loading-box").attr("class", "loaded");
		$("#bg").css(
			"cssText",
			"transform: scale(1);filter: blur(0px);transition: ease 1.5s;"
		);
		$(".cover").css("cssText", "opacity: 1;transition: ease 1.5s;");
		$("#section").css(
			"cssText",
			"transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
		);

		//用户欢迎
		setTimeout(function () {
			iziToast.show({
				timeout: 2500,
				icon: false,
				title: hello,
				message: "Welcome to Collect_diamond's homepage",
			});
		}, 800);

		//延迟加载音乐播放器
		let element = document.createElement("script");
		element.src = "./js/music.js";
		document.body.appendChild(element);

		//中文字体缓加载-此处写入字体源文件 （暂时弃用）
		//先行加载简体中文子集，后续补全字集
		//由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
		// const font = new FontFace(
		//     "MiSans",
		//     "url(" + "./font/MiSans-Regular.woff2" + ")"
		// );
		// document.fonts.add(font);

		//移动端去除鼠标样式
		if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
			$("#g-pointer-2").css("display", "none");
		}
	},
	false
);

setTimeout(function () {
	$("#loading-text").html("字体及文件加载可能需要一定时间");
}, 3000);

// 新春灯笼 （ 需要时可取消注释 ）
// new_element=document.createElement("link");
// new_element.setAttribute("rel","stylesheet");
// new_element.setAttribute("type","text/css");
// new_element.setAttribute("href","./css/lantern.css");
// document.body.appendChild(new_element);

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/lantern.js");
// document.body.appendChild(new_element);

//获取一言
fetch("https://v1.hitokoto.cn?max_length=24")
	.then((response) => response.json())
	.then((data) => {
		$("#hitokoto_text").html(data.hitokoto);
		$("#from_text").html(data.from);
	})
	.catch(console.error);

let times = 0;
$("#hitokoto").click(function () {
	if (times == 0) {
		times = 1;
		let index = setInterval(function () {
			times--;
			if (times == 0) {
				clearInterval(index);
			}
		}, 1000);
		fetch("https://v1.hitokoto.cn?max_length=24")
			.then((response) => response.json())
			.then((data) => {
				$("#hitokoto_text").html(data.hitokoto);
				$("#from_text").html(data.from);
			})
			.catch(console.error);
	} else {
		iziToast.show({
			timeout: 1000,
			icon: "fa-solid fa-circle-exclamation",
			message: "Slow down, calm",
		});
	}
});

///////////////////////////////////////////////////////////
//-Sumulation
///////////////////////////////////////////////////////////
function getWeatherIcon(iconCode) {
	const code = {
		1: "\u2600",
		2: "\u26C5",
		3: "\u26C5",
		4: "\u26C5",
		5: "\uD83C\uDF27",
		6: "\uD83D\uDCA7",
		7: "\uD83D\uDCA7",
		8: "\uD83D\uDE25",
		11: "\uD83C\uDF29",
		12: "\uD83C\uDF27",
		13: "\uD83C\uDF27",
		14: "\uD83C\uDF27",
		15: "\uD83C\uDF27",
		16: "\u2744",
		17: "\u2744",
		18: "\uD83C\uDF28",
		19: "\uD83C\uDF2B",
		20: "\u2601",
		21: "\u2601",
		22: "\u2601",
		23: "\uD83C\uDF41",
		24: "\uD83C\uDF41",
		25: "\uD83C\uDF2C",
		26: "\uD83C\uDF27",
		29: "\uD83C\uDF2B",
		30: "\uD83C\uDF2B",
		31: "\uD83C\uDF2B",
		32: "\uD83C\uDF2B",
		33: "\u2600",
		34: "\u2601",
		35: "\uD83C\uDF27",
		36: "\u2600",
		37: "\uD83C\uDF2A",
		38: "\uD83C\uDF2A",
		39: "\uD83C\uDF27",
		40: "\uD83C\uDF27",
		41: "\uD83C\uDF28",
		42: "\uD83C\uDF28",
		43: "\u2744",
		44: "\uD83C\uDF25",
	};
	return code[iconCode] || "?";
}
function getWeather() {
	fetch("/backend-ip/")
		.then((response) => response.json())
		.then((data) => {
			console.log(data.country);
			console.log(data.region);
			console.log(data.ip);
			if (data.country == "CN") {
				console.log("这是中国国内IP");
				// 在此处执行您需要做的操作，因为这个IP地址在中国境内。
				getWeather_CN();
			} else {
				console.log("这不是中国国内IP");
				// 在此处执行您需要做的操作，因为这个IP地址不在中国境内。
				getWeather_US();
			}
		})
		.catch((error) => {
			console.error("获取IP地址时出错:", error);
			// 在此处处理错误情况
		});
}
getWeather();
//获取天气
//请前往 https://www.mxnzp.com/doc/list 申请 app_id 和 app_secret
//请前往 https://dev.qweather.com/ 申请 key
//const add_id = "opcquqnmlc0pjjgc"; // app_id
//const app_secret = "Y3VseDBQQTVNUmRIcS94RCtuV2ZKUT09"; // app_secret
//const key = "bc77fa9d5321427f918921618928efa7"; // key
function getWeather_CN() {
	const add_id = "opcquqnmlc0pjjgc"; // app_id
	const app_secret = "Y3VseDBQQTVNUmRIcS94RCtuV2ZKUT09"; // app_secret
	const key = "bc77fa9d5321427f918921618928efa7"; // key

	//-Set up timeout function catch
	let timeout = new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error("Timeout"));
		}, 10000); // 10 second timeout
	});

	fetch(
		"https://www.mxnzp.com/api/ip/self?app_id=" +
			add_id +
			"&app_secret=" +
			app_secret
	)
		.then((response) => response.json())
		.then((data) => {
			let str = data.data.city;
			let city = str.replace(/市/g, "");
			$("#city_text").html(city);
			fetch(
				"https://geoapi.qweather.com/v2/city/lookup?location=" +
					city +
					"&number=1&key=" +
					key
			)
				.then((response) => response.json())
				.then((location) => {
					let id = location.location[0].id;
					//- Fetch weather and race with timeout
					Promise.race([
						fetch(
							"https://devapi.qweather.com/v7/weather/now?location=" +
								id +
								"&key=" +
								key
						)
							.then((response) => response.json())
							.then((weather) => {
								$("#wea_text").html(weather.now.text);
								$("#tem_text").html(
									weather.now.temp + "°C&nbsp;"
								);
								$("#win_text").html(weather.now.windDir);
								$("#win_speed").html(
									weather.now.windScale + "级"
								);
							}),
						timeout,
					]).catch((error) => {
						console.error(error);
						$("#city_text").html("=-= Loading timeout =-=");
					});
				});
		})
		.catch(console.error);
}

/*
function getWeather_US(ip_city, ip_region_code) {
	let api_key = "pU4DyKIUvgVIA2MAWGHkUhtgCoxsEfXR"; // AccuWeather API key

	const city = ip_city;
	const regionCode = ip_region_code;

	fetch(
		`/backend-wea/locations/v1/cities/search?apikey=${api_key}&q=${city},${regionCode}`
	)
		.then((response) => response.json())
		.then((location) => {
			const citykey = location[0].Key;
			fetch(
				`/backend-wea/currentconditions/v1/${citykey}?apikey=${api_key}`
			)
				.then((response) => response.json())
				.then((weather) => {
					$("#city_text").html(city);
					$("#wea_icon").html(getWeatherIcon(weather[0].WeatherIcon));
					$("#wea_text").html(weather[0].WeatherText);
					$("#tem_text").html(
						weather[0].Temperature.Metric.Value + "°C&nbsp;"
					);
					$("#win_text").html(weather[0].Wind.Direction.English);
					$("#win_speed").html(
						weather[0].Wind.Speed.Metric.Value + "m/s"
					);
				})
				.catch((error) => {
					console.error(error);
				});
		})
		.catch((error) => {
			$("#city_text").html("=-= Loading timeout =-="); // Update HTML with error message
			console.error(error);
		});
}
*/

function getWeather_US() {
	let api_key = "pU4DyKIUvgVIA2MAWGHkUhtgCoxsEfXR"; // AccuWeather API key
	fetch("/backend-ip/")
		.then((response) => response.json())
		.then((data) => {
			const city = data.city;
			const regionCode = data.region_code;

			fetch(
				`/backend-wea/locations/v1/cities/search?apikey=${api_key}&q=${city},${regionCode}`
			)
				.then((response) => response.json())
				.then((location) => {
					const citykey = location[0].Key;
					fetch(
						`/backend-wea/currentconditions/v1/${citykey}?apikey=${api_key}`
					)
						.then((response) => response.json())
						.then((weather) => {
							$("#city_text").html(city);
							$("#wea_icon").html(
								getWeatherIcon(weather[0].WeatherIcon)
							);
							$("#wea_text").html(weather[0].WeatherText);
							$("#tem_text").html(
								weather[0].Temperature.Metric.Value + "°C&nbsp;"
							);
							$("#win_text").html(
								weather[0].Wind.Direction.English
							);
							$("#win_speed").html(
								weather[0].Wind.Speed.Metric.Value + "m/s"
							);
						})
						.catch((error) => {
							console.error(error);
						});
				})
				.catch((error) => {
					$("#city_text").html("=-= Loading timeout =-="); // Update HTML with error message
					console.error(error);
				});
		})
		.catch((error) => {
			$("#city_text").html("=-= Loading timeout =-="); // Update HTML with error message
			console.error(error);
		});
}

//getWeather();

/*
let api_key = "1Z8Z9O8j32e4Mqr6aMzHwmf8lR69KqnN"; // AccuWeather API key

function getWeather() {
	fetch("https://ip-api.co/json/")
		.then((response) => response.json())
		.then((data) => {
			const city = data.city;
			const regionCode = data.region;

			fetch(
				`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city},${regionCode}`
			)
				.then((response) => response.json())
				.then((location) => {
					const citykey = location[0].Key;
					fetch(
						`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${api_key}`
					)
						.then((response) => response.json())
						.then((weather) => {
							$("#city_text").html(city);
							$("#wea_icon").html(
								getWeatherIcon(weather[0].WeatherIcon)
							);
							$("#wea_text").html(weather[0].WeatherText);
							$("#tem_text").html(
								weather[0].Temperature.Metric.Value + "°C&nbsp;"
							);
							$("#win_text").html(
								weather[0].Wind.Direction.English
							);
							$("#win_speed").html(
								weather[0].Wind.Speed.Metric.Value + "m/s"
							);
						});
				});
		})
		.catch(console.error);
}

getWeather();
*/
/*
let api_key = "1Z8Z9O8j32e4Mqr6aMzHwmf8lR69KqnN"; // AccuWeather API key

function getWeather() {
	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords;
		fetch(
			`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${api_key}&q=${latitude},${longitude}`
		)
			.then((response) => response.json())
			.then((location) => {
				const citykey = location.Key;
				fetch(
					`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${api_key}`
				)
					.then((response) => response.json())
					.then((weather) => {
						$("#city_text").html(city);
						$("#wea_icon").html(
							getWeatherIcon(weather[0].WeatherIcon)
						);
						$("#wea_text").html(weather[0].WeatherText);
						$("#tem_text").html(
							weather[0].Temperature.Metric.Value + "°C&nbsp;"
						);
						$("#win_text").html(weather[0].Wind.Direction.English);
						$("#win_speed").html(
							weather[0].Wind.Speed.Metric.Value + "m/s"
						);
					});
			});
	}, console.error);
}

getWeather();
*/

//let api_key = "1Z8Z9O8j32e4Mqr6aMzHwmf8lR69KqnN"; // AccuWeather API key
/*
function getWeather_US() {
	let api_key = "pU4DyKIUvgVIA2MAWGHkUhtgCoxsEfXR"; // AccuWeather API key
	fetch("/backend-ip/")
		.then((response) => response.json())
		.then((data) => {
			const city = data.city;
			const regionCode = data.region_code;

			fetch(
				`/backend-wea/locations/v1/cities/search?apikey=${api_key}&q=${city},${regionCode}`
			)
				.then((response) => response.json())
				.then((location) => {
					const citykey = location[0].Key;
					fetch(
						`/backend-wea/currentconditions/v1/${citykey}?apikey=${api_key}`
					)
						.then((response) => response.json())
						.then((weather) => {
							$("#city_text").html(city);
							$("#wea_icon").html(
								getWeatherIcon(weather[0].WeatherIcon)
							);
							$("#wea_text").html(weather[0].WeatherText);
							$("#tem_text").html(
								weather[0].Temperature.Metric.Value + "°C&nbsp;"
							);
							$("#win_text").html(
								weather[0].Wind.Direction.English
							);
							$("#win_speed").html(
								weather[0].Wind.Speed.Metric.Value + "m/s"
							);
						});
				});
		})
		.catch(console.error);
}
*/
//getWeather();

let wea = 0;
$("#upWeather").click(function () {
	if (wea == 0) {
		wea = 1;
		let index = setInterval(function () {
			wea--;
			if (wea == 0) {
				clearInterval(index);
			}
		}, 60000);
		getWeather();
		iziToast.show({
			timeout: 2000,
			icon: "fa-solid fa-cloud-sun",
			message: "Weather has updated",
		});
	} else {
		iziToast.show({
			timeout: 1000,
			icon: "fa-solid fa-circle-exclamation",
			message: "Please update later",
		});
	}
});

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
	clearTimeout(t);
	dt = new Date();
	let y = dt.getYear() + 1900;
	let mm = dt.getMonth() + 1;
	let d = dt.getDate();
	let weekday = [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
	];
	if (navigator.language != "zh-CN") {
		weekday = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
	}

	let day = dt.getDay();
	let h = dt.getHours();
	let m = dt.getMinutes();
	let s = dt.getSeconds();
	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m;
	}
	if (s < 10) {
		s = "0" + s;
	}
	//-Language switch
	if (navigator.language == "zh-CN")
		$("#time").html(
			y +
				"&nbsp;年&nbsp;" +
				mm +
				"&nbsp;月&nbsp;" +
				d +
				"&nbsp;日&nbsp;" +
				"<span class='weekday'>" +
				weekday[day] +
				"</span><br>" +
				"<span class='time-text'>" +
				h +
				":" +
				m +
				":" +
				s +
				"</span>"
		);
	else
		$("#time").html(
			"<span class='weekday'>" +
				weekday[day] +
				"&nbsp;&nbsp;" +
				mm +
				"&nbsp;/&nbsp;" +
				d +
				"&nbsp;/&nbsp;" +
				y +
				"&nbsp;&nbsp;" +
				"</span><br>" +
				"<span class='time-text'>" +
				h +
				":" +
				m +
				":" +
				s +
				"</span>"
		);
	t = setTimeout(time, 1000);
}

//链接提示文字
$("#social")
	.mouseover(function () {
		$("#social").css({
			background: "rgb(0 0 0 / 25%)",
			"border-radius": "6px",
			"backdrop-filter": "blur(5px)",
		});
		$("#link-text").css({
			display: "block",
		});
	})
	.mouseout(function () {
		$("#social").css({
			background: "none",
			"border-radius": "6px",
			"backdrop-filter": "none",
		});
		$("#link-text").css({
			display: "none",
		});
	});

$("#github")
	.mouseover(function () {
		$("#link-text").html("Go Github");
	})
	.mouseout(function () {
		$("#link-text").html("Coding or Loaf");
	});
$("#qq")
	.mouseover(function () {
		$("#link-text").html("Any problem?");
	})
	.mouseout(function () {
		$("#link-text").html("Contact me if needed :)");
	});
$("#email")
	.mouseover(function () {
		$("#link-text").html("Email me for more question");
	})
	.mouseout(function () {
		$("#link-text").html("Not checked often XD");
	});
$("#twitter")
	.mouseover(function () {
		$("#link-text").html("Go Twitter");
	})
	.mouseout(function () {
		$("#link-text").html("I'm more active on twitter");
	});
$("#tumblr")
	.mouseover(function () {
		$("#link-text").html("Go Tumblr");
	})
	.mouseout(function () {
		$("#link-text").html("Non daily post..");
	});

//更多页面切换
let shoemore = false;
$("#switchmore").on("click", function () {
	shoemore = !shoemore;
	if (shoemore && $(document).width() >= 990) {
		$("#container").attr("class", "container mores");
		$("#change").html("Oops&nbsp;!");
		$("#change1").html("Secret Mode On（Click again to disable.）");
	} else {
		$("#container").attr("class", "container");
		$("#change").html("Such is the life of an adventurer");
		$("#change1").html("Hilda fan, activate on Twitter and Tumblr");
	}
});

//更多页面关闭按钮
$("#close").on("click", function () {
	$("#switchmore").click();
});

//移动端菜单栏切换
let switchmenu = false;
$("#switchmenu").on("click", function () {
	switchmenu = !switchmenu;
	if (switchmenu) {
		$("#row").attr("class", "row menus");
		$("#menu").html("<i class='fa-solid fa-xmark'></i>");
	} else {
		$("#row").attr("class", "row");
		$("#menu").html("<i class='fa-solid fa-bars'></i>");
	}
});

//更多弹窗页面
$("#openmore").on("click", function () {
	$("#box").css("display", "block");
	$("#row").css("display", "none");
	$("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", function () {
	$("#box").css("display", "none");
	$("#row").css("display", "flex");
	$("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", function () {
	window.addEventListener("resize", function () {
		//关闭移动端样式
		if (window.innerWidth >= 600) {
			$("#row").attr("class", "row");
			$("#menu").html("<i class='fa-solid fa-bars'></i>");
			//移除移动端切换功能区
			$("#rightone").attr("class", "row rightone");
		}

		if (window.innerWidth <= 990) {
			//移动端隐藏更多页面
			$("#container").attr("class", "container");
			$("#change").html("Such is the life of an adventurer");
			$("#change1").html("Hilda fan, activate on Twitter and Tumblr");

			//移动端隐藏弹窗页面
			$("#box").css("display", "none");
			$("#row").css("display", "flex");
			$("#more").css("display", "flex");
		}
	});
});

//移动端切换功能区
let changemore = false;
$("#changemore").on("click", function () {
	changemore = !changemore;
	if (changemore) {
		$("#rightone").attr("class", "row menus mobile");
	} else {
		$("#rightone").attr("class", "row menus");
	}
});

//更多页面显示关闭按钮
$("#more").hover(
	function () {
		$("#close").css("display", "block");
	},
	function () {
		$("#close").css("display", "none");
	}
);

//屏蔽右键
document.oncontextmenu = function () {
	iziToast.show({
		timeout: 2000,
		icon: "fa-solid fa-circle-exclamation",
		message: "Right click is currently disabled to ensure your experience",
	});
	return false;
};

//控制台输出
//console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`;
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`;
let styleContent = `
color: rgb(30,152,255);
`;
let title1 = "Collect_diamond";
let title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ / 
  | | | |\\/| |\\___ \\  \\   /    \\   /  
 _| |_| |  | |____) |  | |      | |   
|_____|_|  |_|_____/   |_|      |_|                                                     
`;
let content = `
版 本 号：3.4
更新日期：2022-07-24

主页:  https://www.imsyy.top
Github:  https://github.com/imsyy/home
`;
console.log(
	`%c${title1} %c${title2}
%c${content}`,
	styleTitle1,
	styleTitle2,
	styleContent
);
