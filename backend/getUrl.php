<?php

// ini_set('session.cookie_domain', '.qisat.com.br');
ini_set('session.cookie_domain', '.dev.com.br');

if(array_key_exists('HTTP_ORIGIN', $_SERVER)){
	header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']); 
}

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/config.php')){
	require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');
	global $CFG;
}else{
	session_start();
	$sid = session_id();
}

if(array_key_exists('REQUEST_METHOD', $_SERVER)){
	if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {

		if(array_key_exists('url', $_REQUEST)){
			$url = $_REQUEST['url'];
			if(!empty($url)){
				$url = substr($url, 0, strripos($url, '/')+1);
			}
		}

		if(array_key_exists('src', $_REQUEST)){
			$src = $_REQUEST['src'];

			if(!empty($src)){
				$src = explode("|", $src);
			}
		}

		if(array_key_exists('type', $_REQUEST)){
			$type = $_REQUEST['type'];

			if(!empty($type)){
				$type = explode("|", $type);
			}
		}

		if(array_key_exists('defaLocal', $_REQUEST)){
			$defaLocal = $_REQUEST['defaLocal'];
		}

		$output = '';
		for ($i=0; $i < count($src); $i++) {
			if(isset($CFG)){
				$video = $CFG->dataroot.substr(strrchr($url.$src[$i], 'file.php'), 8);
			}else{
				$video = $url.$src[$i];
			}
			$output .= '<source src="'.$video.'" type=\''.$type[$i].'\'> </source>';
		}

		if( (strpos($output,"<video") > -1 || strpos($output,"<audio") > -1  || strpos($output,"<source") > -1 )  && (strpos($output,"<safe") == FALSE) ){
			function getURL($matches)
			{
				$crc = substr(sha1($matches['2']), -8, -1);
				$_SESSION['defaprotect' . $crc] = $matches['2'];
				return $matches[1] . "defavid.php?crc=".$crc;
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
				$output .= $separador.$defaLocal.substr($defavid, 0, strpos($defavid, '"')).'&SID='.$sid;
			}
		}

		echo $output;
	}
}
