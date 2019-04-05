var  ID = "#",
	ID_ERROR  = "error",
	ID_VIDEO  = "video",
	ID_CANVAS = 'canvasMask',
	ID_VIDEO_LOAD = "loading",
	ID_VIDEO_TOP  = "video-top",
	ID_VIDEO_MENU = "video-menu",
	ID_VIDEO_TAG  = "video-tag",
	ID_VIDEO_CONTROLS  = "video-controls",
	ID_VIDEO_CONTAINER = "video-components",
	CLASS = ".",
	CLASS_ICO = "ico",
	CLASS_BT  = "bt_ctrl",
	CLASS_TOP = "top",
	CLASS_BACK = "back",
	CLASS_NEXT = "next",
	CLASS_LOGO  = "logo",
	CLASS_REVEW = "revew",
	CLASS_PLAY  = "play",
	CLASS_PAUSE = "pause",
	CLASS_BACK_DISABLE = "back-disable",
	CLASS_NEXT_DISABLE = "next-disable",
	CLASS_VOLUME = "volume",
	CLASS_MUTE   = "mute",
	CLASS_MENU_IMG = "menu-icon",
	CLASS_MENU_LIST = "menu-list",
	CLASS_MENU_ACTION = "menu-action",
	CLASS_HIDE   = "hide",
	CLASS_ACTIVE = "active",
	CLASS_VISIBILY = "show",
	CLASS_AULA_TEXT  = "title-aula",
	CLASS_CURSO_TEXT = "title-curso",
	ID_SEEK_BAR   = "track-bar",
	ID_VOLUME_BAR = "volume-bar",
	ID_PLAYBACK_RATE = "playback-rate",
	CLASS_VOLUME_BAR = "volume-bar",
	CLASS_VOLUME_TRACK = "volume-track",
	CLASS_VOLUME_THUMB = "volume-thumb",

	ID_DIV_LEGENDA_SETA = "seta",
	CLASS_LEGENDA_LEFT = "seta-esquerda",
	CLASS_LEGENDA_RIGHT = "seta-direita",

	ID_DIV_VIDEO_TIME   = "video-time",
	ID_DIV_SLIDES   = "slides",
	ID_LEGENDA_TEXT = "legenda-text",
	ID_TIME_TEXT = "curtimetext",
	ID_DURATION_TEXT = "durtimetext",
	ID_PROGRESS = "progress",
	CLASS_PROGRESS = "progress",
	CLASS_PROGRESS_BAR = "progress-bar",
	CLASS_BT_CLOSE = "bt-close",
	CLASS_N_SUBVIDEO = "subvideo",
	CLASS_TOTAL_SUBVIDEO = "total-subvideo";

var ERROR_NOT_VIDEO_SUPPORT = " >> Navegador não tem suporte ao novo formato de video HTML5, FAVOR ACESSAR ATRAVÉS POR UM BROWSER ATUALIZADO!",
	ERROR_NOT_VIDEO_EXT = " >> Nenhuma extensão do video HTML5 é suportada!",

	ERROR_FILE_XML   = " >> FileName do video não configurado!",
	ERROR_TAG_CONTAINER = " >> Problemas para encontrar a tag ID "+ID_VIDEO_CONTAINER+" de estrutura do Player no HTML",
	ERROR_NO_XML_DOC = ' >> DOCUMENTO XML NÃO FOI CARREGADO!',
	ERROR_NO_XMLHTTPREQUEST = ">> BROWSER NO SUPORTE XML HTTP REQUEST!";

var PATHS = {	
	"localhost" :
	{
		'xml'       : 'arquivos/' ,
		'local'     : 'http://localhost/QiSatPlayer/' ,
		'imagens'   : 'imagens/' ,
		'imgMask'   : 'imagens/Aula[aula]/',
		'videos'    : 'videos/Aula[aula]/',
		'infouser'  : 'moodle/user/getinfouser-local.php',
		'geralog'   : 'moodle/course/geraLog-local.php',
		'poster'    : 'imagens/poster.jpg',
		'defaLocal' : 'lib/',
		'defaArq'   : 'getUrl.php',
		'data'      : 'D:\\localhost\\QiSatPlayer\\'
	},

	"qisat" :
	{
		'xml'       : '' ,
		//'local'   : 'http://cursos.qisat.com.br' ,
		'local'     : 'http://' + window.location.hostname + ':90' ,
		'imagens'   : '' ,
		'imgMask'   : '',
		'videos'    : '',
		'infouser'  : '/repository/user/getinfouser.php',
		'geralog'   : '/course/format/topicstime/controle_acesso/geraLog.php',
		'poster'    : '/lib/QiSatPlayer/imagens/poster.jpg',
		'defaLocal' : '/lib/QiSatPlayer/',
		'defaArq'   : 'getUrl.php',
		'data'      : ''
	},

	"mn01" :
	{
		'local'     : 'http://MN01/QiSatPlayer/' ,
		'xml'       : 'arquivos/' ,
		'imagens'   : 'imagens/' ,
		'imgMask'   : 'imagens/Aula[aula]/',
		'videos'    : 'videos/Aula[aula]/',
		'infouser'  : 'moodle/user/getinfouser-local.php',
		'geralog'   : 'moodle/course/geraLog-local.php',
		'poster'    : 'imagens/',
		'defaLocal' : 'lib/',
		'defaArq'   : 'getUrl.php',
		'data'      : '\\MN01\\QiSatPlayer\\'
	}
};

var VIDEOTYPES = {
	'mp4' : 'video/mp4',
	'mp4-codecs' : 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
	'webm': 'video/webm',
	'webm-codecs': 'video/webm; codecs="vp8, vorbis"',
	'ogg' : 'video/ogg',
	'ogg-codecs' : 'video/ogg; codecs="theora, vorbis"'
};

var AUDIOTYPES = {
	"ogg" : "audio/ogg",
	"ogg-codecs" : "audio/ogg; codecs=vorbis",
	"mpeg" : "audio/mpeg",
	"mpeg-codecs" : "audio/mpeg; codecs=mp3",
	"wav" : "audio/wav",
	"wav-codecs" : "audio/wav; codecs=1",
	"mp4" : "audio/mp4",
	"mp4-codecs" : "audio/mp4; codecs=aac",
	"x-m4b" : "audio/x-m4b",
	"x-m4b-codecs" : "audio/x-m4b; codecs=aac",
	"x-m4p" : "audio/x-m4p",
	"x-m4p-codecs" : "audio/x-m4p; codecs=aac",
	"aac" : "audio/aac",
	"aac-codecs" : "audio/aac; codecs=aac",
	"x-aac" : "audio/x-aac",
	"x-aac-codecs" : "audio/x-aac; codecs=aac"
};


(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.xhReq = factory(root);
	}
})(this, function (root) {

	'use strict';

	var exports = {};

	var config = {
		//contentType: 'application/x-www-form-urlencoded',
		contentType: 'text/xml',
		responseType : 'xml',
		async : false
	};

	var parse = function (req) {
		var response;
		try {
			//response = JSON.parse(req.responseText);
			//response = JSON.parse(JSON.stringify(req.responseText));

			if(config.responseType == 'xml'){
				response = req.responseXML;
			}else if(config.responseType == 'text'){
				response = req.responseText;
			}

		} catch (e) {
			response = req.responseText;
		}
		return [response, req];
	};

	var xhr = function (type, url, data) {
		var result, atomXHR, methods = {
			success: function () {},
			error: function () {},
			always: function () {}
		};
		var XHR = root.XMLHttpRequest || ActiveXObject; //XMLHttpRequest
		var request = new XHR('MSXML2.XMLHTTP.3.0');

		request.open(type, url, config.async);
		request.setRequestHeader('Content-type', config.contentType);
		//request.addHeader("Access-Control-Max-Age", "1728000");

		if(config.async){

			request.onreadystatechange = function () {
				var req;
				if (request.readyState === 4) {
					req = parse(request);
					if (request.status >= 200 && request.status < 300) {
						methods.success.apply(methods, req);
					} else {
						methods.error.apply(methods, req);
					}
					methods.always.apply(methods, req);
				}
			};
			request.send(data);

			atomXHR = {
				success: function (callback) {
					methods.success = callback;
					return atomXHR;
				},
				error: function (callback) {
					methods.error = callback;
					return atomXHR;
				},
				always: function (callback) {
					methods.always = callback;
					return atomXHR;
				}
			};

		}else{

			request.send(data);
			result = parse(request);

			atomXHR = {
				success: function (callback) {
					methods.success = callback;
					if ((request.readyState === 4) && (request.status >= 200 && request.status < 300))
						methods.success.apply(methods, result);
					return atomXHR;
				},
				error: function (callback) {
					methods.error = callback;
					if ((request.readyState === 4) && !(request.status >= 200 && request.status < 300))
						methods.error.apply(methods, result);
					return atomXHR;
				},
				always: function (callback) {
					methods.always = callback;
					if (request.readyState === 4)
						methods.always.apply(methods, result);
					return atomXHR;
				}
			};
		}

		return atomXHR;

	};

	exports.get = function (src) {
		return xhr('GET', src);
	};

	exports.put = function (url, data) {
		return xhr('PUT', url, data);
	};

	exports.post= function (url, data) {
		return xhr('POST', url, data);
	};

	exports.delete = function (url) {
		return xhr('DELETE', url);
	};

	exports.setContentType = function(value) {
		config.contentType = value;
	};

	exports.setResponseType = function(value) {
		config.responseType = value;
	};

	exports.setAsync = function(value) {
		config.async = value;
	};

	return exports;

});

"use strict";

var QiSatPlayer = function (options) {
	var _self = this;

	_self.setOptions(options);
	_self.carregarXML();
	_self.setListPlay();

	_self.createComponents();
	_self.carregarContainerXML();
	_self.carregarVideo();

};

QiSatPlayer.prototype.setOptions = function (options) {
	var _self = this, opDefault, prop, path;

	opDefault = {
		aula : 1,
		unid : "0",
		slide: 0,
		subVideo : 0,
		filename : "menu_items.xml",
		videoElem : true,
		canvasElem : true,
		load : false,
		top : true,
		menu : true,
		videoTag : true,
		controls : true,
		slides : true,
		legenda : false,
		chave : "000000",
		mascara : true,
		geraLog : true,
		autoplay : true,
		playbackRate : true
	};

	if(options){
		for ( prop in opDefault) if(!(options.hasOwnProperty(prop))){
			options[prop] = opDefault[prop];
		}
	}

	_self.options = options || opDefault;

	if('path' in _self.options ) {
		_self._path = _self.options.path;
	}else{
		if(PATHS[location.hostname]){
			path = PATHS[location.hostname];
		}else{
			path = PATHS['qisat'];
		}
		_self._path = path;
	}

	if('aula' in _self.options){
		_self.setAula(_self.options.aula);
	}

	_self.setVideoOptions();

	if('unid' in _self.options){
		_self.setUnid(_self.options.unid);
	}

	if('slide' in _self.options){
		_self._slide = _self.options.slide;
	}

	if('subVideo' in _self.options){
		_self._subVideo =  _self.options.subVideo;
	}

	if('filename' in _self.options) {
		_self._filename = _self.options.filename;
	}

	_self.getChave();

};

