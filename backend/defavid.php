<?php

if(array_key_exists('HTTP_ORIGIN', $_SERVER)){
	header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']); 
}

if(array_key_exists('REQUEST_METHOD', $_SERVER)){
	if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {

		if(array_key_exists('SID', $_REQUEST)){
			$sid = $_REQUEST['SID'];
        }
    }
}

if(file_exists('../filelib.php')){
    require_once('../filelib.php');
}

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/config.php')){
    require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');
    global $CFG;
}else if(isset($sid)){
    session_id($sid);
    session_start(['cookie_secure' => true]);
}else{
    die('SEM SESSION!');
}

ob_start();

if(array_key_exists('REQUEST_METHOD', $_SERVER)){
	if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {

		if(array_key_exists('crc', $_REQUEST)){
			$crc = $_REQUEST['crc'];
        }

	if(array_key_exists('defaprotect' . $crc, $_SESSION)){
            $file  = $_SESSION['defaprotect' . $crc];
        } 
    }
}

/*
$iPod   = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
$iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
$iPad   = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
$iPod || $iPhone || $iPad
*/
if (isset($_SERVER['HTTP_RANGE'])) {
    $opts['http']['header'] = "Range: " . $_SERVER['HTTP_RANGE'];
    $opts['http']['method'] = "GET";
    $cong = stream_context_create($opts);

    $size = filesize($file); // The size of the file
    // Check if it's a HTTP range request
    // Parse the range header to get the byte offset
    $ranges = array_map(
        'intval', // Parse the parts into integer
        explode(
            '-', // The range separator
            substr($_SERVER['HTTP_RANGE'], 6) // Skip the `bytes=` part of the header
        )
    );

    // Sessão deve ser encerrada para que a conexão 206 possa ser fechada
    session_write_close();
    
    ob_end_clean(); 

    // If the last range param is empty, it means the EOF (End of File)
    if(!$ranges[1]) $ranges[1] = $size - 1;
    if($ranges[0] == $ranges[1]) $ranges[0] = 65536;
    // Send the content type header
    header('Content-type: application/octet-stream'); // The MIME type of the file, this should be replaced with your own.
    header('Accept-Ranges: bytes'); // Suporte a solicitações parciais
    // Send the appropriate headers
    header('HTTP/1.1 206 Partial Content');
    header('Content-Length: ' . ($size - $ranges[0])); // The size of the range
    // Send the ranges we offered
    header(
        sprintf(
            'Content-Range: bytes %d-%d/%d', // The header format
            $ranges[0], // The start range
            $ranges[1], // The end range
            $size // Total size of the file
        )
    );

    // It's time to output the file
    $f = fopen($file, 'rb'); // Open the file in binary mode
    $chunkSize = 8192; // The size of each chunk to output
    fseek($f, $ranges[0]); // Seek to the requested start range
    // Start outputting the data
    while(true) {
        // Check if we have outputted all the data requested
        if(ftell($f) >= $size) break;
        echo fread($f, $chunkSize); // Output the data
        // Flush the buffer immediately
        @ob_flush();
        flush();
    }
    fclose($file);
    
}
