<?php
/**
 * 发起http post请求(REST API), 并获取REST请求的结果
 * @param string $url
 * @param string $param
 * @return - http response body if succeeds, else false.
 */
function request_post($url = '', $param = '')
{
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = $param;
    // 初始化curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $postUrl);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    // post提交方式
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    // 运行curl
    $data = curl_exec($curl);
    curl_close($curl);

    echo $data;
	return $data;
}

$url = $_POST["Host"] . $_POST["access_token"];
$bodys = "{\"image_template\":{\"image\":\"" . $_POST["image_template"] . "\",\"image_type\":\"BASE64\"},\"image_target\":{\"image\":\"" . $_POST["image_target"] . "\",\"image_type\":\"BASE64\"}}";

$res = request_post($url, $bodys);

$origin[] = array(
	'url' => $url,
	'access_token' => $bodys,
	'image_template' => $_POST["image_template"],
	'image_target' => $_POST["image_target"]
);
$json = json_encode($origin);
file_put_contents('index.json', $json);
?>