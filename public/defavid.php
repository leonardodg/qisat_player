<?php
ob_start();

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/config.php')){
    require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');
    global $CFG;
}else if(session_id() == '')
    session_start();

$crc    = filter_var($_GET['crc']);
$file   = $_SESSION['defaprotect' . $crc];
/*
$iPod   = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
$iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
$iPad   = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
$iPod || $iPhone || $iPad
*/
if (isset($_SERVER['HTTP_RANGE'])) {
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
    if($ranges[0] * 2 < $size){
        $opts['http']['header'] = "Range: " . $_SERVER['HTTP_RANGE'];
        $opts['http']['method'] = "GET";
        $cong = stream_context_create($opts);
    }
    ob_end_clean(); 

    if($ranges[0] * 2 < $size){
        header('Accept-Ranges: bytes');
        header('Content-Length: ' . filesize($file));

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: inline; filename=aviso.mp4');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');

        readfile($file, false, $cong);
        exit();
    }else{
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
            //@ob_flush();
            flush();
        }
        fclose($file);
    }
}
