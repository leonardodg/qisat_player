<?php


/**
 * Objetivo do arquivo 
 * 
 * retorno url para o arquivo codificação
 * 
 * Exemplo retorno 
 * 
 * 		/lib/QiSatPlayer3/backend/defavid.php?crc=6541581&SID=3hfq6fi73qggr109pu0pcddp51
 * 
 * 		composição
 *  		endereço do link + nome do arquivo + parametros
 *		
 *		Parametros:
 *			crc = path do arquivo
 *			SID = id ssession apenas para dev local
 *
 */

$moodle = false;

if(array_key_exists('HTTP_ORIGIN', $_SERVER)){
	header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']); 
}

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/config.php')){
	require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');
	$moodle = true;
	global $CFG;
}else{
	session_start();
	$sid = session_id();
}

/**
 * Parametros da requisição
 * 		url = link referer : local onde é chamado
 * 		src = nome do arquivo objetivo final
 * 		type = tipo codificação "codecs" da tag final de retorno
 * 		defaUrl = link do arquivo Defa : para chamar o arquivo codificado
 * 
 */
if(array_key_exists('REQUEST_METHOD', $_SERVER)){
	if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {

		if(array_key_exists('url', $_REQUEST)){
			$url = $_REQUEST['url'];
			if(!empty($url) && isset($CFG)){
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

		if(array_key_exists('defaUrl', $_REQUEST)){
			$defaUrl = $_REQUEST['defaUrl'];
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

		/**
		 * 
		 * Exemplo de precessamento da TAG source:
		 * 
		 * INPUT BEGIN =
		 * 			<source src="/var/www/html/moodledata/160/Aula1/protecao_564.mp4" type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'> </source>
		 * 
		 * matches[1] = inicio da tag "<source src=''"
		 * matches[2] = "pasta local arquivo" = link do atribudo src
		 * 
		 * Retorno concatena com matches[0] + "local arquivo defa" + matches[2]
		 * 
		 * OUTPUT END = 
		 * 		$crc = /var/www/html/moodledata/160/Aula1/protecao_564.mp4
		 * 		<source src="/defavid.php?crc=$src" type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'> </source>
		 * 
		 * 
		 * considerações:
		 *	 	- Salva em sessão matches[2] com nome defaprotect concatenado com hash passado no paramentro crc do link
		 * 		- atributo src da tag de retorno possui parametro chamado crc
		 */
		if( (strpos($output,"<video") > -1 || strpos($output,"<audio") > -1  || strpos($output,"<source") > -1 )  && (strpos($output,"<safe") == FALSE) ){
			function getURL($matches)
			{
				$crc = substr(sha1($matches['2']), -8, -1);
				$_SESSION['defaprotect' . $crc] = $matches['2'];
				return $matches[1] . "{defaUrl}?crc=".$crc;
			}

			$output = preg_replace_callback("/(<video[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
			$output = preg_replace_callback("/(<source[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
			$output = preg_replace_callback("/(<audio[^>]*src *= *[\"']?)([^\"']*)/i", "getURL", $output);
		}

		session_write_close();

		$output_array = explode("</source>", $output);
		$output = "";

		// Nao utlizar separador de videos no parametros SRC e TYPE
		// percorrer TAGs final - atualmente apenas uma de video
		// pega value do atributo src da tag - regra primeira " + proxima "
		foreach ($output_array as $key => $value) {
			$separador = empty($output) ? "" : "|";
			if(!empty($value)){
				$defavid = substr($value, strpos($value, '"')+1);
				$defavid = str_replace("{defaUrl}", $defaUrl, $defavid);

				if($moodle){
					$output .= $separador.substr($defavid, 0, strpos($defavid, '"'));
				}else{
					$output .= $separador.substr($defavid, 0, strpos($defavid, '"')).'&SID='.$sid;
				}
			}
		}

		echo $output;
	}
}