QiSatPlayer.prototype.setVideoOptions = function () {
	var _self = this, opsDefaultVideo, opsDefaultCanvas, prop;

	function canPlayType(elem){
		var support, result = {}, $video, $elem, $div, $span;

		if(elem == 'video'){
			$video = document.createElement('video');
			if (typeof $video.canPlayType == 'undefined'){
				$elem = document.querySelector(ID+ID_VIDEO_TAG);
				$div = document.createElement('div');
				$span = document.createElement('span');
				$span.innerHTML = ERROR_NO_SUPPORT;
				$div.appendChild($span);
				$div.id = ID_ERROR;
				$elem.appendChild($div);
				throw new Error(ERROR_NOT_VIDEO_SUPPORT);
			}else{
				for( prop in VIDEOTYPES){
					support = $video.canPlayType(VIDEOTYPES[prop]);

					if(support == 'probably'){
						result[prop] = VIDEOTYPES[prop];
					}
				}
			}
		}

		return result;
	}

	opsDefaultVideo = {
		controls : false,
		autoplay : true,
		paused : true,
		width : 1010,
		height : 568,
		id : ID_VIDEO,
		poster : _self._path.poster,
		types : canPlayType('video'),
		filename : null,
		ext : ['mp4']
	};

	opsDefaultCanvas = {
		id : ID_CANVAS,
		canvasMask : null,
		context : null,
		sentido : true,
		hue : 0,
		sat : 0,
		val : 40,
		val2 : 0.5,
		height : 568,
		width : 1010,
		imgHeight : 568,
		imgWidth : 935,
		img : null
	};

	if ( 'video' in _self.options ){
		for ( prop in opsDefaultVideo ) if(!(prop in _self.options.video )){
			_self.options.video[prop] = opsDefaultVideo[prop];
		}
	}else{
		_self.options.video = opsDefaultVideo;
	}

	if ( 'canvas' in _self.options) {
		for ( prop in opsDefaultCanvas ) if(!(prop in _self.options.canvas )){
			_self.options.canvas[prop] = opsDefaultCanvas[prop];
		}
	}else{
		_self.options.canvas = opsDefaultCanvas;
	}
};

QiSatPlayer.prototype.createVideoElements = function () {
	var _self = this, $canvasMask, $context,
		videoOptions = _self.options.video,
		canvasOptions = _self.options.canvas;

	if(_self.options.videoElem){

		_self.$video = document.createElement("video");
		_self.$video.id = videoOptions.id;
		_self.$video.width = videoOptions.width;
		_self.$video.height = videoOptions.height;

		_self.$videoTag.setAttribute('style', 'height:'+videoOptions.height+'px');
		_self.$menuList.setAttribute('style', 'height:'+videoOptions.height+'px');
		if(videoOptions.width < canvasOptions.width)
			_self.$video.setAttribute('style', 'left:75px');

		if(videoOptions.controls){
			_self.$video.controls = true;
			_self.$video.setAttribute('controls', '');
		}

		if(videoOptions.poster){
			_self.$video.setAttribute('poster', videoOptions.poster);
		}

		_self.$videoTag.appendChild(_self.$video);
	}


	_self.$video.onloadeddata = function(){
		if (_self.$video.paused) {
			_self.$btMain.classList.remove(CLASS_PAUSE);
			_self.$btMain.classList.add(CLASS_PLAY);
			_self.$video.setAttribute('poster', '');
			_self.playAnimation = function (){
				var styles = {
					borderRadius: '50px',
					WebkitBoxShadow: '0px 0px 13px 6px #5D5D5D',
					MozBoxShadow: '0px 0px 10px 4px #5D5D5D',
					boxShadow: '0px 0px 4px 4px #5D5D5D'
				};
				var visibily = _self.$btMain.style.borderRadius;
				for(var id in styles)
					_self.$btMain.style[id] = visibily ? '' : styles[id];
			};
			_self.playShow = setInterval(function(){_self.playAnimation()}, 1000);
		}
		if(_self.$btVolume.classList.contains(CLASS_VOLUME))
			_self.$video.removeAttribute('muted');
	};


	if(_self.options.canvasElem){
		if(_self.$canvas){
			$canvasMask = _self.$canvas;
			$context = $canvasMask.getContext('2d');
			$context.clearRect(0, 0, $canvasMask.width, $canvasMask.height);
		}else{
			_self.$canvas = document.createElement("canvas");
			_self.$canvas.id = canvasOptions.id;
			_self.$canvas.width = canvasOptions.width;
			_self.$canvas.height = canvasOptions.height;
			_self.$videoTag.appendChild(_self.$canvas);

			_self.$canvas.addEventListener("click", function() {
				if (!_self.$video.classList.contains(CLASS_HIDE)) {
					if (_self.playShow) {
						clearInterval(_self.playShow);
						if (_self.$btMain.style.borderRadius)
							_self.playAnimation();
						_self.$btMain.classList.remove(CLASS_VISIBILY);
						_self.$video.onloadeddata = null;
					}
					if (_self.$btMain.classList.contains(CLASS_PLAY)) {
						_self.$video.start();
					} else if (_self.$btMain.classList.contains(CLASS_PAUSE)) {
						_self.$video.pause();
						_self.$btMain.classList.remove(CLASS_PAUSE);
						_self.$btMain.classList.add(CLASS_PLAY);
					} else if (_self.$btMain.classList.contains(CLASS_REVEW)) {
						_self.$video.currentTime = 0;
						_self.$video.start();
					}
				}
			});

			_self.mascara();
		}
	}
};

QiSatPlayer.prototype.setVideoElements = function () {
	var _self = this, videoData, $sourceElems, $sourceElem, src = [], type= [],
		videoOptions = _self.options.video, videosLength, sourcesLength, typesLength, length, data, dataLocal,regEx = /\//g,
		result = false, url = _self._path.local + _self._path.defaLocal+ _self._path.defaArq;

	videoData = _self.getDataVideo();
	_self.options.video.filename = videoData.video;

	$sourceElems = _self.$video.querySelectorAll('source');
	sourcesLength = $sourceElems.length;
	videosLength = videoOptions.ext.length;
	typesLength = Object.keys(videoOptions.types).length;

	if(typesLength){

		while(sourcesLength--){
			$sourceElem = $sourceElems[sourcesLength];
			_self.$video.removeChild($sourceElem);
		}

		while(videosLength--){
			if(videoOptions.types.hasOwnProperty(videoOptions.ext[videosLength])){
				type.push(videoOptions.types[videoOptions.ext[videosLength]]);
			}else if(videoOptions.types.hasOwnProperty(videoOptions.ext[videosLength]+'-codecs')){
				type.push(videoOptions.types[videoOptions.ext[videosLength]+'-codecs']);
			}
			src.push( _self._path.videos + videoData.video + '.' + videoOptions.ext[videosLength]);
		}

		dataLocal = _self._path.data+_self._path.videos.replace(regEx, "\\");
		data = 'url='+ window.location.href +'&type='+ type.join('|')+'&src='+src.join('|')+'&defaLocal='+_self._path.defaLocal+'&dataLocal='+dataLocal;
		xhReq.setContentType("application/x-www-form-urlencoded");
		xhReq.setResponseType('text');
		xhReq.setAsync(false);

		xhReq.post(url, data).success( function (data, xhr){
			var duration;
			result = data.split('|');
			duration = result[0];
			duration = duration.substring(duration.indexOf('&duration=')+10);
			_self.duration = parseFloat(duration).toFixed(2);
		}).error(  function (data, xhr){
			result = false;
		});

		//_self.loadVideo('http://mn54.mntec.com.br:90/repository/coursefilearea/file.php/185/Aula1/un0_0mc1_1.mp4', 'video/mp4');
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if(iOS){
			_self.loadVideo(result.pop(), type.pop());
		}else{
			length = result.length;
			while(length--){
				$sourceElem = document.createElement("source");
				$sourceElem.src = result[length];
				$sourceElem.type = type[length];
				_self.$video.appendChild($sourceElem);
			}
		}

	}else{
		throw new Error(ERROR_NOT_VIDEO_EXT);
	}
};

