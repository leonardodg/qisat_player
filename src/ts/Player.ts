import * as CONFIG from './constants';
import * as TEXT from './text';
import xhReq from './xhr';
import MenuContexto from './MenuContexto';


export default class Player {

	private _self = this;
	private listPlay;
	private buttonSvg;
	private menuContext;
	private options = {
		class: CONFIG.CLASS_VIDEO_CONTAINER,
		aula: 1,
		unid: "0",
		slide: 0,
		subVideo: 0,
		alternativo: {
			subVideo: -1,
			video: -1
		},
		filename: "menu_items.xml",
		videoElem: true,
		canvasElem: true,
		load: false,
		top: true,
		menu: true,
		videoTag: true,
		controls: true,
		slides: true,
		legenda: false,
		chave: "000000",
		mascara: true,
		geraLog: true,
		autoplay: true,
		autoplayTime: 5,
		playbackRate: true,
		style: null,
		fullScreen: true, // Proporção baseada nas configurações abaixo de altura e largura do video 
		video: {
			controls: false,
			autoplay: true,
			paused: true,
			width: 1010,
			height: 568,
			id: CONFIG.ID_VIDEO,
			poster: '/lib/QiSatPlayer3/dist/images/preloader-qisat.gif',
			filename: null,
			ext: ['mp4']
		},
		canvas: {
			id: CONFIG.ID_CANVAS,
			canvasMask: null,
			context: null,
			sentido: true,
			hue: 0,
			sat: 0,
			val: 40,
			val2: 0.5,
			height: 568,
			width: 1010,
			imgHeight: 568,
			imgWidth: 935,
			img: null
		},

		path: {
			local: 'E:/Sites/Moodle/lib/QiSatPlayer3/dist/'
		},

		url: {

			path: '',
			infoUser: '/lib/QiSatPlayer3/backend/getinfouser.php', // Dados de Identificação do Usuário
			geraLog: '/lib/QiSatPlayer3/backend/geraLog.php', // Log de Acesso Moodle
			startDefa: '/lib/QiSatPlayer3/backend/getUrl.php', // Gerar Link do video
			defa: '/lib/QiSatPlayer3/backend/defavid.php', // Default Filename defavid.php in getUrl.php
			local: '/lib/QiSatPlayer3/dist/samples/files/',
			images: '/lib/QiSatPlayer3/dist/images/'
			
			//  url.local: 
			//		 ATENÇÃO: teste basic use path absoluto de onde fica os arquivos,
			//					no moodle file.php link					
		}
		/**
		 * 
		 *  EXEMPLO Moodle
		 path: {
			local: '/var/www/html/moodle/lib/QiSatPlayer3/dist/'
		},

		url: {
			path: '',
			infoUser: '/lib/QiSatPlayer3/backend/getinfouser.php', // Dados de Identificação do Usuário
			geraLog: '/lib/QiSatPlayer3/backend/geraLog.php', // Log de Acesso Moodle
			startDefa: '/lib/QiSatPlayer3/backend/getUrl.php', // Gerar Link do video
			defa: '/lib/QiSatPlayer3/backend/defavid.php', // Default Filename defavid.php in getUrl.php
			local: window.location.href // link de acesso ao arquivos 
		}*/
	};

	constructor(opDefault: string | any[][]) {

		// let videoPlayer = document.getElementById(this.options.id);

		if (typeof opDefault === 'object') {
			opDefault = opDefault;
			for (let option in opDefault) {
				if (typeof opDefault[option] === 'object') {
					for (let subOption in opDefault[option])
						this.options[option][subOption] = opDefault[option][subOption];
				} else {
					this.options[option] = opDefault[option];
				}
			}
		} else if (typeof opDefault === 'string') {
			this.options.class = opDefault;
		}

		let videoPlayer = <HTMLDivElement>document.getElementsByClassName(this.options.class)[0];

		window.oncontextmenu = (e) => {
			e.preventDefault();
		}

		if (this.options.style != null) 
			videoPlayer.classList.add(this.options.style);

		if (!videoPlayer.classList.contains(CONFIG.CLASS_VIDEO_CONTAINER))
			videoPlayer.classList.add(CONFIG.CLASS_VIDEO_CONTAINER);

		videoPlayer.appendChild(this.createTop());
		videoPlayer.appendChild(this.createMenu());
		videoPlayer.appendChild(this.createVideoTag());
		videoPlayer.appendChild(this.createControls());
		
		let metaTag = <HTMLMetaElement>document.querySelector("meta[name=viewport]");
		if(!metaTag){
			metaTag = <HTMLMetaElement>document.createElement('meta');
			metaTag.name = "viewport";
		}
		metaTag.content = "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no";
		if(!document.querySelector("meta[name=viewport]"))
			document.getElementsByTagName('head')[0].appendChild(metaTag);

		window.addEventListener("resize", this.resize.bind(null, this));
		window.addEventListener("orientationchange", this.resize.bind(null, this));

		this.carregarInfoUser();
		this.carregarXML();

		try {
			this.menuContext = new MenuContexto(this);
			this.resize(this);
		} catch (error) {
			console.log(error);
		}

		this.buttonSvg = "";
		xhReq.setContentType('text/plain');
		xhReq.setResponseType('text');
		xhReq.get(this.options.url.images + 'button.svg').success(data => {
			this._self.buttonSvg = data;
		});
	}

