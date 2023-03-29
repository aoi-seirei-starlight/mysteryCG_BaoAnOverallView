<?php
$url='https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ptqMfywAWIGrG5NSFCbna0ee&client_secret=6BooUcWbALkBPlGfzS8oXEdnhvdOEaEU';
$html = file_get_contents($url);
echo $html;
?>