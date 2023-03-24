var screenADTime = 3;
var thisTime = 0;
var thisDaKaNumber = 0;
var thisDaKaSEX = 1;
var MakePhotoButtonReady = false;
var downloadIamgeName = "";
var isMobile = true;
var screenImgDom = document.querySelector("#screenAD");
var screenImgDomText = document.querySelector("#screenAD>div>div");
var mtkDom = document.querySelector(".MTK");
var fenXiangPCDom = document.querySelector(".fenXiang");
var fenXiangPEDom = document.querySelector("#FenXiangPE");
var fenXiangImgEWMBase64 = "";
var woMenDom = document.querySelector(".WoMen");
var imageDom = document.querySelector(".Image");
var DaKaDom = document.querySelector(".DaKa");
var DaKaImgDom = document.querySelectorAll("#DaKaImg>div");
var DaKaImgButtonDom = document.querySelectorAll("#DaKaImgButton>span");
var DaKaImgText = document.querySelector("#DaKaImgText");
var DaKaImgTextArray = [
	"智造宝安",
	"通达宝安",
	"传承宝安",
	"2023 我在宝安"
];
console.log(DaKaImgTextArray);

$(function() {
	var iframe = document.querySelector("iframe");
	if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
		// Mobile device style: fill the whole browser client area with the game canvas:

		var meta = document.createElement('meta');
		meta.name = 'viewport';
		meta.content =
			'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
		document.getElementsByTagName('head')[0].appendChild(meta);

		document.getElementById('DownloadButton').style.display = "none";
		
		isMobile = true;
	} else {
		document.getElementById('DownloadText').style.display = "none";
		isMobile = false;
	}
	window.URL = window.URL || window.webkitURL;
	console.log(document.getElementById('FenXiangEWM').src);
	var xhr = new XMLHttpRequest();
	xhr.open("get", document.getElementById('FenXiangEWM').src, true);
	xhr.responseType = "blob";
	xhr.onload = function() {
		if (this.status == 200) {
			var blob = this.response;
			console.log("blob", blob)
			let oFileReader = new FileReader();
			oFileReader.onloadend = function(e) {
				fenXiangImgEWMBase64 = e.target.result;
			};
		 oFileReader.readAsDataURL(blob);
		}
	}
	xhr.send();
});

var loadImgNum = 0;
//360背景图片初始化
function BGimgInit(){
	loadImgNum++;
	screenImgDomText.innerHTML = "图片加载" + loadImgNum + "/26";
	screenImgDom.style.opacity = 1;
	if(loadImgNum >= 26){
		var b = setInterval(function() {
			if (screenImgDom.style.opacity >= 0.1) {
				screenImgDom.style.opacity = screenImgDom.style.opacity - 0.02;
			} else {
				screenImgDom.style.opacity = 1;
				screenImgDom.style.display = "none";
				clearInterval(b);
			}
		}, 10);
	}
}

//分享链接
document.querySelector("#FenXiangUrl").innerHTML = window.location.href;
document.querySelector("#FenXiangEWM").src = "https://api.qrserver.com/v1/create-qr-code?data=" + window.location
	.href;
//复制分享链接
function CopyUrl() {
	var text = window.location.href;
	const el = document.createElement('input');
	el.setAttribute('value', text);
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert('复制成功');
}
//打开连接
function OpenUrl() {
	window.open(window.location.href, '_self');
}

function OpenShare() {
	if (isMobile) {
		var imgBG = document.getElementById('FenXiangPEBGImg');
		var imgEWM = document.createElement('img');
		imgEWM.src = fenXiangImgEWMBase64;
		console.log(imgEWM);
		var canvas = document.createElement("canvas");
		canvas.width = 1080;
		canvas.height = 2143;
		var ctx = canvas.getContext("2d");
		imgEWM.onload = function(){
			ctx.drawImage(imgBG, 0, 0, 1080, 2143);
			ctx.drawImage(imgEWM, 50, 1893, 200, 200);

			var dataURL = canvas.toDataURL("image/jpeg"); //返回的是一串Base64编码的URL并指定格式
			canvas = null; //释放
			document.getElementById('FenXiangPEImg').src = dataURL;
			
		}
		
		fenXiangPEDom.style.display = "block";
		console.log("手机打开分享");
	} else {
		mtkDom.style.display = "block";
		fenXiangPCDom.style.display = "block";
		console.log("电脑打开分享");
	}
}

function OpenWE() {
	mtkDom.style.display = "block";
	woMenDom.style.display = "block";
	console.log("打开我们");
}

function OpenImg(imgNumber) {
	mtkDom.style.display = "block";
	imageDom.style.display = "block";
	document.querySelector(".Image>img").src = "";
	document.querySelector(".Image>img").src = "../imageS/" + imgNumber;
	console.log("打开图片" + imgNumber);
}

function OpenDianZan() {
	console.log("点赞");
}

