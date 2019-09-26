<?php

if(array_key_exists('HTTP_ORIGIN', $_SERVER)){
	header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']); 
}

echo "nome = <br>username = <br>chave = <br>tipousuario = <br>numero = <br>dataehora = <br>";

?>