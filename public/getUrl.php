<?php
if(file_exists($_SERVER['DOCUMENT_ROOT'].'/config.php')){
	require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');
	global $CFG;
}else if(session_id() == '')
	session_start();

$url = substr($_POST['url'], 0, strripos($_POST['url'], '/')+1);
$src = explode("|", $_POST['src']);
$type = explode("|", $_POST['type']);
$defaLocal = $_POST['defaLocal'];

/*require_once('getid3/getid3.php');
$getID3 = new getID3;*/

$output = '';
for ($i=0; $i < count($src); $i++) {
	if(isset($CFG)){
		$video = $CFG->dataroot.substr(strrchr($url.$src[$i], 'file.php'), 8);
	}else{
		$video = $_SERVER['DOCUMENT_ROOT'].parse_url($url, PHP_URL_PATH).$src[$i];
	}
	$output .= '<source src="'.$video.'" type=\''.$type[$i].'\'> </source>';
	/*$info = $getID3->analyze($video);
	$duration[$i] = $info['playtime_seconds'];*/
}

if( (strpos($output,"<video") > -1 || strpos($output,"<audio") > -1  || strpos($output,"<source") > -1 )  && (strpos($output,"<safe") == FALSE) ){
	function getURL($matches)
	{
		$crc = substr(sha1($matches['2']), -8, -1);
		$_SESSION['defaprotect' . $crc] = $matches['2'];
		return $matches[1] . "/defavid.php?crc=".$crc;
	}

	$output = preg_replace_callback("/(<video[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
	$output = preg_replace_callback("/(<source[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
	$output = preg_replace_callback("/(<audio[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
}
session_write_close();

$output_array = explode("</source>", $output);
$output = "";

foreach ($output_array as $key => $value) {
	$separador = empty($output) ? "" : "|";
	if(!empty($value)){
		$defavid = substr($value, strpos($value, '"')+1);
		$output .= $separador.$defaLocal.substr($defavid, 0, strpos($defavid, '"'));//.'&duration='.$duration[$key];
	}
}

echo $output;