QiSatPlayer.prototype.loadVideo = function (result, type) {
	var _self = this, xhr = new XMLHttpRequest();

	_self.$video.setAttribute('poster', _self.options.video.poster);

	xhr.responseType = 'blob';
	xhr.onload = function() {
		var reader = new FileReader();
		reader.onloadend = function() {
			var byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
			var byteNumbers = new Array(byteCharacters.length);
			for (var i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			if(type.indexOf(';') > 0)
				type = type.substr(0, type.indexOf(';'));//type = 'video/mp4';
			var blob = new Blob([byteArray], {type: type});
			var $sourceElem = document.createElement("source");
			$sourceElem.src = URL.createObjectURL(blob);
			$sourceElem.type = type;
			_self.$video.appendChild($sourceElem);

			_self.$video.removeAttribute('poster');
		};
		reader.readAsDataURL(xhr.response);
	};
	xhr.onerror = function() {
		_self.loadVideo(result, type);
	};
	xhr.open('GET', result);
	/*xhr.addEventListener("progress", function(event){
	  console.log(event);
	  if (event.lengthComputable) {
	    var percent = Math.round(event.loaded * 100 / event.total); //cálculo simples de porcentagem.
	    //document.getElementById('progressbar').value = percent; //atualiza o valor da progress bar.
	  } else {
	    //não é possível computar o progresso =/
	  }
	}, false);*/
	xhr.send();
};

QiSatPlayer.prototype.mascara = function () {
	var _self = this, $img, src,
		options = _self.options.canvas,
		$canvasMask = _self.$canvas,
		$context = $canvasMask.getContext('2d');

	_self.desenhar = function (){
		var videoData = _self.getDataVideo();
		$context.clearRect(0, 0, canvasMask.width, canvasMask.height);

		if (_self.$video.classList.contains(CLASS_HIDE)) {

			_self.$canvas.left = _self.options.canvas.width-_self.options.canvas.imgWidth+'px';

			if(!_self.options.canvas.img){
				$img = document.createElement("img");
				$img.width = _self.options.canvas.imgWidth;
				$img.height = _self.options.canvas.imgHeight;
			}else{
				$img = _self.options.canvas.img;
			}

			src = videoData.img;

			if($img.src.indexOf(src) < 0) {
				$img.src = src
			}

			_self.options.canvas.img = $img;
			$context.drawImage($img,75,0, _self.options.canvas.imgWidth, _self.options.canvas.imgHeight);
		}

		if(_self.options.mascara){
			_self.desenharCanvas();
			options.hue += 0.5;
			options.sat += options.val2;
			options.val += options.val2;
			if (options.sat>=57) {
				options.val2 = -0.5;
			} else if (options.sat<=0) {
				options.val2 = 0.5;
			}
		}
	};

	_self.startMascara = setInterval(function(){_self.desenhar()}, 50);

	_self.stopMascara = function(){
		clearInterval(_self.startMascara);
	}
};

QiSatPlayer.prototype.desenharCanvas = function (){
	var _self = this, diferenca = 45, count = 0, $canvasMask, $context;

	$canvasMask = _self.$canvas;
	$context = $canvasMask.getContext('2d');
	$context.fillStyle = "rgba(120,120,120,0.1)";
	$context.beginPath();

	if(_self.options.canvas.sentido){
		$context.moveTo(0,0);
		$context.lineTo(diferenca,0);
		$context.lineTo($canvasMask.width,$canvasMask.height-diferenca);
		$context.lineTo($canvasMask.width,$canvasMask.height);
		$context.lineTo($canvasMask.width-diferenca,$canvasMask.height);
		$context.lineTo(0,diferenca);
	} else {
		$context.moveTo(0,$canvasMask.height);
		$context.lineTo(diferenca,$canvasMask.height);
		$context.lineTo($canvasMask.width,diferenca);
		$context.lineTo($canvasMask.width,0);
		$context.lineTo($canvasMask.width-diferenca,0);
		$context.lineTo(0,$canvasMask.height-diferenca);
	}
	$context.fill();
	$context.font = "16px 'Arial'";
	$context.fillStyle = "hsla("+_self.options.canvas.hue+","+_self.options.canvas.sat+"%,"+_self.options.canvas.val+"%,0.5)";
	$context.textAlign = "center";
	/******************** Posições dos textos na mascara ********************/
	while (count<11) {
		$context.fillText(_self.options.chave, _self.posVideo(count), 535-48.5*(count++));
	}

	if (_self.$video.paused && !_self.$video.classList.contains(CLASS_HIDE) && _self.$video.duration) {
		//make circle
		var options_graph = {
			size: 140,
			lineWidth: 12
		};
		var radius = (options_graph.size - options_graph.lineWidth) / 2;
		var drawCircle = function(color, lineWidth, percent) {
			percent = Math.min(Math.max(0, percent || 1), 1);
			$context.beginPath();
			$context.arc(497, 285, radius, 0, Math.PI * 2 * percent, false);
			$context.strokeStyle = color;
			$context.lineCap = 'round'; // butt, round or square
			$context.lineWidth = lineWidth;
			$context.stroke();
		};
		drawCircle('rgba(180, 180, 180, 0.6)', options_graph.lineWidth, 1);
		//make play button
		$context.fillStyle = "rgba(180, 180, 180, 0.6)";
		$context.beginPath();
		$context.moveTo(475, 245);
		$context.lineTo(475, 325);
		$context.lineTo(540, 285);
		$context.fill();

		/*if(_self.$video.loaded)
			_self.$video.removeAttribute('poster');
		 else
			_self.$video.setAttribute('poster', videoOptions.poster);*/
	}

};

QiSatPlayer.prototype.posVideo = function (count){
	var _self = this;
	if(_self.options.canvas.sentido){
		return 960-90.5*count;
	}
	return 46+91*count;
};

QiSatPlayer.prototype.posImagem = function(count){
	var _self = this;
	if(_self.options.canvas.sentido){
		return 888-84*count;
	}
	return 46+84*count;
};

QiSatPlayer.prototype.getFileXML = function () {
	var _self = this;
	return  _self._path.xml+_self._filename;
};

QiSatPlayer.prototype.setAula = function (aulaNum) {
	var _self = this;

	if(aulaNum && aulaNum != _self._aula){
		_self._aula = aulaNum;
	}

	if(location.hostname.toUpperCase() == "LOCALHOST" || location.hostname.toUpperCase() == "MN01"){
		if(_self._path.videos.indexOf('[aula]') > 0)
			_self._path.videos = _self._path.videos.replace("[aula]", _self._aula);

		if(_self._path.imgMask.indexOf('[aula]') > 0)
			_self._path.imgMask = _self._path.imgMask.replace("[aula]", _self._aula);
	}
};

QiSatPlayer.prototype.setUnid = function (unid) {
	var _self = this;

	if(typeof unid == "number")
		unid = unid.toString();

	if( (typeof unid !== "undefined") && unid != _self._unid){
		if(_self.options.geraLog && _self._unid != undefined) _self.geraLog(unid);
		_self._unid = unid;
	}
};

QiSatPlayer.prototype.createComponents = function() {
	var _self = this;

	_self.$videoConteiner = document.querySelector(ID+ID_VIDEO_CONTAINER);
	if(_self.$videoConteiner){

		if(typeof _self.$videoConteiner.dataset !== "undefined") {
			_self.$videoConteiner.dataset.aula = _self._aula;
		} else {
			_self.$videoConteiner.setAttribute('data-aula', _self._aula);
		}

		_self.$videoLoad = document.querySelector(ID+ID_VIDEO_LOAD);
		if(!_self.options.videoLoad && _self.$videoLoad)
			_self.$videoLoad.classList.add(CLASS_HIDE);

		_self.$videoTop = document.querySelector(ID+ID_VIDEO_TOP);
		if(!_self.options.top && _self.$videoTop)
			_self.$videoTop.classList.add(CLASS_HIDE);

		_self.$titleAula = document.querySelector(CLASS+CLASS_AULA_TEXT);
		_self.$titleCurso = document.querySelector(CLASS+CLASS_CURSO_TEXT);

		_self.$videoMenu = document.querySelector(ID+ID_VIDEO_MENU);
		if(_self.options.menu){

			_self.$menuAction = document.querySelector(CLASS+CLASS_MENU_ACTION);
			_self.$menuIcon = document.querySelector(CLASS+CLASS_MENU_IMG);
			_self.$menuList = document.querySelector(CLASS+CLASS_MENU_LIST);

			if(_self.$menuAction && _self.$menuList){

				_self.$menuAction.onclick = function(){
					_self.$menuList.classList.toggle(CLASS_HIDE);
				};

				_self.$menuAction.hide = function (){
					_self.$menuList.classList.add(CLASS_HIDE);
				};

				_self.$menuAction.show = function (){
					_self.$menuList.classList.remove(CLASS_HIDE);
				};

			}

		}else if(_self.$videoMenu)
			_self.$videoMenu.classList.add(CLASS_HIDE);

		_self.$videoTag  = document.querySelector(ID+ID_VIDEO_TAG);
		if(!_self.options.videoTag && _self.$videoTag)
			_self.$videoTag.classList.add(CLASS_HIDE);
		else if(_self.$videoTag)
			_self.createVideoElements();

		_self.$videoControls  = document.querySelector(ID+ID_VIDEO_CONTROLS);
		if(!_self.options.controls && _self.$videoControls)
			_self.$videoControls.classList.add(CLASS_HIDE);
		else if(_self.$videoControls)
			_self.controlsBar();

	}
};

QiSatPlayer.prototype.controlsBar = function() {
	var _self = this,
		$divVolBar, $divVolTrack, $divVolThumb;

	_self.$btNext   = document.querySelector(CLASS+CLASS_NEXT_DISABLE);
	_self.$btBack   = document.querySelector(CLASS+CLASS_BACK_DISABLE);
	_self.$btMain    = document.querySelector(CLASS+CLASS_PAUSE);
	_self.$btVolume  = document.querySelector(CLASS+CLASS_VOLUME);
	_self.$barSeek   = document.querySelector(ID+ID_SEEK_BAR);
	_self.$barVolume = document.querySelector(ID+ID_VOLUME_BAR);
	_self.$playbackRate = document.querySelector(ID+ID_PLAYBACK_RATE);
	_self.$divSeta   = document.querySelector(ID+ID_DIV_LEGENDA_SETA);
	_self.$divTime   = document.querySelector(ID+ID_DIV_VIDEO_TIME);
	_self.$divSlides = document.querySelector(ID+ID_DIV_SLIDES);
	_self.$textTime  = document.querySelector(ID+ID_TIME_TEXT);
	_self.$progress  = document.querySelector(ID+ID_PROGRESS);
	_self.$btClose   = document.querySelector(CLASS+CLASS_BT_CLOSE);
	_self.$textLegenda  = document.querySelector(ID+ID_LEGENDA_TEXT);
	_self.$textDuration = document.querySelector(ID+ID_DURATION_TEXT);


	_self.$btNext.startAnimation = function (){
		var self = this;

		self.animation = function (){
			self.classList.toggle(CLASS_VISIBILY);
		};

		self.start = setInterval(function(){self.animation()}, 1000);

		self.stopAnimation = function(){
			_self.$btMain.classList.remove(CLASS_REVEW);
			_self.$btMain.classList.add(CLASS_PAUSE);
			self.classList.remove(CLASS_VISIBILY);
			self.classList.remove(CLASS_NEXT);
			self.classList.add(CLASS_NEXT_DISABLE);
			clearInterval(self.start);
		};
	};

	_self.$btNext.addEventListener("click", function() {
		var dataSubLine;
		if(!this.classList.contains(CLASS_NEXT_DISABLE)){

			if(typeof this.dataset !== "undefined") {
				dataSubLine = this.dataset.subline;
			} else {
				dataSubLine = this.getAttribute('data-subline');
			}

			if( (dataSubLine) && (typeof _self._subLine !== "undefined")){
				if(_self.subLineVideos[_self._subLine]){
					if(_self._subTimeVideo == _self.subLineVideos[_self._subLine].videos.length-1){
						this.removeAttribute('data-subline');
					}
				}
			}
			_self.nextVideo();
		}
	});

	_self.$btBack.addEventListener("click", function() {
		var dataSubLine;
		if(!this.classList.contains(CLASS_BACK_DISABLE)){

			if(typeof this.dataset !== "undefined") {
				dataSubLine = this.dataset.subline;
			} else {
				dataSubLine = this.getAttribute('data-subline');
			}

			if( (dataSubLine) && (typeof _self._subLine !== "undefined")){
				if(_self.subLineVideos[_self._subLine]){
					if(_self._subTimeVideo == 0){
						this.removeAttribute('data-subline');
					}
				}
			}
			_self.backVideo();
		}
	});

	if(_self.$barVolume){

		if(_self.$barVolume.type == "text"){
			$divVolBar = document.createElement('div');
			$divVolTrack = document.createElement('div');
			$divVolThumb = document.createElement('div');

			$divVolBar.setAttribute('class', CLASS_VOLUME_BAR);
			$divVolTrack.setAttribute('class', CLASS_VOLUME_TRACK);
			$divVolThumb.setAttribute('class', CLASS_VOLUME_THUMB);

			$divVolBar.setAttribute('value', 1);
			$divVolTrack.setAttribute('value', 1);
			$divVolTrack.style.width = "100%";

			$divVolTrack.appendChild($divVolThumb);
			$divVolBar.appendChild($divVolTrack);

			_self.$videoControls.insertBefore($divVolBar, _self.$divSlides);
			_self.$videoControls.removeChild(_self.$barVolume);
			$divVolThumb.style.marginLeft = $divVolTrack.offsetWidth+"px";
			_self.$barVolume = $divVolBar;
			_self.$barVolume.$track = $divVolTrack;
			_self.$barVolume.$thumb = $divVolThumb;
		}

		_self.$btVolume.addEventListener("click", function() {
			if(this.classList.contains(CLASS_VOLUME)){
				if (_self.$video.muted == false) {
					_self.$video.muted = true;
					_self.$video.volume = 0;
					_self.$barVolume.value = 0;
					this.classList.remove(CLASS_VOLUME);
					this.classList.add(CLASS_MUTE);

					if(_self.$barVolume.$track){
						_self.$barVolume.setAttribute('value', 0);
						_self.$barVolume.$track.setAttribute('value', 0);
						_self.$barVolume.$track.style.width = "0%";
						_self.$barVolume.$thumb.style.marginLeft = "0px";
					}
				}
			}else if(this.classList.contains(CLASS_MUTE)){
				if (_self.$video.muted == true) {
					_self.$video.muted = false;
					_self.$barVolume.value = 1;
					_self.$video.volume = 1;
					this.classList.remove(CLASS_MUTE);
					this.classList.add(CLASS_VOLUME);

					if(_self.$barVolume.$track){
						_self.$barVolume.setAttribute('value', 1);
						_self.$barVolume.$track.setAttribute('value', 1);
						_self.$barVolume.$track.style.width = "100%";
						_self.$barVolume.$thumb.style.marginLeft = _self.$barVolume.$track.offsetWidth+"px";
					}
				}
			}
		});

		_self.$barVolume.change = function(e) {
			var value = this.value;

			if(_self.$barVolume.$track){
				value = e.offsetX / _self.$barVolume.offsetWidth;
				value = value.toFixed(2);
				_self.$barVolume.setAttribute('value', value);
				_self.$barVolume.$track.setAttribute('value', value);
				_self.$barVolume.$track.style.width = (value*100)+"%";
				_self.$barVolume.$thumb.style.marginLeft = _self.$barVolume.$track.offsetWidth+"px";
			}
			_self.$video.volume = value;
			if(value == 0){
				_self.$video.muted = true;
				_self.$btVolume.classList.remove(CLASS_VOLUME);
				_self.$btVolume.classList.add(CLASS_MUTE);
			}else if((value > 0) && (_self.$video.muted == true)){
				_self.$video.muted = false;
				_self.$btVolume.classList.remove(CLASS_MUTE);
				_self.$btVolume.classList.add(CLASS_VOLUME);
			}
		};

		if(_self.$barVolume.tagName == "INPUT"){
			_self.$barVolume.addEventListener("change", _self.$barVolume.change, false);
		}else if(_self.$barVolume.tagName == "DIV"){
			_self.$barVolume.addEventListener("click", _self.$barVolume.change, false);
		}
	}

	if(_self.$divSeta){
		_self.$divSeta.addEventListener("click", function() {
			if(this.classList.contains(CLASS_LEGENDA_LEFT)){
				this.classList.remove(CLASS_LEGENDA_LEFT);
				this.classList.add(CLASS_LEGENDA_RIGHT);
				_self.$divTime.classList.add(CLASS_HIDE);
				_self.$divSlides.classList.add(CLASS_HIDE);
				_self.$barVolume.classList.add(CLASS_HIDE);
				_self.$textLegenda.classList.remove(CLASS_HIDE);
			}else{
				this.classList.add(CLASS_LEGENDA_LEFT);
				this.classList.remove(CLASS_LEGENDA_RIGHT);
				_self.$divTime.classList.remove(CLASS_HIDE);
				_self.$divSlides.classList.remove(CLASS_HIDE);
				_self.$barVolume.classList.remove(CLASS_HIDE);
				_self.$textLegenda.classList.add(CLASS_HIDE);
			}
		});
	}

	_self.$btMain.addEventListener("click", function() {
		if(_self.playShow){
			clearInterval(_self.playShow);
			if(_self.$btMain.style.borderRadius)
				_self.playAnimation();
			_self.$btMain.classList.remove(CLASS_VISIBILY);
			_self.$video.onloadeddata = null;
		}
		if(this.classList.contains(CLASS_PLAY)){
			_self.$video.start();
		}else if(this.classList.contains(CLASS_PAUSE)){
			_self.$video.pause();
			this.classList.remove(CLASS_PAUSE);
			this.classList.add(CLASS_PLAY);
		}else if(this.classList.contains(CLASS_REVEW)){
			_self.$video.currentTime = 0;
			_self.$video.start();
		}
	});

	if(_self.$video){

		_self.$video.end = function (){

			var checkNext, checkBack, unid, subUnid, length, videoData, $btSubVideos,
				videoData = _self.getDataVideo(),
				subLineLength;

			if(!_self.$video.paused) _self.$video.pause();
			_self.$video.classList.add(CLASS_HIDE); // mostra imagem

			_self.$btMain.classList.remove(CLASS_PAUSE);
			_self.$btMain.classList.remove(CLASS_PLAY);
			_self.$btMain.classList.add(CLASS_REVEW);

			_self.btAction = [];
			var btActionEvent = function(subLine){
				var dataSubLine = _self.getDataSubLineVideo(subLine);
				if(dataSubLine){
					if(typeof _self.$btNext.dataset !== "undefined") {
						_self.$btNext.dataset.subline = subLine;
						_self.$btBack.dataset.subline = subLine;
					} else {
						_self.$btNext.setAttribute('data-subline', subLine);
						_self.$btBack.setAttribute('data-subline', subLine);
					}
					_self.carregarVideo({'subLine': dataSubLine.index});
				}
			};

			checkNext = true;

			if(  (_self._unid.indexOf('.') < 0) && (_self.listPlay[_self._index].subItens.length == 0) ) {
				if( _self._index+1 == _self.listPlay.length) {
					if(_self._slide+1 == _self._slides.length){
						length = _self._slides[_self._slide].length;
						if(_self._subVideo+1 == length){
							checkNext = false;
						}
					}
				}
			}else if((_self._unid.indexOf('.') > 0) && (_self.listPlay.length-1 == _self._index)){
				if( _self._subIndex+1 == _self.listPlay[_self._index].subItens.length) {
					if(_self._slide+1 == _self._slides.length){
						length = _self._slides[_self._slide].length;
						if(_self._subVideo+1 == length){
							checkNext = false;
						}
					}
				}
			}

			if(videoData.subLineVideos){
				subLineLength = videoData.subLineVideos.length;

				while(subLineLength--){
					$btSubVideos = document.createElement('div');
					$btSubVideos.classList.add(videoData.subLineVideos[subLineLength].action);
					$btSubVideos.addEventListener("click",( function(data)
					{ return function() {
						btActionEvent(data);
					};
					})(videoData.subLineVideos[subLineLength].id), false);
					_self.btAction.push($btSubVideos);
					_self.$videoTag.appendChild($btSubVideos);
				}
			}

			if(videoData.btnImagens && videoData.btnImagens.length){

				videoData.btnImagens.map(function(btnImg){
					var $btnImg = document.createElement('div');

					$btnImg.classList.add('lightbox');

					if(btnImg.class)
						$btnImg.classList.add(btnImg.class);

					if(btnImg.id)
						$btnImg.id = btnImg.id;

					//console.log(btnImg);

					if(btnImg.pos){
						var canvas = _self.options.canvas;

						if(btnImg.pos.top){
							var top = parseInt(btnImg.pos.top.replace('px',''));
							$btnImg.style.top = (top+(video.height-canvas.imgHeight))+'px';
						}

						if(btnImg.pos.left){
							var left = parseInt(btnImg.pos.left.replace('px',''));
							$btnImg.style.left = (left+(video.width-canvas.imgWidth))+'px';
						}

						if(btnImg.pos.width)
							$btnImg.style.width = btnImg.pos.width;

						if(btnImg.pos.height)
							$btnImg.style.height = btnImg.pos.height;
					}

					var $img = document.createElement('img');
					$img.src = "#";
					if(btnImg.pos.width)
						$img.style.width = btnImg.pos.width;
					if(btnImg.pos.height)
						$img.style.height = btnImg.pos.height;
					$img.style.opacity = 0;

					if(btnImg.imagens && btnImg.imagens.length > 1){
						btnImg.imagens.map(function(img, i){
							var $el = document.createElement('a');

							$el.href = img.src;
							if(typeof $el.dataset !== "undefined")
								$el.dataset.lightbox = btnImg.id+'-'+0;
							else
								$el.dataset.setAttribute('data-lightbox', btnImg.id+'-'+0);

							$el.appendChild($img);
							$img = $img.cloneNode(true);

							$btnImg.appendChild($el);
						});
					}else if(btnImg.imagens){
						var img = btnImg.imagens[0];
						var $el = document.createElement('a');

						$el.href = img.src;
						if(typeof $el.dataset !== "undefined")
							$el.dataset.lightbox = btnImg.id+'-'+0;
						else
							$el.dataset.setAttribute('data-lightbox', btnImg.id+'-'+i);

						$btnImg.appendChild($el);
						$el.appendChild($img);
					}

					$btnImg.addEventListener("click",( function(data)
					{ return function() {
						//console.log(data);
					};
					})($btnImg), false);


					_self.btAction.push($btnImg);
					_self.$videoTag.insertBefore($btnImg, _self.$videoTag.childNodes[2]);
				});
			}


			if(typeof _self._subLine !== "undefined"){
				checkNext = true;
			}

			if(checkNext){
				_self.$btNext.classList.remove(CLASS_NEXT_DISABLE);
				_self.$btNext.classList.add(CLASS_NEXT);
				_self.$btNext.startAnimation();
			}else if(_self.$btNext.classList.contains(CLASS_NEXT)){
				_self.$btNext.stopAnimation();
				_self.$btNext.classList.remove(CLASS_NEXT);
				_self.$btNext.classList.add(CLASS_NEXT_DISABLE);
			}

			_self.$btClose.classList.add(CLASS_HIDE);
			_self.$menuAction.show();

			_self.start_graph();

		};



		_self.start_graph = function (){
			var unidade = _self._slides.length - 1;
			var nivel = _self._slides[unidade].length - 1;
			if(_self.$graph == undefined && _self.autoplay.checkbox.checked
					&& _self.$video.classList.contains(CLASS_HIDE)
					&& (_self._slide != unidade || _self._subVideo != nivel)){
				_self.$graph = document.createElement("div");
				_self.$graph.id = 'graph';
				_self.$graph.style.position = 'relative';
				_self.$graph.style.width = '220px';
				_self.$graph.style.height = '220px';
				_self.$graph.style.zIndex = 30;
				_self.$graph.style.top = '215px';
				_self.$graph.style.left = '480px';
				_self.$graph.style.padding = '40px 0 0 38px';
				_self.$videoTag.appendChild(_self.$graph);

				_self.$graph.canvas = document.createElement('canvas');
				_self.$graph.canvas.style.display = 'block';
				_self.$graph.canvas.style.position = 'absolute';
				_self.$graph.canvas.style.top = 0;
				_self.$graph.canvas.style.left = 0;
				_self.$graph.appendChild(_self.$graph.canvas);

				_self.$graph.span = document.createElement('span');
				_self.$graph.span.textContent = _self.$graph.span.segundos = 10;
				_self.$graph.span.style.color = 'rgba(180, 180, 180, 1)';
				//_self.$graph.span.style.textShadow = '1px 1px gray';
				_self.$graph.span.style.display = 'block';
				_self.$graph.span.style.width = '40px';
				_self.$graph.span.style.font = '100 40px sans-serif';
				_self.$graph.span.style.textAlign = 'center';
				_self.$graph.span.style.animation = 'glow .5s infinite alternate';
				_self.$graph.appendChild(_self.$graph.span);

				var options_graph = {
					percent:  0,
					size: _self.$graph.getAttribute('data-size') || 120,
					lineWidth: _self.$graph.getAttribute('data-line') || 12,
					rotate: _self.$graph.getAttribute('data-rotate') || 0
				};

				_self.desenhar_graph = function (){
					var ctx = _self.$graph.canvas.getContext('2d');
					_self.$graph.canvas.width = _self.$graph.canvas.height = options_graph.size;

					ctx.translate(options_graph.size / 2, options_graph.size / 2);
					ctx.rotate((-1 / 2 + options_graph.rotate / 180) * Math.PI); // rotate -90 deg

					var radius = (options_graph.size - options_graph.lineWidth) / 2;

					var drawCircle = function(color, lineWidth, percent) {
						percent = Math.min(Math.max(0, percent || 1), 1);
						ctx.beginPath();
						ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
						ctx.strokeStyle = color;
						ctx.lineCap = 'round'; // butt, round or square
						ctx.lineWidth = lineWidth;
						ctx.stroke();
					};

					drawCircle('rgba(180, 180, 180, 0.5)', options_graph.lineWidth, 1);
					if(options_graph.percent)
						drawCircle('rgba(180, 180, 180, 0.5)', options_graph.lineWidth, options_graph.percent / 360);

					var lightbox = document.getElementById('lightbox');
					if(!lightbox || lightbox.style.display != "block"){
						var segundos = parseFloat(_self.$graph.span.segundos);
						if(segundos > -1){
							segundos = segundos - (10 / 360);
							_self.$graph.span.segundos = segundos;
							if(parseInt(segundos) > -1)
								_self.$graph.span.textContent = Math.ceil(parseFloat(segundos));
						} else {
							_self.nextVideo();
							clearInterval(_self.startGraph);
						}

						if(options_graph.percent < 360)
							options_graph.percent += 1;
					}

				};

				_self.desenhar_graph();
				_self.startGraph = setInterval(function(){
					_self.desenhar_graph();
				}, 10000 / 360);
			}
		};



		_self.$video.start = function (load){
			var checkBack = true, btActionLength;



			if(_self.$graph != undefined){
				clearInterval(_self.startGraph);
				_self.$videoTag.removeChild(_self.$graph);
				delete _self.$graph;
			}



			if(_self.btAction){
				btActionLength = _self.btAction.length;
				while(btActionLength--){
					_self.$videoTag.removeChild(_self.btAction[btActionLength]);
					delete(_self.btAction[btActionLength]);
				}
				delete(_self.btAction);
			}

			if( _self.$btNext){
				if(_self.$btNext.classList.contains(CLASS_NEXT)){
					_self.$btNext.stopAnimation();
					_self.$btNext.classList.remove(CLASS_NEXT);
					_self.$btNext.classList.add(CLASS_NEXT_DISABLE);
				}

			}

			if( _self.$btBack){
				if((_self._unid.indexOf('.') < 0) && (_self._index == 0) && (_self._slide == 0)
					&& (_self._subVideo == 0) && (typeof _self._subLine === "undefined")){
					checkBack = false;
				}

				if(checkBack){
					if(_self.$btBack.classList.contains(CLASS_BACK_DISABLE))
						_self.$btBack.classList.remove(CLASS_BACK_DISABLE);
					if(!_self.$btBack.classList.contains(CLASS_BACK))
						_self.$btBack.classList.add(CLASS_BACK);
				}else if(_self.$btBack.classList.contains(CLASS_BACK)){
					_self.$btBack.classList.remove(CLASS_BACK);
					_self.$btBack.classList.add(CLASS_BACK_DISABLE);
				}
			}

			if(	_self.$btClose && _self.$btClose.classList.contains(CLASS_HIDE)){
				_self.$btClose.classList.remove(CLASS_HIDE);
			}

			if(	_self.$video.classList.contains(CLASS_HIDE)){
				_self.$video.classList.remove(CLASS_HIDE);
			}

			if(_self.$btMain){
				_self.$btMain.classList.remove(CLASS_PLAY);
				_self.$btMain.classList.remove(CLASS_REVEW);
				_self.$btMain.classList.add(CLASS_PAUSE);
			}

			_self.$menuAction && _self.$menuAction.hide();

			if(load) {
				_self.$video.load();
				if (_self.$playbackRate)
					_self.$playbackRate.label.textContent = "VEL. DE REP.: 1x";
			}
			var promise = _self.$video.play();
			if (promise !== undefined) {
				//console.log(promise);
				promise.then(function() {
					console.log('Autoplay started!');
					_self.$video.muted = false;
				}).catch(function(error) {
					//document.location.reload(true);
					console.log(error);
					var params = window.location.href.split('?');
					if(!params[1] || params[1] != 'autoload')
						window.location.href = params[0] + "?autoload";
				});
			}

		};

		_self.$video.timeup = function () {

			var curmins = Math.floor(_self.$video.currentTime / 60),
				cursecs = Math.floor(_self.$video.currentTime - curmins * 60),
				value = ( _self.$video.currentTime  / _self.duration );


			//console.log(value+' '+curmins+':'+cursecs+"----- "+_self.$video.currentTime+"/"+_self.$video.duration+' '+_self.duration);

			cursecs = (cursecs < 10) ? "0" + cursecs : cursecs;
			curmins = (curmins < 10) ? "0" + curmins : curmins;
			_self.$textTime.innerHTML = curmins+":"+cursecs;

			_self.$progress.value = (value) ? value : 0;
			if(value && _self.$progress.$bar){
				_self.$progress.$bar.setAttribute('value',value);
				value *= 100;
				_self.$progress.$bar.style.width = value.toFixed(2)+"%";
			}
		};

		_self.$video.loadedData = function () {
			var durmins = Math.floor(_self.duration / 60),
				dursecs = Math.floor(_self.duration - durmins * 60);
			dursecs = (dursecs < 10) ? "0"+dursecs : dursecs;
			durmins = (durmins < 10) ? "0"+durmins : durmins;
			_self.$textDuration.innerHTML = durmins+":"+dursecs;
		};

		_self.$video.addEventListener("timeupdate", _self.$video.timeup , false);
		_self.$video.addEventListener("loadedmetadata", _self.$video.loadedData , false);
		_self.$video.addEventListener("ended", _self.$video.end, false);
	}

	if(_self.$progress){

		if( _self.$progress instanceof HTMLUnknownElement ){
			var $divProg = document.createElement('div');
			var $divBar = document.createElement('div');
			$divProg.setAttribute('class', CLASS_PROGRESS);
			$divBar.setAttribute('class', CLASS_PROGRESS_BAR);
			$divProg.appendChild($divBar);
			_self.$videoControls.insertBefore($divProg, _self.$videoControls.childNodes[0]);
			_self.$videoControls.removeChild(_self.$progress);
			_self.$progress = $divProg;
			_self.$progress.$bar = $divBar;
		}

		_self.$progress.change = function (e) {
			var value, time;

			console.log(_self.$video.currentTime);

			if(_self.$progress.$bar){
				value = e.offsetX / _self.$progress.offsetWidth,
					time = _self.duration * value;
				_self.$video.currentTime = time;
				_self.$progress.$bar.setAttribute('value',value.toFixed(2));
				value *= 100;
				_self.$progress.$bar.style.width = value.toFixed(2)+"%";
			}else{
				value = e.offsetX * _self.$progress.max / _self.$progress.offsetWidth;
				time = _self.duration * value;
				_self.$video.currentTime = Math.floor(time);
				_self.$progress.value = value.toFixed(2);
				value *= 100;
			}

			console.log(_self.$video.currentTime);

			if( Math.floor(value) == 100 ){
				_self.$video.end();
			}else if( _self.$video.classList.contains(CLASS_HIDE) ){
				_self.$video.start();
			}

			_self.$video.removeEventListener("timeupdate", _self.$video.timeup, false);
			_self.$video.addEventListener("timeupdate", _self.$video.timeup , false);

		};

		_self.$progress.addEventListener("click", _self.$progress.change, false);
	}

	_self.$btClose.addEventListener("click", _self.$video.end, false);



	if(_self.options.autoplay && !_self.autoplay){
		_self.autoplay = document.createElement('div');
		_self.autoplay.style.color = '#FFF';
		_self.autoplay.style.font = 'bolder 11px "PT Sans", Arial, Helvetica, sans-serif';
		_self.autoplay.style.margin = '12px 0 0 12px';
		_self.autoplay.style.float = 'left';
		_self.autoplay.style.border = '1px solid #5D5D5D';
		_self.autoplay.style.borderRadius = '50px';
		_self.autoplay.style.padding = '0 1px 0 9px';
		_self.$videoControls.appendChild(_self.autoplay);

		_self.autoplay.label = document.createElement('label');
		_self.autoplay.label.textContent = 'REP. AUTO:';
		_self.autoplay.label.style.verticalAlign = 'super';
		_self.autoplay.appendChild(_self.autoplay.label);

		_self.autoplay.checkbox = document.createElement('input');
		_self.autoplay.checkbox.id = 'autoplay';
		_self.autoplay.checkbox.type = 'checkbox';
		_self.autoplay.checkbox.style.width = '20px';
		_self.autoplay.checkbox.change = function (e) {
			if(_self.autoplay.checkbox.checked) {
				_self.start_graph();
			} else {
				clearInterval(_self.startGraph);
				if(_self.$graph){
					_self.$videoTag.removeChild(_self.$graph);
					delete _self.$graph;
				}
			}
		};
		_self.autoplay.checkbox.addEventListener("click", _self.autoplay.checkbox.change, false);
		_self.autoplay.appendChild(_self.autoplay.checkbox);
	}


	if(_self.options.playbackRate && !_self.$playbackRate){
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		_self.$playbackRate = document.createElement('div');
		_self.$playbackRate.style.color = '#FFF';
		_self.$playbackRate.style.font = 'bolder 11px "PT Sans", Arial, Helvetica, sans-serif';
		_self.$playbackRate.style.margin = '11px 0 0 12px';
		_self.$playbackRate.style.float = 'left';
		_self.$playbackRate.style.border = '1px solid #5D5D5D';
		_self.$playbackRate.style.borderRadius = '50px';
		_self.$playbackRate.style.padding = '1px 8px 1px 3px';
		_self.$playbackRate.style.width = iOS ? '183px' : '153px';
		_self.$videoControls.appendChild(_self.$playbackRate);

		_self.$playbackRate.click = function(){
			var valores = [0.5, 0.75, 1, 1.25, 1.5, 2];
			var index = valores.indexOf(_self.$video.playbackRate) + ($(this).text()=='+' ? 1 : -1);
			if(valores[index]){
				_self.$playbackRate.label.textContent = 'VEL. DE REP.: '+valores[index]+'x';
				_self.$video.playbackRate = parseFloat(valores[index]);
			}
		};

		var styles = {
			marginLeft      : '5px',
			borderRadius    : '50%',
			backgroundColor : 'rgb(55, 55, 55)',//rgb(44, 44, 44)
			borderColor     : 'rgb(50, 50, 50)',//#2C2C2C
			color           : 'white',
			outline         : 'none'
		};

		_self.$playbackRate.aumentar = document.createElement('button');
		_self.$playbackRate.aumentar.textContent = '-';
		for(var id in styles)
			_self.$playbackRate.aumentar.style[id] = styles[id];
		_self.$playbackRate.aumentar.addEventListener("click", _self.$playbackRate.click, false);
		_self.$playbackRate.appendChild(_self.$playbackRate.aumentar);

		_self.$playbackRate.label = document.createElement('label');
		_self.$playbackRate.label.textContent = "VEL. DE REP.: 1x";
		_self.$playbackRate.label.style.marginLeft = '5px';
		_self.$playbackRate.appendChild(_self.$playbackRate.label);

		_self.$playbackRate.diminuir = document.createElement('button');
		_self.$playbackRate.diminuir.textContent = '+';
		for(var id in styles)
			_self.$playbackRate.diminuir.style[id] = styles[id];
		_self.$playbackRate.diminuir.style.float = 'right';
		_self.$playbackRate.diminuir.addEventListener("click", _self.$playbackRate.click, false);
		_self.$playbackRate.appendChild(_self.$playbackRate.diminuir);

		document.getElementsByClassName('space')[0].style.marginLeft = iOS ? '35px' : '50px';
		var slides = document.getElementById('slides');
		slides.style.marginLeft = '30px';
		slides.style.width = '177px';
		document.getElementById('video-time').style.width = '75px';
	}



};

QiSatPlayer.prototype.getDataTopXML = function (tag){
	var _self = this, title,
		curso = _self.courses[0],
		aula  = _self.aulas[0],
		num;

	//if ( curso.hasAttributes("titulo")){
	title = curso.getAttribute("titulo");
	(_self.$titleCurso) && (_self.$titleCurso.innerHTML = title);
	//}

	//if (aula.hasAttribute("titulo")){
	title = aula.getAttribute("titulo");
	(_self.$titleAula) && (_self.$titleAula.innerHTML = title);
	//}
};

QiSatPlayer.prototype.printMenuXML = function (){
	//'<span class="'+CLASS_AULA_TEXT+'"> AULA '+_self._aula+' </span> <ul class="parent"> '
	var _self = this, subItem, slidesXML, unid, ulMenu, icon_more, x = 0, i, iLength =_self.itens.length, sLength, titulo,
		listHTML = '<span class="'+CLASS_AULA_TEXT+'"></span> <ul class="parent"> ';

	if(_self.$menuList){
		for (; x < iLength; x++){

			subItem = _self.itens[x].getElementsByTagName("subItem");
			unid = _self.itens[x].getAttribute("num");
			sLength = subItem.length;
			titulo = _self.itens[x].getElementsByTagName("titulo")[0].childNodes[0].nodeValue;

			if(sLength>0){
				icon_more = 'li_more';
			}else{
				icon_more = 'li_span';
			}

			listHTML = listHTML + '<div class="li_action li_view '+icon_more+'" data-unid="'+unid+'"></div>';
			listHTML = listHTML + '<li class="li_action" data-unid="'+unid+'" > <div class="li_icon"></div><span>';
			listHTML = listHTML + (titulo);
			listHTML = listHTML + '</span> <div class="clear"></div>';

			if(sLength>0){
				i = 0;
				listHTML = listHTML + '<ul>';
				for (; i < sLength; i++){
					titulo = subItem[i].getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
					unid = subItem[i].getAttribute("num");
					listHTML = listHTML + '<li class="li_action" data-unid="'+unid+'" ><div class="li_icon"></div><span>';
					listHTML = listHTML + (titulo);
					listHTML = listHTML + '</span> <div class="clear"></div> </li> <div class="clear"></div>';
				}
				listHTML = listHTML + '</ul>';
			}
			listHTML = listHTML + '</li><div class="clear"></div>';
		}

		listHTML = listHTML + '</ul>';
		_self.$menuList.innerHTML = listHTML;
	}
}

QiSatPlayer.prototype.printSlidesXML = function (slides){
	var _self = this, i = 0, num, length = slides.length,
		slidesHTML = '<span> PARTE:  </span> ',
		numDefaultSlides = 10; // CONFIG DEFAULT TAMANHO DE SLIDES 

	for (; i < numDefaultSlides; i++){
		num = slides[i].parentNode.getAttribute("num");
		if(i < length && num == _self._unid ){
			slidesHTML = slidesHTML+'<p data-slide="'+i+'" >'+(i+1)+'</p>';
		}else{
			slidesHTML = slidesHTML+'<p class="disable" >'+(i+1)+'</p>';
		}
	}

	_self.$divSlides.innerHTML = slidesHTML;
}


/*
 Nomeclatura DEFAULT - un0_0mc0_v0_0
 un = unidade
 unidade são os <li> da lista podendo ser raiz 3. ou sublista 3.1, 3.2
 mc = move clip (partes ou slides)
 v = video
 Não existe uma lista dos videos de cada parte

 */
QiSatPlayer.prototype.getSlidesXML = function (){
	var _self = this, i = 0, a = 0, elem, num, unid, slidesXML = false,
		iLength = _self.itens.length, sLength;

	if(_self.itens != null && iLength > 0){

		if( _self._unid.indexOf('.') < 0){
			unid = _self._unid;
		}else{
			unid = _self._unid.substring(0,_self._unid.indexOf('.'));
		}

		do{
			elem = _self.itens[i];
			if(elem){
				num = elem.getAttribute("num");
			}
			if(num != unid){
				i++;
			}
		}while(num != unid && i <= iLength);

		if( _self._unid.indexOf('.') > 0){
			var subItem = elem.getElementsByTagName("subItem");
			sLength = subItem.length;
			if(sLength>0){
				do{
					elem = subItem[a];
					if(elem){
						num = elem.getAttribute("num");
					}
					if(num != _self._unid){
						a++;
					}
				}while(num != _self._unid && a <= sLength);
			}
		}

		if(elem){
			slidesXML = elem.getElementsByTagName("slides");
		}
	}
	return slidesXML;
}


QiSatPlayer.prototype.getAulasItensXML = function (){
	var _self = this, num, contItem = 0, elem;

	if(_self.aulas != null && _self.aulas.length > 0){
		do{
			elem = _self.aulas[contItem];
			if(elem)
				num = elem.getAttribute("num");
			if(num != _self._aula){
				contItem++;
			}
		}while(num != _self._aula && contItem < _self.aulas.length );
	}

	if(num == _self._aula){
		_self.itens = elem.getElementsByTagName("item");
	}
}

QiSatPlayer.prototype.getItensXML = function (){
	var _self = this, elem;

	if(_self.aulas != null && _self.aulas.length > 0){
		if(_self.aulas[0]){
			elem = _self.aulas[0];
			if(elem)
				_self.itens = elem.getElementsByTagName("item");
		}
	}
}

QiSatPlayer.prototype.printDataVideo = function (){
	var _self = this, $slideElem, $slidesElem, $slideActive, $ulMenu, $liTemp, $temp,
		dataset, func, i, length,
		slidesHTML = 'PARTE: ',
		numDefaultSlides = 10; // CONFIG DEFAULT TAMANHO DE SLIDES 

	// --- MENU --- 
	$ulMenu = _self.$menuList.querySelectorAll("ul");
	i = $ulMenu.length;
	while (i--) {
		if(!$ulMenu[i].classList.contains('parent')){
			$ulMenu[i].classList.add(CLASS_HIDE);
		}
	}

	$liTemp = document.querySelectorAll('div.li_less');
	i = $liTemp.length;
	while (i--) {
		$liTemp[i].classList.remove('li_less');
		$liTemp[i].classList.add('li_more');
	}

	$liTemp = _self.$menuList.querySelector('div.li_icon-active');
	if($liTemp) {
		$liTemp.classList.remove('li_icon-active');
		$liTemp.classList.add('li_icon');
	}

	$liTemp = _self.$menuList.querySelector('li[data-unid="'+(_self._unid)+'"]');
	if($liTemp) {
		$temp = $liTemp.querySelector('div.li_icon');
		if($temp) {
			$temp.classList.remove('li_icon');
			$temp.classList.add('li_icon-active');
		}else{
			$temp = $liTemp.querySelector('div.li_icon-desactive');
			if($temp) {
				$temp.classList.remove('li_icon-desactive');
				$temp.classList.add('li_icon-active');
			}
		}

		$temp = _self.$menuList.querySelector('div.li_more[data-unid="'+(_self._unid)+'"]');
		if($temp) {
			$temp.classList.remove('li_more');
			$temp.classList.add('li_less');
		}

		$ulMenu = $liTemp.querySelector('ul');
		if($ulMenu){
			$ulMenu.classList.remove(CLASS_HIDE);
			$temp = $ulMenu.querySelectorAll('div.li_icon');
			i = $temp.length;
			while(i--){
				$temp[i].classList.remove('li_icon');
				$temp[i].classList.add('li_icon-desactive');
			}
		}

		if(!$liTemp.parentNode.classList.contains('parent')){
			$temp = $liTemp.parentNode;
			$temp.classList.remove(CLASS_HIDE);
			$temp = $temp.parentNode;

			if(typeof $temp.dataset !== "undefined") {
				dataset = $temp.dataset.unid;
			} else {
				dataset = $temp.getAttribute('data-unid');
			}

			$temp = _self.$menuList.querySelector('div.li_more[data-unid="'+(dataset)+'"]');
			if($temp) {
				$temp.classList.remove('li_more');
				$temp.classList.add('li_less');
			}
		}
	}

	if(typeof _self.$divSlides.dataset !== "undefined") {
		dataset = _self.$divSlides.dataset.unid;
	} else {
		dataset = _self.$divSlides.getAttribute('data-unid');
	}

	// --- SLIDES --- 
	if( ((typeof _self.$divSlides.dataset === "undefined") && (!dataset || dataset != _self._unid))  ||
		( _self.$divSlides.dataset && (!_self.$divSlides.dataset.unid || _self.$divSlides.dataset.unid != _self._unid))) {

		if(typeof _self.$divSlides.dataset !== "undefined") {
			_self.$divSlides.dataset.unid = _self._unid;
		} else {
			_self.$divSlides.setAttribute('data-unid', _self._unid);
		}
		i = 0;
		length = _self._slides.length;
		for (; i < numDefaultSlides; i++)
			if( i < length ){
				slidesHTML = slidesHTML+'<p data-slide="'+i+'" >'+(i+1)+'</p>';
			}else{
				slidesHTML = slidesHTML+'<p class="disable" >'+(i+1)+'</p>';
			}

		_self.$divSlides.innerHTML = slidesHTML;
		_self.slidesClick();
	}

	$slideActive = _self.$divSlides.querySelector("p.active");
	if ($slideActive){
		$slideActive.classList.remove('active');
	}

	$slideElem = _self.$divSlides.querySelector('p[data-slide="'+(_self._slide)+'"]');
	if($slideElem && !$slideElem.classList.contains('active')){
		$slideElem.classList.add('active');
	}

	// --- INFO VIDEO --- 
	document.querySelector(CLASS+CLASS_N_SUBVIDEO).innerHTML = ( _self._subVideo+1 );
	if(_self._slides && _self._slides[_self._slide]){
		document.querySelector(CLASS+CLASS_TOTAL_SUBVIDEO).innerHTML = _self._slides[_self._slide].length;
	}
}

QiSatPlayer.prototype.menuEvents = function (){

	var _self = this, dataset,
		$liAction = document.querySelectorAll(CLASS+CLASS_MENU_LIST+" .li_action"),
		x = $liAction.length;

	while(x--){

		$liAction[x].addEventListener("mouseover", function(){
			var $liTemp, unid;
			if(this.tagName == 'DIV'){
				unid = this.getAttribute('data-unid');
				$liTemp = _self.$menuList.querySelector('li[data-unid="'+unid+'"] > span');
				if($liTemp && !$liTemp.classList.contains(CLASS_ACTIVE))
					$liTemp.classList.add(CLASS_ACTIVE);
			}else if(this.tagName == 'LI'){
				$liTemp = this.querySelector('span');
				if($liTemp && !$liTemp.classList.contains(CLASS_ACTIVE))
					$liTemp.classList.add(CLASS_ACTIVE);
			}

		}, false);

		$liAction[x].addEventListener("mouseout", function(){
			var $liTemp, unid;
			if(this.tagName == 'DIV'){
				unid = this.getAttribute('data-unid');
				$liTemp = _self.$menuList.querySelector('li[data-unid="'+unid+'"] > span');
				if($liTemp && $liTemp.classList.contains(CLASS_ACTIVE))
					$liTemp.classList.remove(CLASS_ACTIVE);
			}else if(this.tagName == 'LI'){
				$liTemp = this.querySelector('span');
				if($liTemp && $liTemp.classList.contains(CLASS_ACTIVE))
					$liTemp.classList.remove(CLASS_ACTIVE);
			}

		}, false);

		$liAction[x].addEventListener("click", function(event){
			var $ulChild, $liTemp, unid, dataset, datasetN, datasetB;
			if(this.tagName == 'DIV'){

				if(this.classList.contains('li_more')){
					unid = this.getAttribute('data-unid');
					$liTemp = _self.$menuList.querySelector('li[data-unid="'+unid+'"]');
					$ulChild = $liTemp.querySelector('li[data-unid="'+unid+'"] > ul');
					if($ulChild){
						$ulChild.classList.remove(CLASS_HIDE);
					}

					$liTemp = document.querySelectorAll('div.li_less');
					for( var a = 0; a < $liTemp.length; a++ ) {
						$liTemp[a].classList.remove('li_less');
						$liTemp[a].classList.add('li_more');
						unid = $liTemp[a].getAttribute('data-unid');
						$ulChild = _self.$menuList.querySelector('li[data-unid="'+unid+'"] > ul');
						if($ulChild){
							$ulChild.classList.add(CLASS_HIDE);
						}
					}

					this.classList.remove('li_more');
					this.classList.add('li_less');

				}else if(this.classList.contains('li_less')){
					this.classList.remove('li_less');
					this.classList.add('li_more');

					unid = this.getAttribute('data-unid');
					$ulChild = _self.$menuList.querySelector('li[data-unid="'+unid+'"] > ul');
					if($ulChild){
						$ulChild.classList.add(CLASS_HIDE);
					}
				}
			}else if(this.tagName == 'LI'){

				this.classList.add('active');
				// Impedir event se propage para elemento pai
				if (typeof event.stopPropagation != "undefined") {
					event.stopPropagation();
				}
				if (typeof event.cancelBubble != "undefined") {
					event.cancelBubble = true;
				}

				if(typeof _self.$btNext.dataset !== "undefined") {
					datasetN = _self.$btNext.dataset.subline;
				} else {
					datasetN = _self.$btNext.getAttribute('data-subline');
				}

				if(typeof _self.$btBack.dataset !== "undefined") {
					datasetB = _self.$btBack.dataset.subline;
				} else {
					datasetB = _self.$btBack.getAttribute('data-subline');
				}

				if(datasetN){
					_self.$btNext.removeAttribute('data-subline');
				}

				if(datasetB){
					_self.$btBack.removeAttribute('data-subline');
				}

				if(typeof _self._subLine !== "undefined"){
					delete(_self._subLine);
				}

				if(typeof _self._subTimeVideo !== "undefined"){
					delete(_self._subTimeVideo);
				}

				if(typeof this.dataset !== "undefined") {
					dataset = this.dataset.unid;
				} else {
					dataset = this.getAttribute('data-unid');
				}

				_self.carregarVideo({'unid' : dataset, 'slide' : 0, 'subVideo': 0});

			}
		}, false);
	}
}

QiSatPlayer.prototype.slidesClick = function (){

	var _self = this, dataset,
		$p = _self.$divSlides.querySelectorAll("p"),
		x = $p.length;

	while(x--) {
		if(!$p[x].classList.contains('disable')){
			$p[x].onclick = function(){
				var dataset, datasetN, datasetB, $temp;
				if(!this.classList.contains('active')){
					$temp = _self.$divSlides.querySelector(".active");
					if ($temp) {
						$temp.classList.remove('active');
					}

					if(typeof _self.$btNext.dataset !== "undefined") {
						datasetN = _self.$btNext.dataset.subline;
					} else {
						datasetN = _self.$btNext.getAttribute('data-subline');
					}

					if(typeof _self.$btBack.dataset !== "undefined") {
						datasetB = _self.$btBack.dataset.subline;
					} else {
						datasetB = _self.$btBack.getAttribute('data-subline');
					}

					if(datasetN){
						_self.$btNext.removeAttribute('data-subline');
					}

					if(datasetB){
						_self.$btBack.removeAttribute('data-subline');
					}

					if(typeof _self._subLine !== "undefined"){
						delete(_self._subLine);
					}

					if(typeof _self._subTimeVideo !== "undefined"){
						delete(_self._subTimeVideo);
					}

					if(typeof this.dataset !== "undefined") {
						dataset = this.dataset.slide;
					} else {
						dataset = this.getAttribute('data-slide');
					}

					if(dataset){
						$temp = _self.$divSlides.querySelector('p[data-slide="'+dataset+'"]');
						if ($temp) {
							$temp.classList.add('active');
						}
						_self.carregarVideo({'slide': parseInt(dataset), 'subVideo' : 0 });
					}
				}
			}
		}
	}
}

QiSatPlayer.prototype.indexList = function () {

	var _self = this, listPlay = _self.listPlay, slength, length = listPlay.length,
		index = 0,  subIndex = 0, item, subItem, achou = false, subList = false;

	if(_self._unid.indexOf('.') > 0){
		subList = true;
	}

	do{
		item = listPlay[index];
		if(!subList && item){
			if(item.num == _self._unid){
				achou = true;
			}
		}else if(subList && item){
			subIndex = 0;
			listPlay = item.subItens;
			slength = listPlay.length;
			do{
				subItem = listPlay[subIndex];
				if(subItem && subItem.num == _self._unid){
					achou = true;
				}
				if(!achou) subIndex++;
			}while(!achou && subIndex < slength);
			listPlay = _self.listPlay;
		}
		if(!achou) index++;
	}while(!achou && index < length);

	if(achou){
		if(_self.listPlay[index]){
			_self._index = index;
			if(subList && _self.listPlay[index].subItens[subIndex]){
				_self._slides = _self.listPlay[index].subItens[subIndex].slides;
				_self._subIndex = subIndex;
			}else{
				_self._slides = _self.listPlay[index].slides;
				delete(_self._subIndex);
			}
		}
	}

	return achou;
}

QiSatPlayer.prototype.setListPlay = function(){
	var _self = this,
		subItemObj, itemObj, itemElem, slidesElem, subItens, slide,
		videosElem, subItem, elem, subLineVideos, videoElem, btnImg, imagensElem,
		s, v, i, a, subI, ilength, slength, vlength, alength;

	_self.listPlay = [];

	if(_self.aulas[0]){
		elem = _self.aulas[0];
		if(elem){
			btnImg = elem.getElementsByTagName("btnImagem");
			subLineVideos = elem.getElementsByTagName("subVideo");
		}
		_self.subLineVideos = [];
		_self.btnImg = [];

		slength = subLineVideos.length;
		for(s = 0; s < slength; s++) {
			elem = subLineVideos[s];
			subItemObj = { 'index' : s, videos : [] };
			videosElem = elem.getElementsByTagName("video");

			if(elem.getAttribute("id"))
				subItemObj.id = elem.getAttribute("id");
			if(elem.getAttribute("action"))
				subItemObj.action = elem.getAttribute("action");

			vlength = videosElem.length;
			for(v = 0; v < vlength; v++) {
				itemObj = { 'video' : videosElem[v].childNodes[0].nodeValue};
				if(videosElem[v].getAttribute("img")){
					itemObj.img = videosElem[v].getAttribute("img");
				}
				subItemObj.videos.push(itemObj);
			}

			_self.subLineVideos.push(subItemObj);
		}

		slength = btnImg.length;
		for(s = 0; s < slength; s++) {
			elem = btnImg[s];
			subItemObj = { 'index' : s, imagens : [] };
			imagensElem = elem.getElementsByTagName("img");

			if(elem.getAttribute("id"))
				subItemObj.id = elem.getAttribute("id");
			if(elem.getAttribute("class"))
				subItemObj.class = elem.getAttribute("class");
			if(elem.getAttribute("pos")){
				subItemObj.pos = elem.getAttribute("pos");
				a = subItemObj.pos.split(';');

				if(a.length)
					subItemObj.pos = { top: a[0], left: a[1], width: a[2], height: a[3] };
			}

			vlength = imagensElem.length;
			for(v = 0; v < vlength; v++) {
				itemObj = { 'texto' : imagensElem[v].childNodes[0].nodeValue };
				if(imagensElem[v].getAttribute("src"))
					itemObj.src = imagensElem[v].getAttribute("src");

				if(imagensElem[v].getAttribute("class"))
					itemObj.class = imagensElem[v].getAttribute("class");

				if(imagensElem[v].getAttribute("pos")){
					itemObj.pos = imagensElem[v].getAttribute("pos");
					a = itemObj.pos.split(';');

					if(a.length)
						itemObj.pos = { top: a[0], left: a[1], width: a[2], height: a[3] };
				}

				subItemObj.imagens.push(itemObj);
			}

			_self.btnImg.push(subItemObj);
		}
	}

	ilength = _self.itens.length;
	for(i = 0; i < ilength; i++) {

		itemElem = _self.itens[i];
		itemObj = {
			'titulo' : itemElem.getElementsByTagName("titulo")[0].childNodes[0].nodeValue,
			'num' : itemElem.getAttribute("num"),
			'slides' : [],
			'index' : i,
			'subItens': []
		};

		slidesElem = itemElem.getElementsByTagName("slides");
		slength = slidesElem.length;
		for(s = 0; s < slength; s++) {
			slide = slidesElem[s];
			if(slide.parentNode.nodeName == 'item'){
				videosElem = slide.getElementsByTagName("video");
				itemObj.slides[s] = [];
				vlength = videosElem.length;
				for(v = 0 ; v < vlength; v++) {
					elem = { 'video' : videosElem[v].childNodes[0].nodeValue};
					if(videosElem[v].getAttribute("img")){
						elem.img = videosElem[v].getAttribute("img");
					}

					if(videosElem[v].getAttribute("subVideo")){
						elem.subLineVideos = [];
						subLineVideos = videosElem[v].getAttribute("subVideo");
						subLineVideos = subLineVideos.split(",");
						alength = subLineVideos.length;
						for (a = 0; a < alength; a++) {
							videoElem = _self.getDataSubLineVideo(subLineVideos[a]);
							if(videoElem){
								elem.subLineVideos.push(videoElem);
							}
						}
					}

					if(videosElem[v].getAttribute("btnImagem")){
						elem.btnImagens = [];
						btnImg = videosElem[v].getAttribute("btnImagem");
						btnImg = btnImg.split(",");
						btnImg.map(function(el){
							if(imagensElem = _self.btnImg.find(function(img){ return el == img.id }))
								elem.btnImagens.push(imagensElem);
						});
					}

					itemObj.slides[s].push(elem);
				}
			}
		}

		subItens = itemElem.getElementsByTagName("subItem");
		slength = subItens.length;
		for(subI = 0; subI < slength; subI++ )  {

			subItem = subItens[subI];
			subItemObj = {
				'titulo' : subItem.getElementsByTagName("titulo")[0].childNodes[0].nodeValue,
				'num' : subItem.getAttribute("num"),
				'index' : subI,
				'slides' : []
			};

			slidesElem = subItem.getElementsByTagName("slides");
			alength = slidesElem.length;
			for(s = 0; s < alength; s++) {
				slide = slidesElem[s];
				videosElem = slide.getElementsByTagName("video");
				subItemObj.slides[s] = [];
				vlength = videosElem.length;
				for(v = 0; v < vlength; v++) {
					elem = { 'video' : videosElem[v].childNodes[0].nodeValue};
					if(videosElem[v].getAttribute("img")){
						elem.img = videosElem[v].getAttribute("img");
					}

					if(videosElem[v].getAttribute("btnImagem")){
						elem.btnImagens = [];
						btnImg = videosElem[v].getAttribute("btnImagem");
						btnImg = btnImg.split(",");
						btnImg.map(function(el){
							if(imagensElem = _self.btnImg.find(function(img){ return el == img.id }))
								elem.btnImagens.push(imagensElem);
						});
					}

					subItemObj.slides[s].push(elem);
				}
			}
			itemObj.subItens[subI] = subItemObj;
		}

		_self.listPlay[i] = itemObj;
	}

	_self.indexList();
}

QiSatPlayer.prototype.nextVideo = function(){
	var _self = this, video = {}, unid, item, subItens, check, index, subIndex, dataSubLine,
		slength, llength = _self.listPlay.length;

	if(typeof _self._subLine === "undefined"){
		if(_self._subVideo+1 < _self._slides[_self._slide].length){
			video.subVideo = _self._subVideo+1;
		}else if (_self._slide+1 < _self._slides.length){
			video.slide = _self._slide+1;
			video.subVideo = 0;
		}else{
			check = false;
			index = _self._index;
			item = _self.listPlay[index];
			subItens = item.subItens;
			subIndex = _self._subIndex ? _self._subIndex : 0;
			slength = subItens.length;

			if( ( slength && (typeof _self._subIndex === "undefined" )) || ( (typeof _self._subIndex !== "undefined" ) && _self._subIndex < (slength-1)) ){
				do{
					if(subItens[subIndex] && subItens[subIndex].num != _self._unid){
						check = true;
						unid = subItens[subIndex].num;
					}else{
						subIndex++;
					}
				}while((!check) && (subIndex < slength));

			}else if(_self._index < llength-1){
				do{
					index++;
					if(_self.listPlay[index]){
						check = true;
						unid = _self.listPlay[index].num;
					}
				}while((!check) && (index < llength));
			}

			if (check) {
				video.unid = unid;
				video.slide = 0;
				video.subVideo = 0;
			};
		}
		_self.carregarVideo(video);
	}else if(_self.subLineVideos[_self._subLine]){
		dataSubLine = _self.subLineVideos[_self._subLine];
		if(dataSubLine){
			if( _self._subTimeVideo+1 < dataSubLine.videos.length ){
				video.subTimeVideo = _self._subTimeVideo+1;
				_self.carregarVideo(video);
			}else{
				delete(_self._subLine);
				delete(_self._subTimeVideo);
				_self.$video.end();
			}
		}
	}

}

QiSatPlayer.prototype.backVideo = function(){
	var _self = this, video = {}, length, dataSubLine;

	if(typeof _self._subLine === "undefined"){
		if(_self._subVideo > 0){
			video.subVideo = _self._subVideo-1;
		}else if(_self._slide > 0){
			video.slide = _self._slide-1;
			video.subVideo = _self._slides[_self._slide-1].length-1;
		}else{
			if(typeof _self._subIndex !== "undefined" ){
				if(_self._subIndex > 0){
					video.unid = _self.listPlay[_self._index].subItens[_self._subIndex-1].num;
					video.slide = _self.listPlay[_self._index].subItens[_self._subIndex-1].slides.length-1;
					video.subVideo = _self.listPlay[_self._index].subItens[_self._subIndex-1].slides[video.slide].length-1;
				}else{
					video.unid = _self.listPlay[_self._index].num;
					video.slide = _self.listPlay[_self._index].slides.length-1;
					video.subVideo = _self.listPlay[_self._index].slides[video.slide].length-1;
				}
			}else if(_self._index > 0){
				length = _self.listPlay[_self._index-1].subItens.length;
				if( length > 0){
					video.unid = _self.listPlay[_self._index-1].subItens[length-1].num;
					video.slide = _self.listPlay[_self._index-1].subItens[length-1].slides.length-1;
					video.subVideo = _self.listPlay[_self._index-1].subItens[length-1].slides[video.slide].length-1;
				}else{
					video.unid = _self.listPlay[_self._index-1].num;
					video.slide = _self.listPlay[_self._index-1].slides.length-1;
					video.subVideo = _self.listPlay[_self._index-1].slides[video.slide].length-1;
				}
			}
		}
		_self.carregarVideo(video);
	}else if(_self.subLineVideos[_self._subLine]){
		dataSubLine = _self.subLineVideos[_self._subLine];
		if(dataSubLine){
			if( _self._subTimeVideo > 0 ){
				video.subTimeVideo = _self._subTimeVideo-1;
				_self.carregarVideo(video);
			}else{
				delete(_self._subLine);
				delete(_self._subTimeVideo);
				_self.$video.end();
			}
		}
	}

}

QiSatPlayer.prototype.getDataSubLineVideo = function(id){
	var _self = this, result = false, achou = false, s = 0, elem, length = _self.subLineVideos.length;
	do{
		if(_self.subLineVideos[s]){
			elem = _self.subLineVideos[s];
			if(elem && elem.id == id){
				result = elem;
				achou = true;
			}
			s++;
		}
	}while(!achou && s < length);
	return result;
}

QiSatPlayer.prototype.getDataVideo = function(){
	var _self = this, slides, subItens, result = false;

	if(typeof _self._subLine === "undefined"){
		if(_self._unid.indexOf('.') < 0){
			if(_self.listPlay[_self._index]){
				slides = _self.listPlay[_self._index].slides;
				if(slides[_self._slide]){
					if(slides[_self._slide][_self._subVideo]){
						result = slides[_self._slide][_self._subVideo];
					}
				}
			}
		}else{
			if(_self.listPlay[_self._index]){
				subItens = _self.listPlay[_self._index].subItens;
				if(subItens[_self._subIndex]){
					slides = subItens[_self._subIndex].slides;
					if(slides[_self._slide][_self._subVideo]){
						result = slides[_self._slide][_self._subVideo];
					}
				}
			}
		}
	}else{
		if(_self.subLineVideos[_self._subLine]){
			if(_self.subLineVideos[_self._subLine].videos[_self._subTimeVideo]){
				result = _self.subLineVideos[_self._subLine].videos[_self._subTimeVideo];
			}
		}
	}

	return result;
};

QiSatPlayer.prototype.carregarVideo = function(paramts){
	var _self = this, aula, unid, slide, subVideo, subLine = false;

	_self.options.canvas.sentido = !_self.options.canvas.sentido;

	if(paramts){

		_self.$video.classList.remove(CLASS_HIDE);

		if('subLine' in paramts || 'subTimeVideo' in paramts){
			subLine = true;
			if('subLine' in paramts)
				_self._subLine = paramts['subLine'];

			if('subTimeVideo' in paramts){
				_self._subTimeVideo = paramts['subTimeVideo'];
			}else if (typeof _self._subTimeVideo === "undefined"){
				_self._subTimeVideo = 0;
			}

		}else{
			if('aula' in paramts){
				aula = paramts['aula'];
			}

			if('unid' in paramts){
				unid = paramts['unid'];
			}

			if('slide' in paramts){
				slide = paramts['slide'];
			}

			if('subVideo' in paramts){
				subVideo = paramts['subVideo'];
			}

			if( (typeof aula != 'undefined') && _self._aula != aula){
				if((typeof unid != 'undefined') && _self._unid != unid){
					_self.setUnid(unid);
				}
				_self.setAula(aula);
				_self.carregarXML();
				_self.setListPlay();
				_self.carregarContainerXML();

			}else if((typeof unid != 'undefined') && _self._unid != unid){

				if((typeof subVideo != 'undefined') && _self._subVideo != subVideo){
					_self._subVideo = subVideo;
				}
				if((typeof slide != 'undefined') && _self._slide != slide){
					_self._slide = slide;
				}
				_self.setUnid(unid);
				_self.indexList();
			}else{
				if((typeof subVideo != 'undefined') && _self._subVideo != subVideo){
					_self._subVideo = subVideo;
				}
				if((typeof slide != 'undefined') && _self._slide != slide){
					_self._slide = slide;
				}
				_self.indexList();
			}
		}
	}

	_self.setVideoElements();
	if(!subLine) _self.printDataVideo();
	_self.$video.start(true);
//	console.log('Aula:'+_self._aula	+' Unid:'+_self._unid + ' slide:'+_self._slide +' video:' +_self._subVideo+ ' subLine:'+_self._subLine+' videoLine:'+_self._subTimeVideo+ ' file:'+_self.options.video.filename);
};


QiSatPlayer.prototype.geraLog = function(unid){
	var _self = this, lv = {}, result = false, 	url = _self._path.local + _self._path.geralog;

	if(_self._unid.indexOf(".")>0){
		//lv.conteudoAnterior = 'un'+_self._unid.replace(".", "_")+".html";
		lv = 'conteudoAnterior=un'+_self._unid.replace(".", "_")+".html&";
	} else {
		//lv.conteudoAnterior = 'un'+_self._unid+"_0.html";
		lv = 'conteudoAnterior=un'+_self._unid+"_0.html&";
	}
	if(unid.indexOf(".")>0){
		//lv.conteudo = 'un'+unid.replace(".", "_")+".html";
		lv += 'conteudo=un'+unid.replace(".", "_")+".html&";
	} else {
		//lv.conteudo = 'un'+unid+"_0.html";
		lv += 'conteudo=un'+unid+"_0.html&";
	}

	var nivel = _self._unid.indexOf(".")>0?_self._unid.substring(_self._unid.indexOf(".")):'0';
	//lv.url = window.location.href+url+'?idN='+_self._aula+'&unidade='+_self._unid+'&nivel='+nivel+'&aula=Aula%20'+_self._aula;
	lv += 'url='+window.location.href+'?idN='+_self._aula+'&unidade='+_self._unid+'&nivel='+nivel+'&aula=Aula%20'+_self._aula;

	xhReq.setContentType("application/x-www-form-urlencoded");
	xhReq.setResponseType('text');
	xhReq.setAsync(false);

	xhReq.post(url,lv).success( function (){
		result = true;
	}).error(  function (){
		result = false;
	});

	return result;

};

QiSatPlayer.prototype.getChave = function(unid){

	var _self = this, result = false,
		url = _self._path.local + _self._path.infouser;

	xhReq.setContentType('text/plain');
	xhReq.setResponseType('text');
	xhReq.setAsync(false);

	xhReq.get(url).success( function (data, xhr){
		var index1 = xhr.responseText.indexOf("chave =")+8;
		var index2 = xhr.responseText.indexOf("tipousuario =")-4;
		_self.options.chave = xhr.responseText.substring(index1,index2);
		result = true;
	}).error(  function (data, xhr){
		result = false;
	});

	return result;

};

QiSatPlayer.prototype.carregarXML = function(){

	var _self = this, result = false,
		filename = _self.getFileXML();

	xhReq.setContentType('text/xml');
	xhReq.setResponseType('xml');
	xhReq.setAsync(false);

	xhReq.get(filename).success( function (data, xhr){
		_self._xmlDoc = data;
		_self._xhr = xhr;
		_self.courses = _self._xmlDoc.getElementsByTagName("curso");
		_self.aulas  = _self._xmlDoc.getElementsByTagName("aula");
		_self.getAulasItensXML();
		result = true;
	}).error(  function (data, xhr){
		_self._xhr = xhr;
		result = false;
	}).always( function (data, xhr){
		_self._xhr = xhr;
	});

	return result;
}

QiSatPlayer.prototype.carregarContainerXML = function(){
	var _self = this;

	if(_self.options.top){
		_self.getDataTopXML();
	}

	if(_self.options.menu){
		_self.printMenuXML();
		_self.menuEvents();
	}
}