function OpenDianZanNo() {
	console.log("取消点赞");
}

function OpenDaKa(number) {
	mtkDom.style.display = "block";
	DaKaDom.style.display = "block";
	var daKaOperateDiv = document.querySelectorAll(".DaKa>div");
	for (var i = 1; i < daKaOperateDiv.length; i++) {
		daKaOperateDiv[i].style.display = "none";
	}
	daKaOperateDiv[0].style.display = "block";
	if (number == null) {
		SwitchDaKaNumber(3, 0, 1, 2)
		console.log("默认打卡");
		return;
	}
	switch (number) {
		case "0":
			SwitchDaKaNumber(3, 0, 1, 2);
			break;
		case "1":
			SwitchDaKaNumber(0, 1, 2, 3);
			break;
		case "2":
			SwitchDaKaNumber(1, 2, 3, 0);
			break;
		case "3":
			SwitchDaKaNumber(2, 3, 0, 1);
			break;
		default:
			console.log("未知位置");
			break;
	}
	console.log("打卡，位置：" + number);
}

function OnLoading() {
	console.log("加载完毕");
	screenImgDom.style.opacity = 1;
	var a = setInterval(function() {
		thisTime += 100;
		screenImgDomText.innerHTML = screenADTime - parseInt(thisTime / 1000) + "秒";
		if (thisTime >= screenADTime * 1000) {
			var b = setInterval(function() {
				if (screenImgDom.style.opacity >= 0.1) {
					screenImgDom.style.opacity = screenImgDom.style.opacity - 0.02;
				} else {
					screenImgDom.style.opacity = 1;
					screenImgDom.style.display = "none";
					clearInterval(b);
				}
			}, 10);
			clearInterval(a);
		}
	}, 100);
}

function CloseShare() {
	mtkDom.style.display = "none";
	fenXiangPCDom.style.display = "none";
	fenXiangPEDom.style.display = "none";
	console.log("关闭分享");
}

function CloseWE() {
	mtkDom.style.display = "none";
	woMenDom.style.display = "none";
	console.log("关闭我们");
}

function CloseImg() {
	mtkDom.style.display = "none";
	imageDom.style.display = "none";
	console.log("关闭图片");
}

function CloseDaKa(number) {
	mtkDom.style.display = "none";
	DaKaDom.style.display = "none";
	console.log("退出打卡");
}

function SwitchDaKaNumber(numberNext, number, numberPrevious, numberNone) {
	DaKaImgDom[number].className = "among";
	DaKaImgDom[numberNext].className = "Right";
	DaKaImgDom[numberPrevious].className = "Left";
	DaKaImgDom[numberNone].className = "none";
	for (var i = 0; i < DaKaImgButtonDom.length; i++) {
		DaKaImgButtonDom[i].style.backgroundColor = "#fefcf6";
	}
	DaKaImgButtonDom[number].style.backgroundColor = "#f54500";
	DaKaImgText.innerHTML = DaKaImgTextArray[number];
	thisDaKaNumber = number;
}

function AffirmScene() {
	document.querySelectorAll(".DaKa>div")[0].style.display = "none";
	document.querySelectorAll(".DaKa>div")[1].style.display = "block";
	document.getElementById("UpDataPhotoImg").src = "imageS/打卡/photo-frame-second.jpg";
	MakePhotoButtonReady = false;
	document.getElementById("MakePhotoButton").className = "Button ButtonNotSelected";
	document.getElementById("AmongTemplate").setAttribute("src", "imageS/synthesisTarget/" + thisDaKaNumber +
		thisDaKaSEX + ".jpg");
}

function SwitchSEX(number) {
	switch (number) {
		case 0:
			thisDaKaSEX = 0;
			document.querySelectorAll(".label")[0].style.backgroundColor = "#f6ebd0";
			document.querySelectorAll(".label")[1].style.backgroundColor = "#ea0600";
			break;
		case 1:
			thisDaKaSEX = 1;
			document.querySelectorAll(".label")[0].style.backgroundColor = "#ea0600";
			document.querySelectorAll(".label")[1].style.backgroundColor = "#f6ebd0";
			break;
		default:
			break;
	}
	document.getElementById("AmongTemplate").setAttribute("src", "../imageS/synthesisTarget/" + thisDaKaNumber +
		thisDaKaSEX + ".jpg");
}
var file = document.getElementById('UpDataPhotoInput');
var image = document.getElementById("UpDataPhotoImg");
file.onchange = function() {
	var fileData = this.files[0];
	var pettern = /^image/;

	if (!pettern.test(fileData.type)) {
		alert("图片格式不正确");
		return;
	}
	var reader = new FileReader();
	reader.readAsDataURL(fileData);
	reader.onload = function(e) {
		image.setAttribute("src", this.result);
		document.getElementById("AmongTarget").setAttribute("src", this.result);
		MakePhotoButtonReady = true;
		document.getElementById("MakePhotoButton").className = "Button ButtonOnly";
		file.value = "";
	}
}