	resize(_self){
		let videoPlayer = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_CONTAINER)[0];
		let videoTop = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TOP)[0];
		let top = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_TOP)[0];
		let titleCurso = <HTMLSpanElement>document.getElementsByClassName(CONFIG.CLASS_CURSO_TEXT)[0];
		let titleAula = <HTMLSpanElement>document.getElementsByClassName(CONFIG.CLASS_AULA_TEXT)[0];
		let logo = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_LOGO)[0];
		let menuAction = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_MENU_ACTION)[0];
		let menuList = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_MENU_LIST)[0];
		let videoTag = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TAG)[0];
		let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
		let canvas = <HTMLCanvasElement>document.getElementById(CONFIG.ID_CANVAS);
		let videoControls = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_CONTROLS)[0];
		let fullScreen = <HTMLInputElement>document.getElementById(CONFIG.ID_FULLSCREEN);

		videoTag.style['height'] = null;
		menuList.style['height'] = null;
		videoTop.style['width'] = null;
		videoTag.style['width'] = null;
		videoControls.style['width'] = null;
		videoPlayer.style['width'] = null;
		menuAction.style['marginTop'] = null;
		
		video.width = _self.options.video.width;
		video.height = _self.options.video.height;
		canvas.width = _self.options.canvas.width;
		canvas.height = _self.options.canvas.height;

		let altura = videoTop.clientHeight + _self.options.video.height + videoControls.clientHeight,
		mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if ((fullScreen && fullScreen.checked) || (mobile && altura > window.outerHeight)){
			if(fullScreen && fullScreen.checked)
				videoPlayer.classList.add(CONFIG.CLASS_FULLSCREEN);

			let proporcaoVideo = _self.options.video.width / _self.options.video.height;
			let proporcaoDisplay = window.innerWidth / (window.innerHeight - videoTop.clientHeight - videoControls.clientHeight);
			if( mobile ) {
				if(altura > window.innerHeight){
					proporcaoDisplay = window.outerWidth / (window.outerHeight - videoTop.clientHeight - videoControls.clientHeight);
				}
			}
			
			if(proporcaoDisplay >= proporcaoVideo){
				if( mobile && altura > window.innerHeight) {
					video.height = canvas.height = window.outerHeight;
				} else {
					video.height = canvas.height = window.innerHeight - videoTop.clientHeight - videoControls.clientHeight;
				}
				videoTag.style['height'] = video.height + "px";
				let width = video.height * proporcaoVideo;
				video.width = canvas.width = width;
				videoPlayer.style['width'] = (width < video.clientWidth ? video.clientWidth: width) + "px";
				videoTop.style['width'] = videoTag.style['width'] = 
				videoControls.style['width'] = width + "px";
			}else{
				if( mobile && altura > window.innerHeight) {
					if(window.outerWidth){
						video.width = canvas.width = window.outerWidth > _self.options.video.width ? _self.options.video.width : window.outerWidth;
					}else{
						video.width = canvas.width = window.innerWidth > _self.options.video.width ? _self.options.video.width : window.innerWidth;
						videoPlayer.style['width'] = video.width + "px";
					}
				} else {
					video.width = canvas.width = window.innerWidth > _self.options.video.width ? _self.options.video.width : window.innerWidth;
					if(fullScreen && fullScreen.checked)
						video.width = canvas.width = window.innerWidth;
				}
				videoTop.style['width'] = videoTag.style['width'] = 
				videoControls.style['width'] = video.width + "px";
				let height = video.width * 9 / 16;
				video.height = canvas.height = height;
				videoTag.style['height'] = height + "px";
			}

			let selector = CONFIG.CLASS + CONFIG.CLASS_VIDEO_CONTAINER +" "+ CONFIG.CLASS + CONFIG.CLASS_VIDEO_TOP +" > "+ CONFIG.CLASS + CONFIG.CLASS_TITLE +" > "+ CONFIG.CLASS;
			let marginLeftCurso = parseInt(_self.getStyleBySelector(selector+CONFIG.CLASS_CURSO_TEXT).marginLeft);
			let marginLeftAula = parseInt(_self.getStyleBySelector(selector+CONFIG.CLASS_AULA_TEXT).marginLeft);

			titleCurso.style['maxWidth'] = (videoTop.clientWidth - top.clientWidth - logo.clientWidth - marginLeftCurso) + "px";
			titleAula.style['maxWidth'] = (videoTop.clientWidth - top.clientWidth - logo.clientWidth - marginLeftAula) + "px";
			
			menuAction.style['marginTop'] = (video.height / 2 - menuAction.clientHeight) + "px";
			menuList.style['maxHeight'] = menuList.style['height'] = (video.clientHeight + 1)+"px";
			if( mobile ) {
				menuList.style['overflowX'] = "hidden";
				menuList.style['overflowY'] = "auto";
				if(proporcaoDisplay >= proporcaoVideo && altura > window.innerHeight){
					menuList.style['maxHeight'] = (video.clientHeight + 1 - videoTop.clientHeight - videoControls.clientHeight)+"px";
					menuAction.style['marginTop'] = (video.height / 2 - videoTop.clientHeight - menuAction.clientHeight) + "px";
				}
			}

		} else {
			videoPlayer.classList.remove(CONFIG.CLASS_FULLSCREEN);
		}

		videoPlayer.style['margin'] = "0 " + ((window.innerWidth - videoTag.clientWidth) / 2) + "px";
		video.style['margin'] = canvas.style['margin'] = "0 " + ((videoTag.clientWidth - canvas.clientWidth) / 2) + "px";

		if( mobile ) {
			videoTop.style['minWidth'] = videoTag.style['minWidth'] = videoControls.style['minWidth'] = 
			video.style['minWidth'] = canvas.style['minWidth']  = "0px";

			videoTop.style['minHeight'] = videoTag.style['minHeight'] = videoControls.style['minHeight'] = 
			video.style['minHeight'] = canvas.style['minHeight'] = "0px";
		}

		let graph = document.getElementById(CONFIG.ID_GRAPH);
		if ( graph && ((fullScreen && fullScreen.checked) || mobile )){
			graph.style['left'] = (video.width/2-30) + "px";
			graph.style['top'] = (video.height/2-60) + "px";
		}
	}

	getStyleBySelector( selector )
    {
       var sheetList = document.styleSheets;
       var ruleList;
       var i, j;
   
       for (i=sheetList.length-1; i >= 0; i--)
       {
           ruleList = (<CSSStyleSheet>sheetList[i]).cssRules;
           for (j=0; j<ruleList.length; j++)
           {
               if (ruleList[j].type == CSSRule.STYLE_RULE && 
                   ruleList[j].selectorText == selector)
               {
                   return ruleList[j].style;
               }   
           }
       }
       return null;
    }

	/**
	 * Criando componentes do topo do player
	 */
	createTop() {
		let videoTop = document.createElement("div");
		videoTop.classList.add(CONFIG.CLASS_VIDEO_TOP);
		videoTop.classList.add(CONFIG.CLASS_VISIBILY);
		videoTop.appendChild(this.setTop());
		videoTop.appendChild(this.setTitle());
		videoTop.appendChild(this.setLogo());
		return videoTop;
	}

	setTop() {
		let top = document.createElement("div");
		top.classList.add(CONFIG.CLASS_TOP);
		return top;
	}

	setTitle() {
		let title = document.createElement("div");
		title.classList.add(CONFIG.CLASS_TITLE);

		let titleCurso = document.createElement("span");
		titleCurso.classList.add(CONFIG.CLASS_CURSO_TEXT);
		title.appendChild(titleCurso);
		
		let titleAula = document.createElement("span");
		titleAula.classList.add(CONFIG.CLASS_AULA_TEXT);
		title.appendChild(titleAula);

		return title;
	}

	setLogo() {
		let logo = document.createElement("div");
		logo.classList.add(CONFIG.CLASS_LOGO);
		return logo;
	}

	/**
	 * Criando menu do player
	 */
	createMenu() {
		let videoMenu = document.createElement("div");
		videoMenu.classList.add(CONFIG.CLASS_VIDEO_MENU);
		videoMenu.appendChild(this.setAction());
		videoMenu.appendChild(this.setList());
		return videoMenu;
	}

	setAction() {
		let menuAction = document.createElement("div");
		menuAction.classList.add(CONFIG.CLASS_MENU_ACTION);

		let menuIcon = document.createElement("img");
		menuIcon.classList.add(CONFIG.CLASS_MENU_IMG);
		menuAction.appendChild(menuIcon);

		let menuSpan = document.createElement("span");
		menuSpan.innerHTML = TEXT.MENU;
		menuAction.appendChild(menuSpan);

		menuAction.addEventListener('click', () => {
			let menuList = document.getElementsByClassName(CONFIG.CLASS_MENU_LIST)[0];
			menuList.classList.toggle(CONFIG.CLASS_HIDE);
		});

		return menuAction;
	}

	setList() {
		let menuList = document.createElement("div");
		menuList.classList.add(CONFIG.CLASS_MENU_LIST, CONFIG.CLASS_HIDE);

		let menuTitleAula = document.createElement("span");
		menuTitleAula.classList.add(CONFIG.CLASS_AULA_TEXT);
		menuList.appendChild(menuTitleAula);

		let parent = document.createElement("ul");
		parent.classList.add(CONFIG.CLASS_PARENT);
		menuList.appendChild(parent);

		return menuList;
	}

	/**
	 * Efeito de fundo ao clicar no botão
	 * @param button 
	 */
	btEstilo(button) {
		button.addEventListener('mousedown', function () {
			this.classList.add(CONFIG.CLASS_BT_ACTIVE);
		});
		button.addEventListener('mouseup', function () {
			this.classList.remove(CONFIG.CLASS_BT_ACTIVE);
		});
	}

	/**
	 * Criando componentes de video do player
	 */
	createVideoTag() {
		let videoTag = document.createElement("div");
		videoTag.classList.add(CONFIG.CLASS_VIDEO_TAG);
		videoTag.appendChild(this.setBtClose());
		videoTag.appendChild(this.setVideo());
		videoTag.appendChild(this.setCanvas());
		return videoTag;
	}
	
	touchstart() {
		let canvas = <HTMLCanvasElement>document.getElementById(CONFIG.ID_CANVAS);
		clearInterval(parseInt(canvas.dataset['intervalTouchEnd']));
		let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
		let videoTop = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TOP)[0];
		let videoControls = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_CONTROLS)[0];
		if ((video.classList.contains(CONFIG.CLASS_HIDE) || !video.paused) &&
		(videoTop.classList.contains(CONFIG.CLASS_VISIBILY) ||
		videoControls.classList.contains(CONFIG.CLASS_VISIBILY))) {
			videoTop.classList.remove(CONFIG.CLASS_VISIBILY);
			videoControls.classList.remove(CONFIG.CLASS_VISIBILY);
		} else {
			videoTop.classList.add(CONFIG.CLASS_VISIBILY);
			videoControls.classList.add(CONFIG.CLASS_VISIBILY);
		}
	}

	endVideo(_self) {
		_self.touchstart();

		let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
		video.classList.add(CONFIG.CLASS_HIDE);
		video.innerHTML = "";
		video.load();

		let btPlay = <HTMLElement>document.getElementById(CONFIG.ID_PLAY);
		btPlay.classList.remove(CONFIG.CLASS_PLAY);
		btPlay.classList.remove(CONFIG.CLASS_PAUSE);
		btPlay.classList.add(CONFIG.CLASS_REFRESH);

		let btClose = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_BT_CLOSE)[0];
		btClose.classList.add(CONFIG.CLASS_HIDE);

		let videoTag = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TAG)[0];

		let btNext = <HTMLDivElement>document.getElementById(CONFIG.ID_NEXT);
		btNext.dataset['interval'] = setInterval(function () {
			if(btNext.classList.contains(CONFIG.CLASS_VISIBILY))
				btNext.classList.remove(CONFIG.CLASS_VISIBILY);
			else		
				btNext.classList.add(CONFIG.CLASS_VISIBILY);
		}, 800).toString();

		// LightBox
		let btnImagemId, [unidade, nivel] = _self.options.unid.split('.');
		if (nivel) {
			btnImagemId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['btnImagem'];
		} else {
			btnImagemId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['btnImagem'];
		}
		if (btnImagemId != undefined) {
			let btnImagens = btnImagemId.split(',');
			btnImagens.forEach(element => {
				_self.listPlay['aula'][_self.options.aula]['btnImagem'].forEach(element2 => {
					if (element == element2.id) {
						let posIndex = element2['img'][0]['pos'].split(';');
						let posVal = element2['pos'].split(';');
						let lightbox = <HTMLDivElement>document.createElement("div");
						lightbox.id = element;
						lightbox.classList.add(CONFIG.CLASS_LIGHTBOX, CONFIG.CLASS_BNT_CLASS);
						lightbox.style[posIndex[0]] = posVal[0];
						lightbox.style[posIndex[1]] = posVal[1];
						lightbox.style[posIndex[2]] = posVal[2];
						lightbox.style[posIndex[3]] = posVal[3];

						let count = 0;
						element2['img'].forEach(element3 => {
							let aLightbox = document.createElement("a");
							aLightbox.href = _self.options.url.path + element3['src'];
							aLightbox.dataset['lightbox'] = element + '-' + count++;

							let imgLightbox = document.createElement("img");
							imgLightbox.src = '#';
							for (let index = 0; index < posIndex.length; index++) {
								if (posIndex[index] == 'width' || posIndex[index] == 'height')
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
		if (nivel) {
			subVideoId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['subVideo'];
		} else {
			subVideoId = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['subVideo'];
		}
		if (subVideoId != undefined && _self.options.alternativo.subVideo == -1) {
			let subVideos = subVideoId.split(',');
			let count = 0;
			subVideos.forEach(element => {
				_self.listPlay['aula'][_self.options.aula]['subVideo'].forEach(//element2 => {
					function (element2, index) {
						if (element == element2.id) {
							//console.log(_self.listPlay);

							let btFailed = <HTMLDivElement>document.createElement("div");
							btFailed.classList.add(element2['action'], CONFIG.CLASS_BUTTON);
							btFailed.style['bottom'] = (10 + 40 * count++) + 'px';
							videoTag.insertBefore(btFailed, btClose.nextSibling);
							btClose = btFailed;

							btFailed.innerHTML = _self.buttonSvg;
							btFailed.addEventListener('click', function () {
								_self.options.alternativo.subVideo = index;
								_self.options.alternativo.video = 0;
								_self.setSource();
							});
							const style = getComputedStyle(btFailed);

							if (style.fill != "rgb(0, 0, 0)")
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

	setBtClose() {
		let btClose = document.createElement("div");
		btClose.classList.add(CONFIG.CLASS_BT_CLOSE);
		btClose.innerHTML = TEXT.CLOSE;

		let fiX = document.createElement("div");
		fiX.classList.add(CONFIG.CLASS_BT_CLOSE_X);
		btClose.appendChild(fiX);

		btClose.addEventListener('click', function () {
			var evObj = document.createEvent('HTMLEvents');
			evObj.initEvent('ended', false, false);
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			video.dispatchEvent(evObj);
		});
		this.btEstilo(btClose);

		return btClose;
	}

	setVideo() {
		let _self = this;
		let video = document.createElement("video");
		video.id = CONFIG.ID_VIDEO;
		/*var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if (!isMobile) {
			video.width = this.options.video.width;
			video.height = this.options.video.height;
		}*/

		video.addEventListener('playing', function () {
			this.muted = Boolean(document.getElementsByClassName(CONFIG.CLASS_VOLUME_NONE).length);

			var curmins = Math.floor(this.duration / 60),
				cursecs = Math.floor(this.duration - curmins * 60),
				durtimetext = <HTMLSpanElement>document.getElementById(CONFIG.ID_DURATION_TEXT);
			durtimetext.innerHTML = ("00" + curmins).slice(-2) + ":" + ("00" + cursecs).slice(-2);
		});
		video.addEventListener("timeupdate", function () {
			var curmins = Math.floor(this.currentTime / 60),
				cursecs = Math.floor(this.currentTime - curmins * 60),
				value = (this.currentTime / this.duration);

			let curtimetext = <HTMLSpanElement>document.getElementById(CONFIG.ID_TIME_TEXT);
			curtimetext.innerHTML = ("00" + curmins).slice(-2) + ":" + ("00" + cursecs).slice(-2);

			let progresso = <HTMLProgressElement>document.getElementById(CONFIG.ID_PROGRESS);
			progresso.value = (value) ? value : 0;
		});
		video.addEventListener('loadstart', function () {
			video.poster = "/";
			video.style['background'] = "url('"+_self.options['video']['poster']+"')";
			video.style['backgroundRepeat'] = 'no-repeat';
			video.style['backgroundPosition'] = 'center';
		});
		video.addEventListener('canplay', function () {
			video.style['background'] = "";
		});
		video.addEventListener('ended', this.endVideo.bind(this, _self));

		return video;
	}

	setCanvas() {
		let _self = this;
		let canvas = document.createElement("canvas");
		canvas.id = CONFIG.ID_CANVAS;
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		
		if (isMobile) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		} else {
			canvas.width = this.options.canvas.width;
			canvas.height = this.options.canvas.height;
		}
		
		canvas.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			if (!video.classList.contains(CONFIG.CLASS_HIDE)) {
				let btPlay = <HTMLElement>document.getElementById(CONFIG.ID_PLAY);
				btPlay.click();
			}
		});
		canvas.addEventListener('touchstart', this.touchstart);
		canvas.addEventListener('touchend', function () {
			clearInterval(parseInt(this.dataset['intervalTouchEnd']));
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			this.dataset['intervalTouchEnd'] = setTimeout(function () {
				if (!video.paused) {
					let videoTop = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TOP)[0];
					let videoControls = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_CONTROLS)[0];
					videoTop.classList.remove(CONFIG.CLASS_VISIBILY);
					videoControls.classList.remove(CONFIG.CLASS_VISIBILY);
				}
			}, 1500).toString();

			setTimeout(_self.resize, 100, _self);
		});

		return canvas;
	}

	/**
	 * Criando componentes de controle do player
	 */
	createControls() {
		let videoControls = document.createElement("div");
		videoControls.classList.add(CONFIG.CLASS_VIDEO_CONTROLS);
		videoControls.classList.add(CONFIG.CLASS_VISIBILY);
		videoControls.appendChild(this.setBarraProgresso());
		videoControls.appendChild(this.setBtPrevious());
		videoControls.appendChild(this.setPlay());
		videoControls.appendChild(this.setNext());
		videoControls.appendChild(this.setVolume());
		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			videoControls.appendChild(this.setVolumeBar());
		}
		videoControls.appendChild(this.setSlides());
		videoControls.appendChild(this.setSubVideos());
		videoControls.appendChild(this.setTime());
		return videoControls;
	}

	setBarraProgresso() {
		let progress = <HTMLProgressElement>document.createElement("progress");
		progress.id = CONFIG.ID_PROGRESS;
		progress.max = 1;
		progress.value = 0;
		progress.addEventListener('click', function (e) {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			let value = e.offsetX / this.offsetWidth;
			let time = video.duration * value;
			video.currentTime = Math.floor(time);
			this.value = value;
		});
		return progress;
	}

	setBtPrevious() {
		let _self = this;
		let btPrevious = document.createElement("div");
		btPrevious.id = CONFIG.ID_PREVIOUS;
		btPrevious.classList.add(CONFIG.CLASS_PREVIOUS);
		btPrevious.addEventListener('click', function () {
			if (this.classList.contains(CONFIG.CLASS_PREVIOUS))
				_self.setSource(false);
		});
		this.btEstilo(btPrevious);
		return btPrevious;
	}

	setPlay() {
		let _self = this;
		let btPlay = document.createElement("div");
		btPlay.id = CONFIG.ID_PLAY;
		btPlay.classList.add(CONFIG.CLASS_PLAY);
		btPlay.click = function () {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			let menuList = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_MENU_LIST)[0];
			let btClose = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_BT_CLOSE)[0];
			menuList.classList.add(CONFIG.CLASS_HIDE);
			btClose.classList.remove(CONFIG.CLASS_HIDE);
			video.classList.remove(CONFIG.CLASS_HIDE);

			let graph = <HTMLDivElement>document.getElementById(CONFIG.ID_GRAPH);
			if (graph)
				graph.remove();

			let btNext = <HTMLDivElement>document.getElementById(CONFIG.ID_NEXT);
			clearInterval(parseInt(btNext.dataset['interval']));
			if (btNext.classList.contains(CONFIG.CLASS_VISIBILY)) 
				btNext.classList.remove(CONFIG.CLASS_VISIBILY);

			if (this.classList.contains(CONFIG.CLASS_PAUSE)) {
				this.classList.remove(CONFIG.CLASS_PAUSE);
				this.classList.add(CONFIG.CLASS_PLAY);
				video.pause();
			} else {
				if (this.classList.contains(CONFIG.CLASS_REFRESH)) {
					video.currentTime = 0;
					_self.lightBoxClear();
				}

				video.play();
				_self.touchstart();
				if (!video.paused) {
					this.classList.remove(CONFIG.CLASS_REFRESH);
					this.classList.remove(CONFIG.CLASS_PLAY);
					this.classList.add(CONFIG.CLASS_PAUSE);
				}
				let subMenu = <HTMLDivElement>document.getElementById(CONFIG.ID_SUBMENU);
				subMenu.classList.add(CONFIG.CLASS_HIDE);
				let widget = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_WIDGET)[0];
				if (widget)
					clearInterval(parseInt(widget.dataset['interval']));
			}
		};
		btPlay.addEventListener('click', btPlay.click);
		this.btEstilo(btPlay);
		return btPlay;
	}

	setNext() {
		let _self = this;
		let btNext = document.createElement("div");
		btNext.id = CONFIG.ID_NEXT;
		btNext.classList.add(CONFIG.CLASS_NEXT);
		btNext.addEventListener('click', function () {
			if (this.classList.contains(CONFIG.CLASS_NEXT))
				_self.setSource(true);
		});
		this.btEstilo(btNext);
		return btNext;
	}

	setVolume() {
		let btVolume = document.createElement("div");
		btVolume.id = CONFIG.ID_VOLUME;
		btVolume.classList.add(CONFIG.CLASS_VOLUME);
		btVolume.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			if (video.muted = this.classList.contains(CONFIG.CLASS_VOLUME)) {
				this.classList.remove(CONFIG.CLASS_VOLUME);
				this.classList.add(CONFIG.CLASS_VOLUME_NONE);
			} else {
				this.classList.remove(CONFIG.CLASS_VOLUME_NONE);
				this.classList.add(CONFIG.CLASS_VOLUME);
			}
		});
		this.btEstilo(btVolume);
		return btVolume;
	}

	setVolumeBar() {
		let btVolumeBar = document.createElement("input");
		btVolumeBar.id = CONFIG.ID_VOLUME_BAR;
		btVolumeBar.type = 'range';
		btVolumeBar.min = '0';
		btVolumeBar.max = btVolumeBar.value = '1';
		btVolumeBar.step = '0.1';

		btVolumeBar.addEventListener('click', function () {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			video.volume = Number(this.value);
			let volume = <HTMLInputElement>document.getElementById(CONFIG.ID_VOLUME);
			if (video.volume) {
				volume.classList.remove(CONFIG.CLASS_VOLUME_NONE);
				volume.classList.add(CONFIG.CLASS_VOLUME);
			} else {
				volume.classList.remove(CONFIG.CLASS_VOLUME);
				volume.classList.add(CONFIG.CLASS_VOLUME_NONE);
			}
		});
		return btVolumeBar;
	}

	setSlides() {
		let _self = this;
		let slides = document.createElement("div");
		slides.id = CONFIG.ID_DIV_SLIDES;
		slides.innerHTML = TEXT.SLIDES;
		slides.dataset['unid'] = '0';

		for (var i = 1; i <= 10; i++) {
			let p = <HTMLElement>document.createElement("p");
			p.innerHTML = i.toString();
			p.dataset['slide'] = (i - 1).toString();
			if (i == 1) {
				p.classList.add(CONFIG.CLASS_ACTIVE);
			} else {
				p.classList.add(CONFIG.CLASS_DISABLE);
			}
			p.addEventListener('click', function () {
				if (!this.classList.contains(CONFIG.CLASS_DISABLE)) {
					_self.options.slide = parseInt(this.dataset['slide']);
					_self.setSource();
				}
			});
			slides.appendChild(p);
		}

		return slides;
	}

	setSubVideos() {
		let subVideosList = document.createElement("div");
		subVideosList.id = 'subVideos-List';

		let p = document.createElement("p");
		p.innerHTML = TEXT.VIDEO;
		subVideosList.appendChild(p);

		let subVideo = document.createElement("p");
		subVideo.classList.add(CONFIG.CLASS_N_SUBVIDEO);
		subVideo.innerHTML = '1';
		subVideosList.appendChild(subVideo);

		let subVideoBarra = document.createElement("span");
		subVideoBarra.innerHTML = '/';
		subVideosList.appendChild(subVideoBarra);

		let totalSubVideo = document.createElement("p");
		totalSubVideo.classList.add(CONFIG.CLASS_TOTAL_SUBVIDEO);
		totalSubVideo.innerHTML = '1';
		subVideosList.appendChild(totalSubVideo);

		return subVideosList;
	}

	setTime() {
		let videoTime = document.createElement("div");
		videoTime.id = CONFIG.ID_DIV_VIDEO_TIME;

		let curtimetext = document.createElement("span");
		curtimetext.id = CONFIG.ID_TIME_TEXT;
		curtimetext.innerHTML = TEXT.ZERO_TIME;
		videoTime.appendChild(curtimetext);

		let p = document.createElement("p");
		p.innerHTML = ' / ';
		videoTime.appendChild(p);

		let durtimetext = document.createElement("span");
		durtimetext.id = CONFIG.ID_DURATION_TEXT;
		durtimetext.innerHTML = TEXT.ZERO_TIME;
		videoTime.appendChild(durtimetext);

		return videoTime;
	}

	carregarGeraLog(unid: string) {
		let idN = window.location.href.indexOf("?") !== -1 ? "&" : "?";
		let nivel = this.options.unid.indexOf(".") > 0 ? this.options.unid.substring(this.options.unid.indexOf(".")+1) : '0';
		let payload: String = "conteudoAnterior=un" +
			(this.options.unid.indexOf(".") > 0 ? this.options.unid.replace(".", "_") : this.options.unid + "_0") +
			".html&conteudo=un" + (unid.indexOf(".") > 0 ? unid.replace(".", "_") : unid + "_0") +
			".html&url=" + window.location.href + idN +
			'idN=' + this.options.aula +
			'&unidade=' + (this.options.unid.indexOf(".") == -1 ? this.options.unid : this.options.unid.substring(0,this.options.unid.indexOf("."))) +
			'&nivel=' + nivel +
			'&aula=Aula%20' + this.options.aula;

		xhReq.setContentType('application/x-www-form-urlencoded');
		xhReq.setResponseType('text');
		xhReq.post(this.options.url.geraLog, payload);
	}

	carregarInfoUser() {
		xhReq.setContentType('text/plain');
		xhReq.setResponseType('text');
		xhReq.get(this.options.url.infoUser)
			.success(data => {
				if (data && data != '') {
					this.options.chave = data.split('<br>')[2].substr(8);
				}
			});
	}

	carregarXML() {
		let _self = this;
		xhReq.setContentType('text/xml');
		xhReq.setResponseType('xml');
		xhReq.get(this.options.url.path + this.options.filename)
			.success(data => {
				if(typeof data == 'string'){
					let parser = new DOMParser();
					data = parser.parseFromString(data,"text/xml");
				}
				_self.listPlay = _self.listarXml(data.getElementsByTagName('curso'));

				var titleCurso = document.getElementsByClassName(CONFIG.CLASS_CURSO_TEXT)[0];
				titleCurso.innerHTML = _self.listPlay['titulo'];
				var titleAula = document.getElementsByClassName(CONFIG.CLASS_AULA_TEXT)[0];
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
	listarXml(elem, tag = 'curso') {
		let retorno = [];
		let tagRelacionamento = {
			'curso': ['aula'],
			'aula': ['item', 'btnImagem', 'subVideo'],
			'item': ['titulo', 'slides', 'subItem'],
			'subItem': ['titulo', 'slides'],
			'subVideo': ['video'],
			'slides': ['video'],
			'btnImagem': ['img']
		};
		let nextTags = tagRelacionamento[tag];

		for (let i = 0; i < elem.length; i++) {
			if (elem[i].nodeName == tag) {
				let index = i;
				if (tag == 'aula' || tag == 'item' || tag == 'subItem') {
					for (let j = 0; j < elem[i].attributes.length; j++) {
						let node = elem[i].attributes[j];
						if (node.name == 'num') {
							index = node.value.split('.').pop();
						}
					}
				}

				retorno[index] = [];
				for (let j = 0; j < elem[i].attributes.length; j++) {
					let node = elem[i].attributes[j];
					retorno[index][node.name] = node.value;
				}
				if (nextTags == undefined) {
					if (tag == 'titulo')
						return elem[i].textContent;

					retorno[index][tag] = elem[i].textContent;
				} else {
					for (let j = 0; j < nextTags.length; j++) {
						let nextTag = nextTags[j];
						retorno[index][nextTag] = this.listarXml(elem[i].childNodes, nextTag);
					}
				}
			}
		}

		if (tag == 'curso') {
			return retorno.pop();
		}

		if (tag == 'aula' || tag == 'item' || tag == 'subItem') {
			return retorno;
		}

		return retorno.filter(function (el) {
			return el != null;
		});
	}

	/**
	 * Cria o menu lateral com todas as unidades e niveis
	 */
	createMenuList() {
		let _self = this;
		let parent = document.getElementsByClassName(CONFIG.CLASS_PARENT)[0];
		function setVideo() {
			_self.carregarGeraLog(this.parentNode.dataset['unid']);
			_self.options.unid = this.parentNode.dataset['unid'];
			_self.setSource();
		};
		for (let i = 0; i < this.listPlay['aula'][this.options.aula]['item'].length; i++) {
			let unidade = this.listPlay['aula'][this.options.aula]['item'][i];
			if(unidade == undefined){
				continue;
			}
			let liView = document.createElement("div");
			liView.classList.add(CONFIG.CLASS_ACTION);
			liView.classList.add(CONFIG.CLASS_VIEW);
			liView.classList.add(unidade['subItem'].length ? CONFIG.CLASS_LESS : CONFIG.CLASS_SPAN);
			liView.dataset['unid'] = i + '';
			if (unidade['subItem'].length) {
				let plus = document.createElement("i");
				plus.classList.add(CONFIG.CLASS_PLUS);
				plus.addEventListener('click', function () {
					let elem, i: any;
					for (i in this.parentNode.parentNode.childNodes) {
						elem = <HTMLElement>this.parentNode.parentNode.childNodes[i];
						if (elem == this.parentNode) {
							elem = <HTMLElement>this.parentNode.parentNode.childNodes[++i];
							elem = <HTMLElement>elem.childNodes[3];
							break;
						}
					}
					if (this.classList.contains(CONFIG.CLASS_PLUS)) {
						this.classList.remove(CONFIG.CLASS_PLUS);
						this.classList.add(CONFIG.CLASS_MINUS);
						elem.classList.remove(CONFIG.CLASS_HIDE);
					} else {
						this.classList.remove(CONFIG.CLASS_MINUS);
						this.classList.add(CONFIG.CLASS_PLUS);
						elem.classList.add(CONFIG.CLASS_HIDE);
					}
				});
				liView.appendChild(plus);
			}
			parent.appendChild(liView);

			let liAction = document.createElement("li");
			liAction.classList.add(CONFIG.CLASS_ACTION);
			liAction.dataset['unid'] = i + '';
			liAction.addEventListener('mouseover', function () {
				let child = <HTMLSpanElement>this.childNodes[1];
				child.classList.add(CONFIG.CLASS_ACTIVE);
			});
			liAction.addEventListener('mouseout', function () {
				let child = <HTMLSpanElement>this.childNodes[1];
				child.classList.remove(CONFIG.CLASS_ACTIVE);
			});

			let liIcon = document.createElement("div");
			liIcon.classList.add(CONFIG.CLASS_ICON);
			liIcon.addEventListener('click', setVideo);
			liAction.appendChild(liIcon);

			let plus = document.createElement("i");
			plus.classList.add(CONFIG.CLASS_PAGE);
			liIcon.appendChild(plus);

			let titulo = document.createElement("span");
			titulo.textContent = unidade['titulo'];
			titulo.addEventListener('click', setVideo);
			liAction.appendChild(titulo);

			let clear = document.createElement("div");
			clear.classList.add(CONFIG.CLASS_CLEAR);
			liAction.appendChild(clear);

			if (unidade['subItem'].length) {
				let ulHide = document.createElement("ul");
				ulHide.classList.add(CONFIG.CLASS_HIDE);
				for (let j = 0; j < unidade['subItem'].length; j++) {
					let nivel = unidade['subItem'][j];
					if (nivel != undefined) {
						let liAction2 = document.createElement("li");
						liAction2.classList.add(CONFIG.CLASS_ACTION);
						liAction2.dataset['unid'] = i + '.' + j;
						liAction2.addEventListener('mouseover', function () {
							let child = <HTMLSpanElement>this.childNodes[1];
							child.classList.add(CONFIG.CLASS_ACTIVE);
						});
						liAction2.addEventListener('mouseout', function () {
							let child = <HTMLSpanElement>this.childNodes[1];
							child.classList.remove(CONFIG.CLASS_ACTIVE);
						});

						let liIcon2 = document.createElement("div");
						liIcon2.classList.add(CONFIG.CLASS_ICON_DESACTIVE);
						liIcon2.addEventListener('click', setVideo);

						let pageSmall = document.createElement("i");
						pageSmall.classList.add(CONFIG.CLASS_PAGE_SMALL);
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
	lightBoxClear() {
		let lightbox = document.getElementsByClassName(CONFIG.CLASS_LIGHTBOX + ' ' + CONFIG.CLASS_BNT_CLASS);
		let button = document.getElementsByClassName(CONFIG.CLASS_BUTTON);
		lightbox = Array.prototype.slice.apply(lightbox).concat(Array.prototype.slice.apply(button));
		for (let index = lightbox.length - 1; index > -1; index--) {
			lightbox[index].remove();
		}
	}

	setSource(pos = null) {
		let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
		video.classList.remove(CONFIG.CLASS_HIDE);
		video.innerHTML = '';
		video.load();

		this.lightBoxClear();

		let src = this.getNextVideo(pos, true);

		let btPrevious = <HTMLElement>document.getElementById(CONFIG.ID_PREVIOUS);
		if (this.getNextVideo(false) == undefined) {
			btPrevious.classList.remove(CONFIG.CLASS_PREVIOUS);
			btPrevious.classList.add(CONFIG.CLASS_PREVIOUS_DISABLE);
		} else {
			btPrevious.classList.remove(CONFIG.CLASS_PREVIOUS_DISABLE);
			btPrevious.classList.add(CONFIG.CLASS_PREVIOUS);
		}

		let btNext = <HTMLElement>document.getElementById(CONFIG.ID_NEXT);
		if (this.getNextVideo(true) == undefined) {
			btNext.classList.remove(CONFIG.CLASS_NEXT);
			btNext.classList.add(CONFIG.CLASS_NEXT_DISABLE);
		} else {
			btNext.classList.remove(CONFIG.CLASS_NEXT_DISABLE);
			btNext.classList.add(CONFIG.CLASS_NEXT);
		}

		let unidade, nivel, parte, subVideo, totalSubVideo;
		[unidade, nivel] = this.options.unid.split('.');
		if (nivel == undefined) {
			parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['slides'];
		} else {
			parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['subItem'][nivel]['slides'];
		}
		let slides = <HTMLDivElement>document.getElementById(CONFIG.ID_DIV_SLIDES);
		for (let i in slides.childNodes) {
			let elem = <HTMLElement>slides.childNodes[i];
			if (elem.nodeName == 'P') {
				elem.classList.remove(CONFIG.CLASS_ACTIVE);
				if (parseInt(elem.dataset['slide']) == this.options.slide) {
					elem.classList.add(CONFIG.CLASS_ACTIVE);
				}
				if (parseInt(elem.dataset['slide']) > parte.length - 1) {
					elem.classList.add(CONFIG.CLASS_DISABLE);
				} else {
					elem.classList.remove(CONFIG.CLASS_DISABLE);
				}
			}
		}

		if (subVideo = <HTMLElement>document.getElementsByClassName(CONFIG.CLASS_N_SUBVIDEO)[0]) {
			subVideo.innerHTML = this.options.subVideo + 1;
		}
		if (totalSubVideo = <HTMLElement>document.getElementsByClassName(CONFIG.CLASS_TOTAL_SUBVIDEO)[0]) {
			totalSubVideo.innerHTML = parte[this.options.slide]['video'].length;
		}

		let type = [], srcs = [];
		for (let i = 0; i < this.options.video.ext.length; i++) {
			let ext = this.options.video.ext[i];
			type.push(CONFIG.VIDEOTYPES[ext + "-codecs"]);
			srcs.push(src + '.' + ext);
		}
		let data = 'url=' + this.options.url.local + '&src=' + srcs.join('|') + '&type=' + type.join('|') + '&defaUrl=' + this.options.url.defa;
		let _self = this;
		xhReq.setContentType('application/x-www-form-urlencoded');
		xhReq.setResponseType('text');
		xhReq.post(this.options.url.startDefa, data).success(function (data) {

			let result = data.split('|');

			let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
			let IE = /Trident/.test(navigator.userAgent) && window['MSStream'];
			if (iOS || IE) {
				let loading = <HTMLDivElement>document.getElementById(CONFIG.CLASS_LOADING);
				let canvas = <HTMLCanvasElement>document.getElementById(CONFIG.ID_CANVAS);
				let xhReq = new XMLHttpRequest();
				xhReq.onloadstart = function (ev) {
					xhReq.responseType = "blob";
					if (!loading) {
						loading = <HTMLDivElement>document.createElement('div');
						loading.classList.add(CONFIG.CLASS_LOADING);
						let videoTag = <HTMLDivElement>document.getElementsByClassName(CONFIG.CLASS_VIDEO_TAG)[0];
						videoTag.insertBefore(loading, canvas.nextSibling);
					}
				}

				let ctx = canvas.getContext('2d');
				var drawCircle = function (percent) {
					ctx.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
					ctx.beginPath();
					ctx.arc(486, 282, 32, Math.PI * 1.5, (Math.PI * 1.5) + (Math.PI * 2 * percent), false);
					ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
					ctx.lineCap = 'round';
					ctx.lineWidth = 6;
					ctx.stroke();
				};
				xhReq.addEventListener("progress", function (event) {
					if (event.lengthComputable) {
						drawCircle(event.loaded / event.total);
					}
				}, false);

				xhReq.onload = function () {
					let reader = new FileReader();
					reader.onloadend = function () {
						let result = reader.result.toString();
						let byteCharacters = atob(result.slice(result.indexOf(',') + 1));
						let byteNumbers = new Array(byteCharacters.length);
						for (let i = 0; i < byteCharacters.length; i++) {
							byteNumbers[i] = byteCharacters.charCodeAt(i);
						}
						let byteArray = new Uint8Array(byteNumbers);
						let t = type.pop();
						if (t.indexOf(';') > 0)
							t = t.substr(0, t.indexOf(';'));
						let blob = new Blob([byteArray], { type: t });
						let sourceElem = document.createElement("source");
						sourceElem.src = URL.createObjectURL(blob);
						sourceElem.type = t;
						video.appendChild(sourceElem);
						ctx.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
						loading.parentNode.removeChild(loading);
						_self.loadVideo(video);
					};
					reader.readAsDataURL(xhReq.response);

					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
						_self.resize(_self);
				};
				xhReq.open('GET', result[result.length - 1]);
				if (result[result.length - 1].indexOf('defavid') !== -1) {
					xhReq.setRequestHeader("Range", "bytes=0-");
				}
				xhReq.send();
			} else {
				length = result.length;

				/*let buffered: [any], total = 921436 * 8;
				video.onloadstart = function() {
					buffered.push([0, (new Date()).getTime(), 0]);
				};*/
				video.onprogress = function () {
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

				while (length--) {
					let ext = _self.options.video.ext[length];
					let source = document.createElement("source");
					source.src = result[length];
					source.type = CONFIG.VIDEOTYPES[ext + "-codecs"];
					video.appendChild(source);
				}
				_self.loadVideo(video);
			}

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
				_self.resize(_self);

		});
	}

	loadVideo(video: HTMLVideoElement) {
		video.load();
		let btPlay = <HTMLElement>document.getElementById(CONFIG.ID_PLAY);
		if (btPlay.classList.contains(CONFIG.CLASS_PAUSE)) {
			video.play();
		} else {
			btPlay.click();
		}
		var playback = document.getElementById('playback');
		if (playback) {
			video.playbackRate = parseFloat(playback.textContent);
		}
	}

	getNextVideo(pos = null, alterVideo = false) {
		let src;

		if (this.options.alternativo.subVideo > -1 || this.options.alternativo.video > -1) {
			let posAlter = pos == undefined ? 0 : (pos ? 1 : -1);
			src = this.listPlay['aula'][this.options.aula]['subVideo'][this.options.alternativo.subVideo]['video'][this.options.alternativo.video + posAlter];
			if (src) {
				src = src['video'];
				if (alterVideo) {
					this.atualizarCanvas();
					this.options.alternativo.video += posAlter;
					this.options.canvas.sentido = !this.options.canvas.sentido;
					this.updateMenuList();
				}
				return src;
			}
			if (this.options.alternativo.video == 0 && posAlter == -1) {
				pos = null;
				if (!alterVideo)
					return true;
			}
		}

		if (alterVideo) {
			this.options.alternativo.subVideo = -1;
			this.options.alternativo.video = -1;
		}

		let unidade, nivel, slides;
		nivel = this.options.unid.split('.');
		unidade = parseInt(nivel[0]);
		slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
		if (nivel[1]) {
			nivel = parseInt(nivel[1]);
			slides = slides['subItem'][nivel];
		} else {
			nivel = 0;
		}

		if (pos != null) {
			pos = pos ? 1 : -1;
			src = slides['slides'][this.options.slide]['video'][this.options.subVideo + pos];
			if (src != undefined) {
				src = src['video'];
				if (alterVideo)
					this.options.subVideo += pos;
			}

			if (src == undefined) {
				src = slides['slides'][this.options.slide + pos];
				if (src != undefined) {
					src = src['video'];
					src = src[pos == 1 ? 0 : src.length - 1];
					if (src != undefined) {
						src = src['video'];
						if (alterVideo) {
							this.options.slide += pos;
							this.options.subVideo = pos == 1 ? 0 : src.length - 1;
						}
					}
				}
			}

			if (src == undefined) {
				var item = this.listPlay['aula'][this.options.aula]['item'];
				slides = undefined;
				if (pos && item[unidade]['subItem'][nivel + pos]) {
					slides = item[unidade]['subItem'][nivel + pos];
					if (alterVideo) {
						this.carregarGeraLog(unidade + '.' + (nivel + pos));
						this.options.unid = unidade + '.' + (nivel + pos);
					}
				} else if (pos && item[unidade + pos]) {
					slides = item[unidade + pos];
					if (alterVideo) {
						this.carregarGeraLog((unidade + pos).toString());
						this.options.unid = (unidade + pos).toString();
					}
				} else if (!pos) {
					slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
					if (alterVideo) {
						this.carregarGeraLog(unidade.toString());
						this.options.unid = unidade.toString();
					}
				}
				
				if (slides != undefined) {
					src = slides['slides'];
					if (alterVideo)
						this.options.slide = pos == 1 ? 0 : src.length - 1;

					src = src[pos == 1 ? 0 : src.length - 1]['video'];
					if (alterVideo)
						this.options.subVideo = pos == 1 ? 0 : src.length - 1;

					src = src[pos == 1 ? 0 : src.length - 1]['video'];
				}
			}
		} else {
			src = slides['slides'][this.options.slide]['video'][this.options.subVideo]['video'];
		}

		if (alterVideo) {
			this.atualizarCanvas();
			this.options.canvas.sentido = !this.options.canvas.sentido;
			this.updateMenuList();
		}

		return src;
	}

	atualizarCanvas() {
		let _self = this;
		let canvas = <HTMLCanvasElement>document.getElementById(CONFIG.ID_CANVAS);
		if (canvas.dataset['interval'])
			clearInterval(parseInt(canvas.dataset['interval']));

		let img = document.createElement("img");

		if (this.options.alternativo.subVideo > -1 && this.options.alternativo.video > -1) {
			img.src = this.options.url.path + _self.listPlay['aula'][_self.options.aula]['subVideo'][_self.options.alternativo.subVideo]['video'][_self.options.alternativo.video]['img'];
		} else {
			let [unidade, nivel] = _self.options.unid.split('.');
			if (nivel) {
				img.src = this.options.url.path + _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
			} else {
				img.src = this.options.url.path + _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
			}
		}

		canvas.dataset['interval'] = setInterval(function () {
			let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
			let context = canvas.getContext('2d');

			context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
			if (video.classList.contains(CONFIG.CLASS_HIDE)) {
				/*let left = _self.options.canvas.width - _self.options.canvas.imgWidth,
					top = _self.options.canvas.height - _self.options.canvas.imgHeight;
				context.drawImage(img, left, top, _self.options.canvas.width, _self.options.canvas.height);*/
				context.drawImage(img, 0, 0, canvas.width, canvas.height);
			} else {//if (video.played.length) {
				/**
				 * Barra diagonal com a chave
				 */
				if (_self.options.mascara && _self.options.chave.length) {
					context.fillStyle = "rgba(120,120,120,0.1)";
					context.beginPath();

					let diferenca = 45;
					if (_self.options.canvas.sentido) {
						context.moveTo(0, 0);
						context.lineTo(diferenca, 0);
						context.lineTo(canvas.width, canvas.height - diferenca);
						context.lineTo(canvas.width, canvas.height);
						context.lineTo(canvas.width - diferenca, canvas.height);
						context.lineTo(0, diferenca);
					} else {
						context.moveTo(0, canvas.height);
						context.lineTo(diferenca, canvas.height);
						context.lineTo(canvas.width, diferenca);
						context.lineTo(canvas.width, 0);
						context.lineTo(canvas.width - diferenca, 0);
						context.lineTo(0, canvas.height - diferenca);
					}
					context.fill();
					context.font = "16px 'Arial'";
					context.fillStyle = "hsla(" + _self.options.canvas.hue + "," + _self.options.canvas.sat + "%," + _self.options.canvas.val + "%,0.5)";
					context.textAlign = "center";

					_self.options.canvas.hue += 0.5;
					_self.options.canvas.sat += _self.options.canvas.val2;
					_self.options.canvas.val += _self.options.canvas.val2;
					if (_self.options.canvas.sat >= 57) {
						_self.options.canvas.val2 = -0.5;	
					} else if (_self.options.canvas.sat <= 0) {
						_self.options.canvas.val2 = 0.5;
					}

					// Chave do aluno 
					let count = 0, countTotal = 11;
					while (count < countTotal) {
						if (_self.options.canvas.sentido) {
							//context.fillText(_self.options.chave, 960 - 90.5 * count, 535 - 48.5 * (count++));
							context.fillText(_self.options.chave, 
								(canvas.width/countTotal) * count - (25 - count * 3), 
								(canvas.height/countTotal) * (count++));
						} else {
							//context.fillText(_self.options.chave, 46 + 91 * count, 535 - 48.5 * (count++));
							context.fillText(_self.options.chave, 
								canvas.width - (canvas.width/countTotal) * count - (count * 3) + 25, 
								(canvas.height/countTotal) * (count++));
						}
					}
				}

				/**
				 * Play do Canvas
				 */
				if (video.buffered.length && video.paused && !video.classList.contains(CONFIG.CLASS_HIDE) && video.innerHTML != '') {
					var options_graph = {
						size: 140,
						lineWidth: 12
					};
					var radius = (options_graph.size - options_graph.lineWidth) / 2;

					let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
					if(!isMobile || video.clientWidth >= window.innerWidth || video.clientHeight >= window.innerHeight){
						/* Desenhando circulo do Play */
						context.beginPath();
						//context.arc(497, 285, radius, 0, Math.PI * 2, false); 
						context.arc(video.clientWidth/2, video.clientHeight/2, radius, 0, Math.PI * 2, false); 
						context.strokeStyle = 'rgba(180, 180, 180, 0.6)';
						context.lineCap = 'round';
						context.lineWidth = options_graph.lineWidth;
						context.stroke();

						/* Desenhando triangulo do Play */
						context.fillStyle = "rgba(180, 180, 180, 0.6)";
						context.beginPath();
						/*context.moveTo(475, 245);
						context.lineTo(475, 325);
						context.lineTo(540, 285);*/
						context.moveTo(video.clientWidth/2-22, video.clientHeight/2-40); 
						context.lineTo(video.clientWidth/2-22, video.clientHeight/2+40); 
						context.lineTo(video.clientWidth/2+43, video.clientHeight/2);
						context.fill();
					}
					
				}
			}
		}, 50).toString();
	}

	/**
	 * Set Menu List
	 */
	updateMenuList() {
		let menuList = document.getElementsByClassName('menu-list')[0];
		let parent = menuList.getElementsByClassName('parent')[0];
		let unidade = this.options.unid.split('.')[0];
		for (let i in parent.childNodes) {
			let elem = <HTMLElement>parent.childNodes[i];
			if (elem.nodeName == 'DIV' && elem.dataset['unid'] != undefined) {
				let child;
				if (child = <HTMLElement>elem.childNodes[0]) {
					if (elem.dataset['unid'] == unidade) {
						child.classList.remove(CONFIG.CLASS_PLUS);
						child.classList.add(CONFIG.CLASS_MINUS);
					} else {
						child.classList.remove(CONFIG.CLASS_MINUS);
						child.classList.add(CONFIG.CLASS_PLUS);
					}
				}
			} else if (elem.nodeName == 'LI') {
				let child = <HTMLDivElement>elem.childNodes[0];
				let ulList = <HTMLUListElement>elem.childNodes[3];
				if (elem.dataset['unid'] == this.options.unid) {
					elem.classList.add(CONFIG.CLASS_ACTIVE);
					child.classList.remove(CONFIG.CLASS_ICON);
					child.classList.add(CONFIG.CLASS_ICON_ACTIVE);
				} else {
					elem.classList.remove(CONFIG.CLASS_ACTIVE);
					child.classList.remove(CONFIG.CLASS_ICON_ACTIVE);
					child.classList.add(CONFIG.CLASS_ICON);
				}
				if (ulList) {
					if (elem.dataset['unid'] == unidade) {
						ulList.classList.remove(CONFIG.CLASS_HIDE);
					} else {
						ulList.classList.add(CONFIG.CLASS_HIDE);
					}
				}
				if (ulList) {
					for (let j in ulList.childNodes) {
						let elem2 = <HTMLElement>ulList.childNodes[j];
						if (elem2.nodeName == 'LI') {
							child = <HTMLDivElement>elem2.childNodes[0];
							if (elem2.dataset['unid'] == this.options.unid) {
								child.classList.remove(CONFIG.CLASS_ICON_DESACTIVE);
								child.classList.add(CONFIG.CLASS_ICON_ACTIVE);
							} else {
								child.classList.remove(CONFIG.CLASS_ICON_ACTIVE);
								child.classList.add(CONFIG.CLASS_ICON_DESACTIVE);
							}
						}
					}
				}
			}
		}
	}
}