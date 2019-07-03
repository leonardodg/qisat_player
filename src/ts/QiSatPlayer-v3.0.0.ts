class QiSatPlayer {
	static ID = "#";
	static CLASS = ".";
	static CLASS_ICO = "ico";
	static CLASS_BT  = "bt_ctrl";

	static ID_VIDEO_CONTAINER = "video-components";
	static ID_VIDEO_TOP  = "video-top";
	static ID_VIDEO_MENU = "video-menu";
	static ID_VIDEO_TAG  = "video-tag";
	static ID_VIDEO_CONTROLS  = "video-controls";

	static ID_ERROR  = "error";
	static ID_VIDEO  = "video";
	static ID_CANVAS = 'canvasMask';
	static CLASS_LOADING = "loading";
	static CLASS_BT_CLOSE = "bt-close";
	static CLASS_BT_CLOSE_X   = "fi-x";

	static ID_PREVIOUS  = "previous";
	static ID_PLAY  = "play";
	static ID_NEXT  = "next";
	static ID_VOLUME = "volume";
	static CLASS_PREVIOUS = "fi-previous";
	static CLASS_NEXT = "fi-next";
	static CLASS_REFRESH = "fi-refresh";
	static CLASS_PLAY  = "fi-play";
	static CLASS_PAUSE = "fi-pause";
	static CLASS_PREVIOUS_DISABLE = "fi-previous-disable";
	static CLASS_NEXT_DISABLE = "fi-next-disable";
	static CLASS_VOLUME = "fi-volume";
	static CLASS_VOLUME_NONE   = "fi-volume-none";
	static CLASS_WIDGET   = "fi-widget"; // MenuContexto
	static CLASS_BT_ACTIVE = "bt-active";

	static CLASS_TOP = "top";
	static CLASS_LOGO  = "logo";
	static CLASS_AULA_TEXT  = "title-aula";
	static CLASS_CURSO_TEXT = "title-curso";

	static CLASS_MENU_IMG = "menu-icon";
	static CLASS_MENU_LIST = "menu-list";
	static CLASS_MENU_ACTION = "menu-action";
	static CLASS_PARENT = "parent";
	static CLASS_ACTION = "li_action";
	static CLASS_VIEW = "li_view";
	static CLASS_SPAN = "li_span";
	static CLASS_LESS = "li_less";
	static CLASS_ICON = "li_icon";
	static CLASS_ICON_ACTIVE = "li_icon-active";
	static CLASS_ICON_DESACTIVE = "li_icon-desactive";
	static CLASS_PAGE = "fi-page";
	static CLASS_PAGE_SMALL = "fi-page-small";
	static CLASS_CLEAR = "clear";

	static CLASS_ACTIVE = "active";
	static CLASS_DISABLE = "disable";
	static CLASS_HIDE = "hide";
	static CLASS_VISIBILY = "show";

	static ID_SEEK_BAR   = "track-bar";
	static ID_VOLUME_BAR = "volume-bar";
	static ID_PLAYBACK_RATE = "playback-rate";
	static CLASS_VOLUME_TRACK = "volume-track";
	static CLASS_VOLUME_THUMB = "volume-thumb";
	static ID_DIV_VIDEO_TIME   = "video-time";
	static ID_DIV_SLIDES   = "slides";
	static ID_LEGENDA_TEXT = "legenda-text";
	static ID_TIME_TEXT = "curtimetext";
	static ID_DURATION_TEXT = "durtimetext";
	static ID_PROGRESS = "progress";
	static CLASS_PROGRESS_BAR = "progress-bar";

	static ID_SUBVIDEO_LIST = 'subVideos-List';
	static CLASS_N_SUBVIDEO = "subVideo";
	static CLASS_TOTAL_SUBVIDEO = "total-subVideo";

	static ID_SUBMENU = 'subMenu';
	static ID_AUTOPLAY = 'autoplay';
	static ID_GROUP_PLAYBACK = 'group-playback';
	static ID_PLAYBACK = 'playback';
	static CLASS_MINUS = "fi-minus";
	static CLASS_PLUS = "fi-plus";
	
	static CLASS_LIGHTBOX = "lightbox";
	static CLASS_BNT_CLASS = "btnClass";
	static CLASS_BUTTON = "buttonSVG";

	static ERROR_NOT_VIDEO_SUPPORT = " >> Navegador não tem suporte ao novo formato de video HTML5, FAVOR ACESSAR ATRAVÉS POR UM BROWSER ATUALIZADO!";
	static ERROR_NOT_VIDEO_EXT = " >> Nenhuma extensão do video HTML5 é suportada!";
	static ERROR_FILE_XML   = " >> FileName do video não configurado!";
	static ERROR_TAG_CONTAINER = " >> Problemas para encontrar a tag ID " + QiSatPlayer.ID_VIDEO_CONTAINER + " de estrutura do Player no HTML";
	static ERROR_NO_XML_DOC = " >> DOCUMENTO XML NÃO FOI CARREGADO!";
	static ERROR_NO_XMLHTTPREQUEST = " >> BROWSER NO SUPORTE XML HTTP REQUEST!";
	
	static PATHS = {	
		"local-player.qisat.com.br" :
			{
				'xml'       : '',
				'local'     : window.location.protocol + '//' + window.location.hostname,
				'imagens'   : '',
				'imgMask'   : '',
				'videos'    : '',
				'infouser'  : '/getinfouser.php',
				'geralog'   : '/geraLog.php',
				'poster'    : '/images/poster.jpg',
				'defaLocal' : '',
				'defaArq'   : '/getUrl.php',
				'data'      : ''
			},
		"mn40.mntec.com.br" :
			{
				'xml'       : '',
				'local'     : window.location.protocol + '//' + window.location.hostname,
				'imagens'   : '',
				'imgMask'   : '',
				'videos'    : '',
				'infouser'  : '/test/getinfouser.php',
				'geralog'   : '/test/geraLog.php',
				'poster'    : '/public/imagens/poster.jpg',
				'defaLocal' : '/public',
				'defaArq'   : '/getUrl.php',
				'data'      : ''
			},
		"moodle.mntec.com.br" :
			{
				'xml'       : '',
				'local'     : window.location.protocol + '//' + window.location.hostname,
				'imagens'   : '',
				'imgMask'   : '',
				'videos'    : '',
				'infouser'  : '/repository/coursefilearea/user/getinfouser.php',
				'geralog'   : '/course/format/topicstime/controle_acesso/geraLog.php',
				'poster'    : '/lib/QiSatPlayer/images/poster.jpg',
				'defaLocal' : '/lib/QiSatPlayer',
				'defaArq'   : '/getUrl.php',
				'data'      : ''
			}
	};
	
	static VIDEOTYPES = {
		'mp4' : 'video/mp4',
		'mp4-codecs' : 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
		'webm': 'video/webm',
		'webm-codecs': 'video/webm; codecs="vp8, vorbis"',
		'ogg' : 'video/ogg',
		'ogg-codecs' : 'video/ogg; codecs="theora, vorbis"'
	};

	private options = {
		aula         : 1,
		unid         : "0",
		slide        : 0,
		subVideo     : 0,
		alternativo  : {
			subVideo : -1,
			video    : -1
		},
		filename     : "menu_items.xml",
		videoElem    : true,
		canvasElem   : true,
		load         : false,
		top          : true,
		menu         : true,
		videoTag     : true,
		controls     : true,
		slides       : true,
		legenda      : false,
		chave        : "000000",
		mascara      : true,
		geraLog      : true,
		autoplay     : true,
		playbackRate : true,
		style 		 : null,
		video : {
			controls : false,
			autoplay : true,
			paused   : true,
			width    : 1010,
			height   : 568,
			id       : QiSatPlayer.ID_VIDEO,
			poster   : '',
			filename : null,
			ext      : ['mp4']
		},
		canvas : {
			id         : QiSatPlayer.ID_CANVAS,
			canvasMask : null,
			context    : null,
			sentido    : true,
			hue        : 0,
			sat        : 0,
			val        : 40,
			val2       : 0.5,
			height     : 568,
			width      : 1010,
			imgHeight  : 568,
			imgWidth   : 935,
			img        : null
		},
		path : {
			xml       : '',
			//local   : 'https://cursos.qisat.com.br',
			local     : window.location.protocol + '//' + window.location.hostname,
			imagens   : '',
			imgMask   : '',
			videos    : '',
			infouser  : '/repository/user/getinfouser.php',
			geralog   : '/course/format/topicstime/controle_acesso/geraLog.php',
			poster    : '/lib/QiSatPlayer3/public/imagens/poster.jpg',
			defaLocal : '/lib/QiSatPlayer3/public',
			defaArq   : '/getUrl.php',
			data      : ''
		}
	};
	private listPlay;
	private buttonSvg;

	constructor(...opDefault) {
		opDefault = opDefault[0];
		for (let option in opDefault) {
			if (typeof opDefault[option] === 'object') {
				for (let subOption in opDefault[option])
					this.options[option][subOption] = opDefault[option][subOption];
			} else {
				this.options[option] = opDefault[option];
			}
		}
		if(QiSatPlayer.PATHS[location.hostname]){
			this.options.path = QiSatPlayer.PATHS[location.hostname];
		}
		this.options.video.poster = this.options['path']['poster'];

		window.oncontextmenu = (e) => {
			e.preventDefault();
		}

		let videoPlayer = document.getElementById(QiSatPlayer.ID_VIDEO_CONTAINER);

		if(this.options.style != null)
			videoPlayer.classList.add(this.options.style);
		
		videoPlayer.appendChild(this.createTop());
		videoPlayer.appendChild(this.createMenu());
		videoPlayer.appendChild(this.createVideoTag());
		videoPlayer.appendChild(this.createControls());
		this.carregarInfoUser();
		this.carregarXML();

		try {
			new MenuContexto(this);
		} catch (error) {
			console.log(error);
		}

		let _self = this;
		let xhReq = this.XhrFactory();
		xhReq.setContentType('text/plain');
		xhReq.setResponseType('text');
		xhReq.get(this.options.path.defaLocal + '/images/button.svg').success(function(data){
			_self.buttonSvg = data;
		});
	}

	/**
	 * Criando componentes do topo do player
	 */
	createTop(){
		let videoTop = document.createElement("div");
		videoTop.id = QiSatPlayer.ID_VIDEO_TOP;
		videoTop.classList.add(QiSatPlayer.CLASS_VISIBILY);
		videoTop.appendChild(this.setTop());
		videoTop.appendChild(this.setLogo());
		videoTop.appendChild(this.setTitleCurso());
		videoTop.appendChild(this.setTitleAula());
		return videoTop;
	}
	setTop(){
		let top = document.createElement("div");
		top.classList.add(QiSatPlayer.CLASS_TOP);
		return top;
	}
	setLogo(){
		let logo = document.createElement("div");
		logo.classList.add(QiSatPlayer.CLASS_LOGO);
		return logo;
	}
	setTitleCurso(){
		let titleCurso = document.createElement("span");
		titleCurso.classList.add(QiSatPlayer.CLASS_CURSO_TEXT);
		return titleCurso;
	}
	setTitleAula(){
		let titleAula = document.createElement("span");
		titleAula.classList.add(QiSatPlayer.CLASS_AULA_TEXT);
		return titleAula;
	}

	/**
	 * Criando menu do player
	 */
	createMenu(){
		let videoMenu = document.createElement("div");
		videoMenu.id = QiSatPlayer.ID_VIDEO_MENU;
		videoMenu.appendChild(this.setAction());
		videoMenu.appendChild(this.setList());
		return videoMenu;
	}
	setAction(){
		let menuAction = document.createElement("div");
		menuAction.classList.add(QiSatPlayer.CLASS_MENU_ACTION);
		
		let menuIcon = document.createElement("img");
		menuIcon.classList.add(QiSatPlayer.CLASS_MENU_IMG);
		menuAction.appendChild(menuIcon);
		
		let menuSpan = document.createElement("span");
		menuSpan.innerHTML = 'MENU';
		menuAction.appendChild(menuSpan);

		menuAction.addEventListener('click', function () {
			let menuList = document.getElementsByClassName(QiSatPlayer.CLASS_MENU_LIST)[0];
			menuList.classList.toggle(QiSatPlayer.CLASS_HIDE);
		});

		return menuAction;
	}
	setList(){
		let menuList = document.createElement("div");
		menuList.classList.add(QiSatPlayer.CLASS_MENU_LIST, QiSatPlayer.CLASS_HIDE);
		
		let menuTitleAula = document.createElement("span");
		menuTitleAula.classList.add(QiSatPlayer.CLASS_AULA_TEXT);
		menuList.appendChild(menuTitleAula);
		
		let parent = document.createElement("ul");
		parent.classList.add(QiSatPlayer.CLASS_PARENT);
		menuList.appendChild(parent);

		return menuList;
	}

	/**
	 * Efeito de fundo ao clicar no botão
	 * @param button 
	 */
	btEstilo(button){
		button.addEventListener('mousedown', function(){
			this.classList.add(QiSatPlayer.CLASS_BT_ACTIVE);
		});
		button.addEventListener('mouseup', function(){
			this.classList.remove(QiSatPlayer.CLASS_BT_ACTIVE);
		});
	}

	/**
	 * Criando componentes de video do player
	 */	
	createVideoTag(){
		let videoTag = document.createElement("div");
		videoTag.id = QiSatPlayer.ID_VIDEO_TAG;
		videoTag.appendChild(this.setBtClose());
		videoTag.appendChild(this.setVideo());
		videoTag.appendChild(this.setCanvas());
		return videoTag;
	}

	touchstart(){
		let canvas = <HTMLCanvasElement>document.getElementById(QiSatPlayer.ID_CANVAS);
		clearInterval(parseInt(canvas.dataset['intervalTouchEnd']));
		let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
		let videoTop = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_TOP);
		let videoControls = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_CONTROLS);
		if((video.classList.contains(QiSatPlayer.CLASS_HIDE) || !video.paused) && 
		(videoTop.classList.contains(QiSatPlayer.CLASS_VISIBILY) || 
		videoControls.classList.contains(QiSatPlayer.CLASS_VISIBILY))){
			videoTop.classList.remove(QiSatPlayer.CLASS_VISIBILY);
			videoControls.classList.remove(QiSatPlayer.CLASS_VISIBILY);
		} else {
			videoTop.classList.add(QiSatPlayer.CLASS_VISIBILY);
			videoControls.classList.add(QiSatPlayer.CLASS_VISIBILY);
		}
	}
	endVideo (_self) {
		_self.touchstart();

		let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
		video.classList.add(QiSatPlayer.CLASS_HIDE);
		video.load();

		let btPlay = <HTMLElement>document.getElementById(QiSatPlayer.ID_PLAY);
		btPlay.classList.remove(QiSatPlayer.CLASS_PLAY);
		btPlay.classList.remove(QiSatPlayer.CLASS_PAUSE);
		btPlay.classList.add(QiSatPlayer.CLASS_REFRESH);

		let btClose = <HTMLDivElement>document.getElementsByClassName(QiSatPlayer.CLASS_BT_CLOSE)[0];
		btClose.classList.add(QiSatPlayer.CLASS_HIDE);

		let videoTag = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_TAG);

		// LightBox
		let btnImagemId, [unidade,nivel] = _self.options.unid.split('.');
		if(nivel){
			btnImagemId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['btnImagem'];
		}else{
			btnImagemId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['btnImagem'];
		}
		if(btnImagemId != undefined){
			let btnImagens = btnImagemId.split(',');
			btnImagens.forEach(element => {
				_self.listPlay['aula'][_self.options.aula]['btnImagem'].forEach(element2 => {
					if(element == element2.id) {
						let posIndex = element2['img'][0]['pos'].split(';'); 
						let posVal = element2['pos'].split(';');
						let lightbox = <HTMLDivElement>document.createElement("div");
						lightbox.id = element;
						lightbox.classList.add(QiSatPlayer.CLASS_LIGHTBOX, QiSatPlayer.CLASS_BNT_CLASS);
						lightbox.style[posIndex[0]] = posVal[0];
						lightbox.style[posIndex[1]] = posVal[1];
						lightbox.style[posIndex[2]] = posVal[2];
						lightbox.style[posIndex[3]] = posVal[3];
		
						let count = 0;
						element2['img'].forEach(element3 => {
							let aLightbox = document.createElement("a");
							aLightbox.href = element3['src'];
							aLightbox.dataset['lightbox'] = element + '-' + count++;
			
							let imgLightbox = document.createElement("img");
							imgLightbox.src = '#';
							for (let index = 0; index < posIndex.length; index++) {
								if(posIndex[index] == 'width' || posIndex[index] == 'height')
									imgLightbox.style[posIndex[index]] = posVal[index];
							}
							imgLightbox.style['opacity'] = '0';
							aLightbox.appendChild(imgLightbox);
							lightbox.appendChild(aLightbox);
						});

						videoTag.insertBefore(lightbox, btClose.nextSibling);
						btClose = lightbox;
					}
				});
			});
		}

		// Bt's
		let subVideoId;
		if(nivel){
			subVideoId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['subVideo'];
		}else{
			subVideoId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['subVideo'];
		}
		if(subVideoId != undefined && _self.options.alternativo.subVideo == -1){
			let subVideos = subVideoId.split(',');
			let count = 0;
			subVideos.forEach(element => {
				_self.listPlay['aula'][_self.options.aula]['subVideo'].forEach(//element2 => {
				function(element2, index){
					if(element == element2.id) {
						//console.log(_self.listPlay);

						let btFailed = <HTMLDivElement>document.createElement("div");
						btFailed.classList.add(element2['action'], QiSatPlayer.CLASS_BUTTON);
						btFailed.style['bottom'] = (10 + 40 * count++) + 'px';
						videoTag.insertBefore(btFailed, btClose.nextSibling);
						btClose = btFailed;
						
						btFailed.innerHTML = _self.buttonSvg;
						btFailed.addEventListener('click', function(){
							_self.options.alternativo.subVideo = index;
							_self.options.alternativo.video = 0;
							_self.setSource();
						});
						const style = getComputedStyle(btFailed);
						
						if(style.fill != "rgb(0, 0, 0)")
							(<SVGPathElement>btFailed.getElementsByClassName('ButtonBase')[0]).style['fill'] = style.fill.replace(/"/g, "");

						let tspan = btFailed.getElementsByTagName('tspan');
						for (let index = 0; index < tspan.length; index++) {
							tspan[index].textContent = style.content.replace(/"/g, "");
						}
					}
				});
			});
		}
	}

	setBtClose(){
		let btClose = document.createElement("div");
		btClose.classList.add(QiSatPlayer.CLASS_BT_CLOSE);
		btClose.innerHTML = ' Fechar ';
		
		let fiX = document.createElement("div");
		fiX.classList.add(QiSatPlayer.CLASS_BT_CLOSE_X);
		btClose.appendChild(fiX);
		
		btClose.addEventListener('click', function(){
			var evObj = document.createEvent('HTMLEvents');
			evObj.initEvent('ended', false, false);
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			video.dispatchEvent(evObj);
		});
		this.btEstilo(btClose);

		return btClose;
	}
	setVideo(){
		let video = document.createElement("video");
		video.id = QiSatPlayer.ID_VIDEO;
		video.width = 1010;
		video.height = 568;
		video.poster = this.options.path.poster;

		video.addEventListener('playing', function () {
			this.muted = Boolean(document.getElementsByClassName(QiSatPlayer.CLASS_VOLUME_NONE).length);

			var curmins = Math.floor(this.duration / 60),
				cursecs = Math.floor(this.duration - curmins * 60),
				durtimetext = <HTMLSpanElement>document.getElementById(QiSatPlayer.ID_DURATION_TEXT);
			durtimetext.innerHTML = ("00" + curmins).slice(-2)+":"+("00" + cursecs).slice(-2);
		});
		video.addEventListener("timeupdate", function(){
			var curmins = Math.floor(this.currentTime / 60),
				cursecs = Math.floor(this.currentTime - curmins * 60),
				value = ( this.currentTime  / this.duration );

			let curtimetext = <HTMLSpanElement>document.getElementById(QiSatPlayer.ID_TIME_TEXT);
			curtimetext.innerHTML = ("00" + curmins).slice(-2)+":"+("00" + cursecs).slice(-2);

			let progresso = <HTMLProgressElement>document.getElementById(QiSatPlayer.ID_PROGRESS);
			progresso.value = (value) ? value : 0;
		});
		let _self = this;
		video.addEventListener('ended', this.endVideo.bind(this, _self));

		return video;
	}
	
	setCanvas(){
		let canvas = document.createElement("canvas");
		canvas.id = QiSatPlayer.ID_CANVAS;
		canvas.width = 1010;
		canvas.height = 568;
		canvas.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			if(!video.classList.contains(QiSatPlayer.CLASS_HIDE)){
				let btPlay = <HTMLElement>document.getElementById(QiSatPlayer.ID_PLAY);
				btPlay.click();
			}
		});
		canvas.addEventListener('touchstart', this.touchstart);
		canvas.addEventListener('touchend', function () {
			clearInterval(parseInt(this.dataset['intervalTouchEnd']));
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			this.dataset['intervalTouchEnd'] = setTimeout(function(){ 
				if(!video.paused){
					let videoTop = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_TOP);
					let videoControls = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_CONTROLS);
					videoTop.classList.remove(QiSatPlayer.CLASS_VISIBILY);
					videoControls.classList.remove(QiSatPlayer.CLASS_VISIBILY);
				}
			}, 1500).toString();
		});
		
		return canvas;
	}

	/**
	 * Criando componentes de controle do player
	 */	
	createControls(){
		let videoControls = document.createElement("div");
		videoControls.id = QiSatPlayer.ID_VIDEO_CONTROLS;
		videoControls.classList.add(QiSatPlayer.CLASS_VISIBILY);
		videoControls.appendChild(this.setBarraProgresso());
		videoControls.appendChild(this.setBtPrevious());
		videoControls.appendChild(this.setPlay());
		videoControls.appendChild(this.setNext());
		videoControls.appendChild(this.setVolume());
		videoControls.appendChild(this.setVolumeBar());
		videoControls.appendChild(this.setSlides());
		videoControls.appendChild(this.setSubVideos());
		videoControls.appendChild(this.setTime());
		return videoControls;
	}
	setBarraProgresso(){
		let progress = <HTMLProgressElement>document.createElement("progress");
		progress.id = QiSatPlayer.ID_PROGRESS;
		progress.max = 1;
		progress.value = 0;
		progress.addEventListener('click', function (e) {
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			let value = e.offsetX / this.offsetWidth;
			let time = video.duration * value;
			video.currentTime = Math.floor(time);
			this.value = value;
		});
		return progress;
	}
	setBtPrevious(){
		let _self = this;
		let btPrevious = document.createElement("div");
		btPrevious.id = QiSatPlayer.ID_PREVIOUS;
		btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS);
		btPrevious.addEventListener('click', function () {
			if(this.classList.contains(QiSatPlayer.CLASS_PREVIOUS))
				_self.setSource(false);
		});
		this.btEstilo(btPrevious);
		return btPrevious;
	}
	setPlay(){
		let _self = this;
		let btPlay = document.createElement("div");
		btPlay.id = QiSatPlayer.ID_PLAY;
		btPlay.classList.add(QiSatPlayer.CLASS_PLAY);
		btPlay.click = function () {
			let menuList = <HTMLDivElement>document.getElementsByClassName(QiSatPlayer.CLASS_MENU_LIST)[0];
			menuList.classList.add(QiSatPlayer.CLASS_HIDE);
			let btClose = <HTMLDivElement>document.getElementsByClassName(QiSatPlayer.CLASS_BT_CLOSE)[0];
			btClose.classList.remove(QiSatPlayer.CLASS_HIDE);
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			video.classList.remove(QiSatPlayer.CLASS_HIDE);
			if(this.classList.contains(QiSatPlayer.CLASS_PAUSE)){
				this.classList.remove(QiSatPlayer.CLASS_PAUSE);
				this.classList.add(QiSatPlayer.CLASS_PLAY);
				video.pause();
			}else{
				if(this.classList.contains(QiSatPlayer.CLASS_REFRESH)){
					video.currentTime = 0;
					_self.lightBoxClear();
				}
				let promise = video.play();
				/*if (promise !== undefined) {
					promise.then(function() {
					//promise.then(_ => {
						video.muted = Boolean(document.getElementsByClassName(QiSatPlayer.CLASS_VOLUME_NONE).length);
						_self.touchstart();
					});
				}*/
				_self.touchstart();
				if(!video.paused){
					this.classList.remove(QiSatPlayer.CLASS_REFRESH);
					this.classList.remove(QiSatPlayer.CLASS_PLAY);
					this.classList.add(QiSatPlayer.CLASS_PAUSE);
				}
				let subMenu = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_SUBMENU);
				subMenu.classList.add(QiSatPlayer.CLASS_HIDE);
				let widget = <HTMLDivElement>document.getElementsByClassName(QiSatPlayer.CLASS_WIDGET)[0];
				if(widget)
					clearInterval(parseInt(widget.dataset['interval']));
				if(MenuContexto){
					let graph = <HTMLDivElement>document.getElementsByClassName(MenuContexto.ID_GRAPH)[0];
					if(graph)
						clearInterval(parseInt(graph.dataset['interval']));
				}
			}
		};
		btPlay.addEventListener('click', btPlay.click);
		this.btEstilo(btPlay);
		return btPlay;
	}
	setNext(){
		let _self = this;
		let btNext = document.createElement("div");
		btNext.id = QiSatPlayer.ID_NEXT;
		btNext.classList.add(QiSatPlayer.CLASS_NEXT);
		btNext.addEventListener('click', function () {
			if(this.classList.contains(QiSatPlayer.CLASS_NEXT))
				_self.setSource(true);
		});
		this.btEstilo(btNext);
		return btNext;
	}
	setVolume(){
		let btVolume = document.createElement("div");
		btVolume.id = QiSatPlayer.ID_VOLUME;
		btVolume.classList.add(QiSatPlayer.CLASS_VOLUME);
		btVolume.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			if(video.muted = this.classList.contains(QiSatPlayer.CLASS_VOLUME)){
				this.classList.remove(QiSatPlayer.CLASS_VOLUME);
				this.classList.add(QiSatPlayer.CLASS_VOLUME_NONE);
			}else{
				this.classList.remove(QiSatPlayer.CLASS_VOLUME_NONE);
				this.classList.add(QiSatPlayer.CLASS_VOLUME);
			}
		});
		this.btEstilo(btVolume);
		return btVolume;
	}
	setVolumeBar(){
		let btVolumeBar = document.createElement("input");
		btVolumeBar.id = QiSatPlayer.ID_VOLUME_BAR;
		btVolumeBar.type = 'range';
		btVolumeBar.min = '0';
		btVolumeBar.max = btVolumeBar.value = '1';
		btVolumeBar.step = '0.1';
		btVolumeBar.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			video.volume = Number(this.value);
			let volume = <HTMLInputElement>document.getElementById(QiSatPlayer.ID_VOLUME);
			if(video.volume){
				volume.classList.remove(QiSatPlayer.CLASS_VOLUME_NONE);
				volume.classList.add(QiSatPlayer.CLASS_VOLUME);
			} else {
				volume.classList.remove(QiSatPlayer.CLASS_VOLUME);
				volume.classList.add(QiSatPlayer.CLASS_VOLUME_NONE);
			}
		});
		return btVolumeBar;
	}
	setSlides(){
		let _self = this;
		let slides = document.createElement("div");
		slides.id = QiSatPlayer.ID_DIV_SLIDES;
		slides.innerHTML = 'PARTE: ';
		slides.dataset['unid'] = '0';
		
		for (var i = 1; i <= 10; i++) {
			let p = <HTMLElement>document.createElement("p");
			p.innerHTML = i.toString();
			p.dataset['slide'] = (i-1).toString();
			if(i==1){
				p.classList.add(QiSatPlayer.CLASS_ACTIVE);
			}else{
				p.classList.add(QiSatPlayer.CLASS_DISABLE);
			}
			p.addEventListener('click', function () {
				if(!this.classList.contains(QiSatPlayer.CLASS_DISABLE)){
					_self.options.slide = parseInt(this.dataset['slide']);
					_self.setSource();
				}
			});
			slides.appendChild(p);
		}

		return slides;
	}
	setSubVideos(){
		let subVideosList = document.createElement("div");
		subVideosList.id = 'subVideos-List';
		
		let p = document.createElement("p");
		p.innerHTML = 'VIDEO: ';
		subVideosList.appendChild(p);
		
		let subVideo = document.createElement("p");
		subVideo.classList.add(QiSatPlayer.CLASS_N_SUBVIDEO);
		subVideo.innerHTML = '1';
		subVideosList.appendChild(subVideo);
		
		let subVideoBarra = document.createElement("span");
		subVideoBarra.innerHTML = '/';
		subVideosList.appendChild(subVideoBarra);
		
		let totalSubVideo = document.createElement("p");
		totalSubVideo.classList.add(QiSatPlayer.CLASS_TOTAL_SUBVIDEO);
		totalSubVideo.innerHTML = '1';
		subVideosList.appendChild(totalSubVideo);

		return subVideosList;
	}
	setTime(){
		let videoTime = document.createElement("div");
		videoTime.id = QiSatPlayer.ID_DIV_VIDEO_TIME;
		
		let curtimetext = document.createElement("span");
		curtimetext.id = QiSatPlayer.ID_TIME_TEXT;
		curtimetext.innerHTML = '00:00';
		videoTime.appendChild(curtimetext);
		
		let p = document.createElement("p");
		p.innerHTML = ' / ';
		videoTime.appendChild(p);
		
		let durtimetext = document.createElement("span");
		durtimetext.id = QiSatPlayer.ID_DURATION_TEXT;
		durtimetext.innerHTML = '00:00';
		videoTime.appendChild(durtimetext);

		return videoTime;
	}

	/**
	 * Requisições de dados externas
	 */
	XhrFactory(){
		'use strict';
		var config = {
			contentType: 'text/xml',
			responseType : 'xml'
		};
		var parse = function (req) {
			var response;
			try {
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
		var xhr = function (type, url, data=null) {
			var atomXHR, methods = {
				success: function () {},
				error: function () {},
				always: function () {}
			};
			var XHR = XMLHttpRequest || ActiveXObject;
			var request = new XHR('MSXML2.XMLHTTP.3.0');
			request.open(type, url);
			request.setRequestHeader('Content-type', config.contentType);
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
				success: function (callprevious) {
					methods.success = callprevious;
					return atomXHR;
				},
				error: function (callprevious) {
					methods.error = callprevious;
					return atomXHR;
				},
				always: function (callprevious) {
					methods.always = callprevious;
					return atomXHR;
				}
			};
			return atomXHR;
		};
	
		var exports = {
			get(src) {
				return xhr('GET', src);
			},
			put(url, data) {
				return xhr('PUT', url, data);
			},
			post(url, data) {
				return xhr('POST', url, data);
			},
			delete(url) {
				return xhr('DELETE', url);
			},
			setContentType(value) {
				config.contentType = value;
			},
			setResponseType(value) {
				config.responseType = value;
			}
		};
		return exports;
	}

	carregarGeraLog(unid:string){
		let idN = window.location.href.indexOf("?")!==-1 ? "&" : "?";
		let nivel = this.options.unid.indexOf(".")>0 ? this.options.unid.substring(this.options.unid.indexOf(".")) : '0';
		let payload:String = "conteudoAnterior=un" +
			(this.options.unid.indexOf(".")>0 ? this.options.unid.replace(".","_") : this.options.unid+"_0") +
			".html&conteudo=un" + (unid.indexOf(".")>0 ? unid.replace(".","_") : unid+"_0") +
			".html&url=" + window.location.href + idN +
			'idN=' + this.options.aula +
			'&unidade=' + this.options.unid +
			'&nivel=' + nivel +
			'&aula=Aula%20' + this.options.aula;

		let xhReq = this.XhrFactory();
		xhReq.setContentType('application/x-www-form-urlencoded');
		xhReq.setResponseType('text');
		xhReq.post(this.options.path.local+this.options.path.geralog, payload);
	}

	carregarInfoUser(){
		let _self = this;
		let xhReq = this.XhrFactory();
		xhReq.setContentType('text/plain');
		xhReq.setResponseType('text');
		xhReq.get(this.options.path.local+this.options.path.infouser).success(function(data){
			_self.options.chave = data.split('<br>')[2].substr(8);
		});
	}

	carregarXML(){
		let _self = this;
		let xhReq = this.XhrFactory();
		xhReq.setContentType('text/xml');
		xhReq.setResponseType('xml');
		xhReq.get(this.options.path.xml+this.options.filename).success(function(data){
			_self.listPlay = _self.listarXml(data.getElementsByTagName('curso'));
			//console.log(_self.listPlay);

			var titleCurso = document.getElementsByClassName(QiSatPlayer.CLASS_CURSO_TEXT)[0];
            titleCurso.innerHTML = _self.listPlay['titulo'];
            var titleAula = document.getElementsByClassName(QiSatPlayer.CLASS_AULA_TEXT)[0];
			titleAula.innerHTML = _self.listPlay['aula'][_self.options.aula]['titulo'];
			
			_self.createMenuList();
			_self.setSource();
		});
	}

	/**
	 * Converte o XML em array
	 * @param elem 
	 * @param tag 
	 */
	listarXml(elem, tag = 'curso'){
		let retorno = [];
		let tagRelacionamento = {
			'curso'     : ['aula'], 
			'aula'      : ['item', 'btnImagem', 'subVideo'],
			'item'      : ['titulo', 'slides', 'subItem'],
			'subItem'   : ['titulo', 'slides'],
			'subVideo'  : ['video'],
			'slides'    : ['video'],
			'btnImagem' : ['img']
		};
		let nextTags = tagRelacionamento[tag];

		for (let i = 0; i < elem.length; i++) { 
			if(elem[i].nodeName == tag){
				let index = i;
				if(tag == 'aula' || tag == 'item' || tag == 'subItem'){
					for (let j = 0; j < elem[i].attributes.length; j++) { 
						let node = elem[i].attributes[j];
						if(node.name == 'num'){
							index = node.value.split('.').pop();
						}
					}
				}
	
				retorno[index] = [];
				for (let j = 0; j < elem[i].attributes.length; j++) { 
					let node = elem[i].attributes[j];
					retorno[index][node.name] = node.value;
				}
				if(nextTags == undefined){
					if(tag == 'titulo')
						return elem[i].textContent;

					retorno[index][tag] = elem[i].textContent;
				} else {
					for (let j = 0; j < nextTags.length; j++){
						let nextTag = nextTags[j];
						retorno[index][nextTag] = this.listarXml(elem[i].childNodes, nextTag);
					}
				}
			}
		}

		if(tag == 'curso')
			return retorno.pop();

		if(tag == 'aula' || tag == 'item' || tag == 'subItem')
			return retorno;
	
		return retorno.filter(function (el) {
			return el != null;
		});
	}

	/**
	 * Cria o menu lateral com todas as unidades e niveis
	 */
	createMenuList(){
		let _self = this;
		let parent = document.getElementsByClassName(QiSatPlayer.CLASS_PARENT)[0];
		function setVideo(){
			_self.carregarGeraLog(this.parentNode.dataset['unid']);
			_self.options.unid = this.parentNode.dataset['unid'];
			_self.setSource();
		};
		for (let i = 0; i < this.listPlay['aula'][this.options.aula]['item'].length; i++) { 
			let unidade = this.listPlay['aula'][this.options.aula]['item'][i];

			let liView = document.createElement("div");
			liView.classList.add(QiSatPlayer.CLASS_ACTION);
			liView.classList.add(QiSatPlayer.CLASS_VIEW);
			liView.classList.add(unidade['subItem'].length ? QiSatPlayer.CLASS_LESS : QiSatPlayer.CLASS_SPAN);
			liView.dataset['unid'] = i+'';
			if(unidade['subItem'].length){
				let plus = document.createElement("i");
				plus.classList.add(QiSatPlayer.CLASS_PLUS);
				plus.addEventListener('click', function () {
					let elem, i:any;
					for (i in this.parentNode.parentNode.childNodes) {
						elem = <HTMLElement>this.parentNode.parentNode.childNodes[i];
						if(elem == this.parentNode){
							elem = <HTMLElement>this.parentNode.parentNode.childNodes[++i];
							elem = <HTMLElement>elem.childNodes[3];
							break;
						}
					}
					if(this.classList.contains(QiSatPlayer.CLASS_PLUS)){
						this.classList.remove(QiSatPlayer.CLASS_PLUS);
						this.classList.add(QiSatPlayer.CLASS_MINUS);
						elem.classList.remove(QiSatPlayer.CLASS_HIDE);
					}else{
						this.classList.remove(QiSatPlayer.CLASS_MINUS);
						this.classList.add(QiSatPlayer.CLASS_PLUS);
						elem.classList.add(QiSatPlayer.CLASS_HIDE);
					}
				});
				liView.appendChild(plus);
			}
			parent.appendChild(liView);

			let liAction = document.createElement("li");
			liAction.classList.add(QiSatPlayer.CLASS_ACTION);
			liAction.dataset['unid'] = i+'';
			liAction.addEventListener('mouseover', function () {
				let child = <HTMLSpanElement>this.childNodes[1];
				child.classList.add(QiSatPlayer.CLASS_ACTIVE);
			});
			liAction.addEventListener('mouseout', function () {
				let child = <HTMLSpanElement>this.childNodes[1];
				child.classList.remove(QiSatPlayer.CLASS_ACTIVE);
			});

			let liIcon = document.createElement("div");
			liIcon.classList.add(QiSatPlayer.CLASS_ICON);
			liIcon.addEventListener('click', setVideo);
			liAction.appendChild(liIcon);

			let plus = document.createElement("i");
			plus.classList.add(QiSatPlayer.CLASS_PAGE);
			liIcon.appendChild(plus);

			let titulo = document.createElement("span");
			titulo.textContent = unidade['titulo'];
			titulo.addEventListener('click', setVideo);
			liAction.appendChild(titulo);

			let clear = document.createElement("div");
			clear.classList.add(QiSatPlayer.CLASS_CLEAR);
			liAction.appendChild(clear);
			
			if(unidade['subItem'].length){
				let ulHide = document.createElement("ul");
				ulHide.classList.add(QiSatPlayer.CLASS_HIDE);
				for (let j = 0; j < unidade['subItem'].length; j++) { 
					let nivel = unidade['subItem'][j];
					if(nivel != undefined){
						let liAction2 = document.createElement("li");
						liAction2.classList.add(QiSatPlayer.CLASS_ACTION);
						liAction2.dataset['unid'] = i+'.'+j;
						liAction2.addEventListener('mouseover', function () {
							let child = <HTMLSpanElement>this.childNodes[1];
							child.classList.add(QiSatPlayer.CLASS_ACTIVE);
						});
						liAction2.addEventListener('mouseout', function () {
							let child = <HTMLSpanElement>this.childNodes[1];
							child.classList.remove(QiSatPlayer.CLASS_ACTIVE);
						});

						let liIcon2 = document.createElement("div");
						liIcon2.classList.add(QiSatPlayer.CLASS_ICON_DESACTIVE);
						liIcon2.addEventListener('click', setVideo);

						let pageSmall = document.createElement("i");
						pageSmall.classList.add(QiSatPlayer.CLASS_PAGE_SMALL);
						liIcon2.appendChild(pageSmall);
						liAction2.appendChild(liIcon2);

						let titulo = document.createElement("span");
						titulo.textContent = nivel['titulo'];
						titulo.addEventListener('click', setVideo);
						liAction2.appendChild(titulo);

						ulHide.appendChild(liAction2);
						ulHide.appendChild(clear.cloneNode(true));
					}
				}
				liAction.appendChild(ulHide);
			}
			parent.appendChild(liAction);

			parent.appendChild(clear.cloneNode(true));
		}
	}

	/**
	 * Manipulação do video
	 */
	lightBoxClear(){
		let lightbox = document.getElementsByClassName(QiSatPlayer.CLASS_LIGHTBOX + ' ' + QiSatPlayer.CLASS_BNT_CLASS);
		let button = document.getElementsByClassName(QiSatPlayer.CLASS_BUTTON);
		lightbox = Array.prototype.slice.apply(lightbox).concat(Array.prototype.slice.apply(button));
		for (let index = lightbox.length-1; index > -1; index--) {
			lightbox[index].remove();
		}
	}

	setSource(pos=null){
		let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
		video.classList.remove(QiSatPlayer.CLASS_HIDE);
		video.innerHTML = '';
		video.load();		

		this.lightBoxClear();

		let src = this.getNextVideo(pos, true);
		
		let btPrevious = <HTMLElement>document.getElementById(QiSatPlayer.ID_PREVIOUS);
		if(this.getNextVideo(false) == undefined){
			btPrevious.classList.remove(QiSatPlayer.CLASS_PREVIOUS);
			btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS_DISABLE);
		}else{
			btPrevious.classList.remove(QiSatPlayer.CLASS_PREVIOUS_DISABLE);
			btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS);
		}

		let btNext = <HTMLElement>document.getElementById(QiSatPlayer.ID_NEXT);
		if(this.getNextVideo(true) == undefined){
			btNext.classList.remove(QiSatPlayer.CLASS_NEXT);
			btNext.classList.add(QiSatPlayer.CLASS_NEXT_DISABLE);
		}else{
			btNext.classList.remove(QiSatPlayer.CLASS_NEXT_DISABLE);
			btNext.classList.add(QiSatPlayer.CLASS_NEXT);
		}

		let unidade,nivel,parte,subVideo,totalSubVideo;
		[unidade,nivel] = this.options.unid.split('.');
		if(nivel==undefined){
			parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['slides'];
		}else{
			parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['subItem'][nivel]['slides'];
		}
		let slides = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_DIV_SLIDES);
		for (let i in slides.childNodes) {
			let elem = <HTMLElement>slides.childNodes[i];
			if(elem.nodeName == 'P'){
				elem.classList.remove(QiSatPlayer.CLASS_ACTIVE);
				if(parseInt(elem.dataset['slide']) == this.options.slide){
					elem.classList.add(QiSatPlayer.CLASS_ACTIVE);
				} 
				if(parseInt(elem.dataset['slide']) > parte.length-1){
					elem.classList.add(QiSatPlayer.CLASS_DISABLE);
				} else {
					elem.classList.remove(QiSatPlayer.CLASS_DISABLE);
				}
			}
		}
		
		if(subVideo = <HTMLElement>document.getElementsByClassName(QiSatPlayer.CLASS_N_SUBVIDEO)[0]){
			subVideo.innerHTML = this.options.subVideo + 1;
		}
		if(totalSubVideo = <HTMLElement>document.getElementsByClassName(QiSatPlayer.CLASS_TOTAL_SUBVIDEO)[0]){
			totalSubVideo.innerHTML = parte[this.options.slide]['video'].length;
		}

		let type = [], srcs = [];
		for (let i = 0; i < this.options.video.ext.length; i++) {
			let ext = this.options.video.ext[i];
			type.push(QiSatPlayer.VIDEOTYPES[ext+"-codecs"]);
			srcs.push(src+'.'+ext);
		}
		let data  = 'url='+ window.location.href +'&src='+srcs.join('|')+'&type='+ type.join('|')+'&defaLocal='+this.options.path.defaLocal;
		let _self = this;
		let xhReq = this.XhrFactory();
		xhReq.setContentType('application/x-www-form-urlencoded');
		xhReq.setResponseType('text');
		xhReq.post(this.options.path.defaLocal+this.options.path.defaArq, data).success(function(data){
			let result = data.split('|');

			let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
			let IE = /Trident/.test(navigator.userAgent) && window['MSStream'];
			if(iOS || IE){
				//video.setAttribute('poster', _self.options.video.poster);
				video.removeAttribute('poster');
	
				let loading = <HTMLDivElement>document.getElementById(QiSatPlayer.CLASS_LOADING);
				let canvas = <HTMLCanvasElement>document.getElementById(QiSatPlayer.ID_CANVAS);
				let xhReq = new XMLHttpRequest();
				xhReq.onloadstart = function(ev) {
					xhReq.responseType = "blob";
					if(!loading){
						loading = <HTMLDivElement>document.createElement('div');
						loading.classList.add(QiSatPlayer.CLASS_LOADING);
						let videoTag = <HTMLDivElement>document.getElementById(QiSatPlayer.ID_VIDEO_TAG);
						videoTag.insertBefore(loading, canvas.nextSibling);
					}
				}

				let ctx = canvas.getContext('2d');
				var drawCircle = function(percent) {
					ctx.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
					ctx.beginPath();
					ctx.arc(486, 282, 32, Math.PI * 1.5, (Math.PI * 1.5) + (Math.PI * 2 * percent), false);
					ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
					ctx.lineCap = 'round'; 
					ctx.lineWidth = 6;
					ctx.stroke();
				};
				xhReq.addEventListener("progress", function(event){
					if (event.lengthComputable) {
						drawCircle(event.loaded / event.total);
					}
				}, false);

				xhReq.onload = function() {
					let reader = new FileReader();
					reader.onloadend = function() {
						let result = reader.result.toString();
						let byteCharacters = atob(result.slice(result.indexOf(',') + 1));
						let byteNumbers = new Array(byteCharacters.length);
						for (let i = 0; i < byteCharacters.length; i++) {
							byteNumbers[i] = byteCharacters.charCodeAt(i);
						}
						let byteArray = new Uint8Array(byteNumbers);
						let t = type.pop();
						if(t.indexOf(';') > 0)
							t = t.substr(0, t.indexOf(';'));
						let blob = new Blob([byteArray], {type: t});
						let sourceElem = document.createElement("source");
						sourceElem.src = URL.createObjectURL(blob);
						sourceElem.type = t;
						video.appendChild(sourceElem);
						//video.removeAttribute('poster');
						ctx.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
						loading.parentNode.removeChild(loading);
						_self.loadVideo(video);
					};
					reader.readAsDataURL(xhReq.response);
				};
				xhReq.open('GET', result[result.length-1]);
				if(result[result.length-1].indexOf('defavid') !== -1)
					xhReq.setRequestHeader("Range", "bytes=0-");
				xhReq.send();
			}else{
				length = result.length;

				/*let buffered: [any], total = 921436 * 8;
				video.onloadstart = function() {
					buffered.push([0, (new Date()).getTime(), 0]);
				};*/
				video.onprogress = function() {
					if (video.buffered.length > 0 && video.buffered.end && video.duration) {
						var percent = video.buffered.end(0) / video.duration;
						percent = 100 * Math.min(1, Math.max(0, percent));
						//console.log('loading percent: '+percent);

						/*var media = 0;
						var parcial = video.buffered.end(video.buffered.length-1) * total / video.duration;
						buffered.push([parcial, (new Date()).getTime(), 0]);
						var buff_dif = buffered[buffered.length-1][0] - buffered[buffered.length-2][0];
						var tempo_dif = buffered[buffered.length-1][1] - buffered[buffered.length-2][1];
						buffered[buffered.length-1][2] = buff_dif / tempo_dif;
						buffered.forEach(elem => {
							media += elem[2];
						});
						var Kbps = media/(buffered.length-1);
						console.log('Velocidade da conexão: '+Kbps+' Kbps');*/
					}
				};

				while(length--){
					let ext     = _self.options.video.ext[length];
					let source  = document.createElement("source");
					source.src  = result[length];
					source.type = QiSatPlayer.VIDEOTYPES[ext+"-codecs"];
					video.appendChild(source);
				}
				_self.loadVideo(video);
			}
		});
	}

	loadVideo(video:HTMLVideoElement){
		video.load();
		let btPlay = <HTMLElement>document.getElementById(QiSatPlayer.ID_PLAY);
		if(btPlay.classList.contains(QiSatPlayer.CLASS_PAUSE)){
			video.play();
		}else{
			btPlay.click();
		}
		var playback = document.getElementById('playback');
		if(playback){
			video.playbackRate = parseFloat(playback.textContent);
		}
	}

	getNextVideo(pos=null, alterVideo=false){
		let src;

		if(this.options.alternativo.subVideo > -1 || this.options.alternativo.video > -1){
			let posAlter = pos == undefined ? 0 : (pos ? 1 : -1);
			src = this.listPlay['aula'][this.options.aula]['subVideo'][this.options.alternativo.subVideo]['video'][this.options.alternativo.video+posAlter];
			if(src){
				src = src['video'];
				if(alterVideo){
					this.atualizarCanvas();
					this.options.alternativo.video += posAlter;
					this.options.canvas.sentido = !this.options.canvas.sentido;
					this.updateMenuList();
				}
				return src;
			}
			if(this.options.alternativo.video == 0 && posAlter == -1){
				pos = null;
				if(!alterVideo)
					return true;
			}
		}
		
		if(alterVideo){
			this.options.alternativo.subVideo = -1;
			this.options.alternativo.video = -1;
		}

		let unidade,nivel,slides;
		nivel = this.options.unid.split('.');
		unidade = parseInt(nivel[0]);
		slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
		if(nivel[1]){
			nivel = parseInt(nivel[1]);
			slides = slides['subItem'][nivel];
		} else {
			nivel = 0;
		}

		if(pos != null){
			pos = pos ? 1 : -1;
			src = slides['slides'][this.options.slide]['video'][this.options.subVideo+pos];
			if(src != undefined){
				src = src['video'];
				if(alterVideo)
					this.options.subVideo += pos;
			}
			
			if(src == undefined){
				src = slides['slides'][this.options.slide+pos];
				if(src != undefined){
					src = src['video'];
					src = src[pos == 1 ? 0 : src.length-1];
					if(src != undefined){
						src = src['video'];
						if(alterVideo){
							this.options.slide += pos;
							this.options.subVideo = pos == 1 ? 0 : src.length-1;
						}
					}
				}
			}

			if(src == undefined){
				if(nivel+pos){
					slides = this.listPlay['aula'][this.options.aula]['item'][unidade]['subItem'][nivel+pos];
					if(alterVideo){
						this.carregarGeraLog(unidade+'.'+(nivel+pos));
						this.options.unid = unidade+'.'+(nivel+pos);
					}
				} else {
					slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
					if(alterVideo){
						this.carregarGeraLog(unidade.toString());
						this.options.unid = unidade.toString();
					}
				}
				if(slides == undefined){
					slides = this.listPlay['aula'][this.options.aula]['item'][unidade+pos];
					if(alterVideo){
						this.carregarGeraLog((unidade+pos).toString());
						this.options.unid = (unidade+pos).toString();
					}
				}
				if(slides != undefined){
					src = slides['slides'];
					if(alterVideo)
						this.options.slide = pos == 1 ? 0 : src.length-1;

					src = src[pos == 1 ? 0 : src.length-1]['video'];
					if(alterVideo)
						this.options.subVideo = pos == 1 ? 0 : src.length-1;

					src = src[pos == 1 ? 0 : src.length-1]['video'];
				}
			}
		} else {
			src = slides['slides'][this.options.slide]['video'][this.options.subVideo]['video'];
		}

		if(alterVideo){
			this.atualizarCanvas();
			this.options.canvas.sentido = !this.options.canvas.sentido;
			this.updateMenuList();
		}

		return src;
	}

	atualizarCanvas(){
		let _self = this;
		let canvas = <HTMLCanvasElement>document.getElementById(QiSatPlayer.ID_CANVAS);
		if(canvas.dataset['interval'])
			clearInterval(parseInt(canvas.dataset['interval']));

		let img = document.createElement("img");

		if(this.options.alternativo.subVideo > -1 && this.options.alternativo.video > -1){
			img.src = _self.listPlay['aula'][_self.options.aula]['subVideo'][_self.options.alternativo.subVideo]['video'][_self.options.alternativo.video]['img'];
		} else {
			let [unidade,nivel] = _self.options.unid.split('.');
			if(nivel){
				img.src = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
			}else{
				img.src = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
			}
		}

		canvas.dataset['interval'] = setInterval(function(){
			let video = <HTMLVideoElement>document.getElementById(QiSatPlayer.ID_VIDEO);
			let context = canvas.getContext('2d');
	
			context.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
			if(video.classList.contains(QiSatPlayer.CLASS_HIDE)){
				context.drawImage(img, 75, 0, _self.options.canvas.imgWidth, _self.options.canvas.imgHeight);
			} else if (video.played.length){
				/**
				 * Barra diagonal com a chave
				 */
				if(_self.options.chave.length){
					context.fillStyle = "rgba(120,120,120,0.1)";
					context.beginPath();

					let diferenca = 45;
					if(_self.options.canvas.sentido){
						context.moveTo(0,0);
						context.lineTo(diferenca,0);
						context.lineTo(canvas.width,canvas.height-diferenca);
						context.lineTo(canvas.width,canvas.height);
						context.lineTo(canvas.width-diferenca,canvas.height);
						context.lineTo(0,diferenca);
					} else {
						context.moveTo(0,canvas.height);
						context.lineTo(diferenca,canvas.height);
						context.lineTo(canvas.width,diferenca);
						context.lineTo(canvas.width,0);
						context.lineTo(canvas.width-diferenca,0);
						context.lineTo(0,canvas.height-diferenca);
					}
					context.fill();
					context.font = "16px 'Arial'";
					context.fillStyle = "hsla("+_self.options.canvas.hue+","+_self.options.canvas.sat+"%,"+_self.options.canvas.val+"%,0.5)";
					context.textAlign = "center";

					//Chave do aluno
					let count = 0;
					while (count<11) {
						if(_self.options.canvas.sentido){
							context.fillText(_self.options.chave, 960-90.5*count, 535-48.5*(count++));
						} else {
							context.fillText(_self.options.chave, 46+91*count, 535-48.5*(count++));
						}
					}
				}

				/**
				 * Play do Canvas
				 */
				if (video.paused && !video.classList.contains(QiSatPlayer.CLASS_HIDE) && video.innerHTML != '') {
					var options_graph = {
						size: 140,
						lineWidth: 12
					};
					var radius = (options_graph.size - options_graph.lineWidth) / 2;

					/* Desenhando circulo do Play */
					context.beginPath();
					context.arc(497, 285, radius, 0, Math.PI * 2, false);
					context.strokeStyle = 'rgba(180, 180, 180, 0.6)';
					context.lineCap = 'round';
					context.lineWidth = options_graph.lineWidth;
					context.stroke();

					/* Desenhando triangulo do Play */
					context.fillStyle = "rgba(180, 180, 180, 0.6)";
					context.beginPath();
					context.moveTo(475, 245);
					context.lineTo(475, 325);
					context.lineTo(540, 285);
					context.fill();
				}
			}
		}, 50).toString();
	}

	/**
	 * Set Menu List
	 */
	updateMenuList(){
		let menuList = document.getElementsByClassName('menu-list')[0];
		let parent = menuList.getElementsByClassName('parent')[0];
		let unidade = this.options.unid.split('.')[0];
		for (let i in parent.childNodes) {
			let elem = <HTMLElement>parent.childNodes[i];
			if(elem.nodeName == 'DIV' && elem.dataset['unid'] != undefined){
				let child;
				if(child = <HTMLElement>elem.childNodes[0]){
					if(elem.dataset['unid'] == unidade){
						child.classList.remove(QiSatPlayer.CLASS_PLUS);
						child.classList.add(QiSatPlayer.CLASS_MINUS);
					}else{
						child.classList.remove(QiSatPlayer.CLASS_MINUS);
						child.classList.add(QiSatPlayer.CLASS_PLUS);
					}
				}
			}else if(elem.nodeName == 'LI'){
				let child = <HTMLDivElement>elem.childNodes[0];
				let ulList = <HTMLUListElement>elem.childNodes[3];
				if(elem.dataset['unid'] == this.options.unid){
					elem.classList.add(QiSatPlayer.CLASS_ACTIVE);
					child.classList.remove(QiSatPlayer.CLASS_ICON);
					child.classList.add(QiSatPlayer.CLASS_ICON_ACTIVE);
				} else {
					elem.classList.remove(QiSatPlayer.CLASS_ACTIVE);
					child.classList.remove(QiSatPlayer.CLASS_ICON_ACTIVE);
					child.classList.add(QiSatPlayer.CLASS_ICON);
				}
				if(ulList){
					if(elem.dataset['unid'] == unidade){
						ulList.classList.remove(QiSatPlayer.CLASS_HIDE);
					} else {
						ulList.classList.add(QiSatPlayer.CLASS_HIDE);
					}
				}
				if(ulList){
					for (let j in ulList.childNodes) {
						let elem2 = <HTMLElement>ulList.childNodes[j];
						if(elem2.nodeName == 'LI'){
							child = <HTMLDivElement>elem2.childNodes[0];
							if(elem2.dataset['unid'] == this.options.unid){
								child.classList.remove(QiSatPlayer.CLASS_ICON_DESACTIVE);
								child.classList.add(QiSatPlayer.CLASS_ICON_ACTIVE);
							}else{
								child.classList.remove(QiSatPlayer.CLASS_ICON_ACTIVE);
								child.classList.add(QiSatPlayer.CLASS_ICON_DESACTIVE);
							}
						}
					}
				}
			}
		}
	}
}