function UpDataPhoto() {
	if (MakePhotoButtonReady) {
		console.log("制作图片");
		document.getElementById("UpDataPhotoMTK").style.display = "block";
		document.querySelector("#UpDataPhotoMTK>div").innerHTML = "照片生成中，请稍等......<span></span>";
		//获取上传信息
		var base64Template = GetImageBase64(document.getElementById("AmongTemplate"), "jpeg").substring(23);
		var base64Target = GetImageBase64(document.getElementById("AmongTarget"), "jpeg").substring(23);
		document.getElementById("a1Template").setAttribute("src", "data:image/png;base64," + base64Template);
		document.getElementById("a1Target").setAttribute("src", "data:image/png;base64," + base64Target);
		JqueryAjaxGetPhoto(base64Template, base64Target);
	}
}

function GetImageBase64(img, ext) {
	var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
	canvas.width = img.width;
	canvas.height = img.height;
	console.log(img.width, img.height);
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
	var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
	canvas = null; //释放
	return dataURL;
}
//ajax请求
function JqueryAjaxGetPhoto(image_template, image_target) {
	$.ajax({
		url: "../php/updata.php",
		type: "POST",
		data: {
			"Host": "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ptqMfywAWIGrG5NSFCbna0ee&client_secret=6BooUcWbALkBPlGfzS8oXEdnhvdOEaEU"
		},
		error: function() {
			InputImage("1000");
			return;
		},
		success: function(data, status) { //如果调用php成功
			var access_token = $.parseJSON(data).access_token;
			$.ajax({
				url: "/php/updata.php",
				type: "POST",
				data: {
					"access_token": access_token,
					"image_template": image_template,
					"image_target": image_target
				},
				//dataType: "json",
				error: function() {
					InputImage("0100");
					return;
				},
				success: function(data, status) { //如果调用php成功
					InputImage(data);
					return data;
				}
			});
		}
	});
}

function InputImage(JsonString) {
	if (JsonString == "1000") {
		console.log("连接验证服务器不成功！");
		MTKClear("连接验证服务器不成功！");
		return;
	} else if (JsonString == "0100") {
		console.log("连接人脸融合服务器不成功！");
		MTKClear("连接人脸融合服务器不成功！");
		return;
	}
	var jsonCreatePhoto = $.parseJSON(JsonString);
	if (jsonCreatePhoto.error_code != "0") {
		console.log("合成失败！");
		console.log(jsonCreatePhoto);
		if (jsonCreatePhoto.error_code == "222202") {
			MTKClear("图片中没有人脸，请重新上传");
			return;
		} else if (jsonCreatePhoto.error_code == "222203") {
			MTKClear("无法解析图片，检查图片质量");
			return;
		} else {
			MTKClear("未知错误，error_code：" + jsonCreatePhoto.error_code);
			return;
		}
	}
	console.log("合成成功");
	var base64CreatePhoto = jsonCreatePhoto.result.merge_image;
	document.querySelectorAll(".DaKa>div")[1].style.display = "none";
	document.querySelectorAll(".DaKa>div")[2].style.display = "none";
	document.querySelectorAll(".DaKa>div")[3].style.display = "block";
	var imgBG = document.createElement('img');
	var imgEWM = document.createElement('img');
	imgBG.src = "data:image/png;base64," + base64CreatePhoto;
	imgEWM.src = fenXiangImgEWMBase64;
	console.log(imgEWM);
	var canvas = document.createElement("canvas");
	canvas.width = 922;
	canvas.height = 1800;
	var ctx = canvas.getContext("2d");
	imgBG.onload = function(){
		imgEWM.onload = function(){
			ctx.drawImage(imgBG, 0, 0, 922, 1800);
			ctx.drawImage(imgEWM, 68, 1630, 124, 124);
				
			var dataURL = canvas.toDataURL("image/jpeg"); //返回的是一串Base64编码的URL并指定格式
			canvas = null; //释放
			document.getElementById("HandleEndPhoto").src = dataURL;
		}
	}

	function MTKClear(errMessage) {
		document.querySelector("#UpDataPhotoMTK>div").innerHTML = errMessage + "<span></span>";
		var a_time = 0;
		var a = setInterval(function() {
			document.querySelector("#UpDataPhotoMTK>div>span").innerHTML = 5 - a_time + "秒";
			if (a_time++ >= 5) {
				document.querySelector("#UpDataPhotoMTK").style.display = "none";
				clearInterval(a);
			}
		}, 1000);
	}
}

function downloadIamge(img_id) {
	var img = document.getElementById(img_id);
	var url = img.src;
	var a = document.createElement('a');
	var event = new MouseEvent('click');
	a.download = DaKaImgTextArray[thisDaKaNumber];
	a.href = url;
	a.dispatchEvent(event);
}
