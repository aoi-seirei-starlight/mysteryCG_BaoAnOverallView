$.ajax({
	type: "POST",	
	url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ptqMfywAWIGrG5NSFCbna0ee&client_secret=6BooUcWbALkBPlGfzS8oXEdnhvdOEaEU",
	dataType: "json",
	success: function(data) {
		console.log(data);
	},
	error: function(jqXHR){
		console.log(jqXHR);
	},
});
// var API_Key = "ptqMfywAWIGrG5NSFCbna0ee";
// var Secret_Key = "6BooUcWbALkBPlGfzS8oXEdnhvdOEaEU";

// var access_token = "";

// var merge_image = ""

// // const getAccessToken = {
// // 	"async": true,
// // 	"crossDomain": true,
// // 	"url": "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id="+API_Key+"&client_secret="+Secret_Key,
// // 	"method": "POST",
// // 	"headers": {}
// // };
// const getCreatePhoto = {};

// function JqueryAjaxGetPhoto(image_template, image_target){
// 	ajaxMove(getAccessToken);
// 	// access_token = $.parseJSON(ajaxMove(getAccessToken)).access_token;
// 	// console.log(access_token);
// 	// getCreatePhoto = {
// 	// 	"async": true,
// 	// 	"crossDomain": true,
// 	// 	"url": "https://aip.baidubce.com/rest/2.0/face/v1/merge?access_token="+access_token,
// 	// 	"method": "POST",
// 	// 	"headers": {
// 	// 	"Content-Type": "application/json"
// 	// 	},
// 	// 	"processData": false,
// 	// 	"data": "{\"image_template\": {\"image\":\""+image_template+"\",\"image_type\":\"BASE64\"},\"image_target\":{\"image\":\""+image_target+"\",\"image_type\":\"BASE64\"}}"
// 	// };
// }

// function ajaxMove(ajaxBody){
// 	$.ajax(ajaxBody).done(function (response) {
// 	  console.log(response);
// 	  return response;
// 	});
// }
// const getAccessToken = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ptqMfywAWIGrG5NSFCbna0ee&client_secret=6BooUcWbALkBPlGfzS8oXEdnhvdOEaEU",
// 	"method": "get",
// 	"headers": {}
// };
// $.ajax(getAccessToken).done(function (response) {
//   // console.log(response);
// });
