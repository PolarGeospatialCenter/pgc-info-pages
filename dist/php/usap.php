<?php
$location = $_GET['cameraLocation'];
$camera = $_GET['camera'];
$timestamp = time();

$request = 'http://www.usap.gov/components/webcams.cfc?method=outputCurrentCamImage&cameraLocation='.$location.'&camera='.$camera.'&_='.$timestamp;
//$request = 'http://www.usap.gov/components/webcams.cfc?'.http_build_query(array('method'=>'outputCurrentCamImage', 'cameraLocation'=>$location, 'camera'=>$camera, '_'=>$timestamp),'','&');
$result = file_get_contents($request);
echo $result;
?>