var MenuContexto = /** @class */ (function () {
    function MenuContexto(player) {
        this.player = player;
        this.table = document.createElement('table');
        var rom = 0;
        if (player.options) {
            if (player.options.autoplay) {
                var hrow = this.table.insertRow(rom++);
                hrow.insertCell(0).innerHTML = "Reprodução automática";
                var autoplay = document.createElement("input");
                autoplay.id = QiSatPlayer.ID_AUTOPLAY;
                autoplay.type = 'checkbox';
                hrow.insertCell(1).appendChild(autoplay);
                var _self = this;
                var video = document.getElementById(QiSatPlayer.ID_VIDEO);
                video.addEventListener('ended', this.endVideo.bind(this, _self));
            }
            if (player.options.playbackRate) {
                var _self_1 = this;
                hrow = this.table.insertRow(rom++);
                hrow.insertCell(0).innerHTML = "Velocidade de reprodução";
                var groupPlayback = document.createElement("div");
                groupPlayback.id = QiSatPlayer.ID_GROUP_PLAYBACK;
                var fiMinus = document.createElement("i");
                fiMinus.classList.add(QiSatPlayer.CLASS_MINUS);
                fiMinus.addEventListener('click', function () {
                    _self_1.playbackRate(false);
                });
                groupPlayback.appendChild(fiMinus);
                var playback = document.createElement("label");
                playback.id = QiSatPlayer.ID_PLAYBACK;
                playback.innerHTML = '1x';
                groupPlayback.appendChild(playback);
                var fiPlus = document.createElement("i");
                fiPlus.classList.add(QiSatPlayer.CLASS_PLUS);
                fiPlus.addEventListener('click', function () {
                    _self_1.playbackRate();
                });
                groupPlayback.appendChild(fiPlus);
                hrow.insertCell(1).appendChild(groupPlayback);
            }
        }
        if (rom) {
            var videoControls = document.getElementById(QiSatPlayer.ID_VIDEO_CONTROLS);
            var subMenu = document.createElement("div");
            subMenu.id = QiSatPlayer.ID_SUBMENU;
            subMenu.classList.add(QiSatPlayer.CLASS_HIDE);
            subMenu.appendChild(this.table);
            videoControls.appendChild(subMenu);
            var btWidget_1 = document.createElement("div");
            btWidget_1.classList.add(QiSatPlayer.CLASS_WIDGET);
            btWidget_1.addEventListener('click', function () {
                var subMenu = document.getElementById(QiSatPlayer.ID_SUBMENU);
                if (subMenu.classList.contains(QiSatPlayer.CLASS_HIDE)) {
                    var degrees = 1;
                    this.dataset['interval'] = setInterval(function () {
                        if (navigator.userAgent.match("Chrome"))
                            btWidget_1.style['WebkitTransform'] = "rotate(" + degrees + "deg)";
                        else if (navigator.userAgent.match("Firefox"))
                            btWidget_1.style['MozTransform'] = "rotate(" + degrees + "deg)";
                        else if (navigator.userAgent.match("MSIE"))
                            btWidget_1.style['msTransform'] = "rotate(" + degrees + "deg)";
                        else if (navigator.userAgent.match("Opera"))
                            btWidget_1.style['OTransform'] = "rotate(" + degrees + "deg)";
                        else
                            btWidget_1.style['transform'] = "rotate(" + degrees + "deg)";
                        if (++degrees > 359)
                            degrees = 1;
                    }, 15).toString();
                }
                else {
                    clearInterval(parseInt(this.dataset['interval']));
                }
                subMenu.classList.toggle(QiSatPlayer.CLASS_HIDE);
            });
            this.player.btEstilo(btWidget_1);
            videoControls.appendChild(btWidget_1);
        }
    }
    MenuContexto.prototype.endVideo = function (_self) {
        var videoTag = document.getElementById(QiSatPlayer.ID_VIDEO_TAG);
        var video = document.getElementById(QiSatPlayer.ID_VIDEO);
        var graph = document.getElementById(MenuContexto.ID_GRAPH), canvas, span;
        if (graph) {
            for (var index = 0; index < graph.childNodes.length; index++) {
                var element = graph.childNodes[index];
                if (element.nodeName == 'CANVAS') {
                    canvas = element;
                }
                else if (element.nodeName == 'SPAN') {
                    span = element;
                }
            }
        }
        else {
            graph = document.createElement("div");
            graph.id = MenuContexto.ID_GRAPH;
            videoTag.appendChild(graph);
            canvas = document.createElement('canvas');
            graph.appendChild(canvas);
            span = document.createElement('span');
            span.textContent = span.dataset['segundos'] = '10';
            span.classList.add(QiSatPlayer.CLASS_HIDE);
            graph.appendChild(span);
        }
        var ctx = canvas.getContext('2d');
        var autoplay = document.getElementById(QiSatPlayer.ID_AUTOPLAY);
        var startGraph = setInterval(function () {
            if (video.classList.contains(QiSatPlayer.CLASS_HIDE) && autoplay.checked) {
                canvas.classList.remove(QiSatPlayer.CLASS_HIDE);
                span.classList.remove(QiSatPlayer.CLASS_HIDE);
                var options_graph = {
                    percent: parseInt(graph.getAttribute('data-percent')) || 0,
                    size: parseInt(graph.getAttribute('data-size')) || 120,
                    lineWidth: parseInt(graph.getAttribute('data-line')) || 12,
                    rotate: parseInt(graph.getAttribute('data-rotate')) || 0
                };
                canvas.width = canvas.height = options_graph.size;
                ctx.translate(options_graph.size / 2, options_graph.size / 2);
                ctx.rotate((-1 / 2 + options_graph.rotate / 180) * Math.PI);
                var radius = (options_graph.size - options_graph.lineWidth) / 2;
                var drawCircle = function (percent) {
                    percent = Math.min(Math.max(0, percent || 1), 1);
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                    ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
                    ctx.lineCap = 'round'; // butt, round or square
                    ctx.lineWidth = options_graph.lineWidth;
                    ctx.stroke();
                };
                drawCircle(1);
                if (options_graph.percent)
                    drawCircle(options_graph.percent / 360);
                var segundos = parseFloat(span.dataset['segundos']);
                if (segundos > -1) {
                    segundos = segundos - (10 / 360);
                    span.dataset['segundos'] = segundos.toString();
                    if (Math.ceil(segundos) > -1)
                        span.textContent = Math.ceil(segundos).toString();
                }
                else {
                    graph.remove();
                    clearInterval(startGraph);
                    _self.player.setSource(true);
                }
                if (options_graph.percent < 360) {
                    options_graph.percent += 1;
                    graph.dataset['percent'] = options_graph.percent.toString();
                }
            }
            else {
                canvas.classList.add(QiSatPlayer.CLASS_HIDE);
                span.classList.add(QiSatPlayer.CLASS_HIDE);
                span.dataset['segundos'] = '10';
                if (graph) {
                    graph.setAttribute('data-percent', '0');
                    graph.setAttribute('data-size', '120');
                    graph.setAttribute('data-line', '12');
                    graph.setAttribute('data-rotate', '0');
                }
                if (!video.classList.contains(QiSatPlayer.CLASS_HIDE))
                    clearInterval(startGraph);
            }
        }, 10000 / 360);
    };
    MenuContexto.prototype.playbackRate = function (plus) {
        if (plus === void 0) { plus = true; }
        var video = document.getElementById(QiSatPlayer.ID_VIDEO);
        var valores = [0.5, 0.75, 1, 1.25, 1.5, 2];
        var playback = document.getElementById('playback');
        var index = valores.indexOf(video.playbackRate) + (plus ? 1 : -1);
        if (valores[index] && playback) {
            playback.textContent = valores[index] + 'x';
            video.playbackRate = valores[index];
        }
    };
    MenuContexto.ID_GRAPH = "graph";
    return MenuContexto;
}());

var QiSatPlayer = /** @class */ (function () {
    function QiSatPlayer() {
        var opDefault = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opDefault[_i] = arguments[_i];
        }
        this.options = {
            aula: 1,
            unid: "0",
            slide: 0,
            subVideo: 0,
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
            playbackRate: true,
            style: null,
            video: {
                controls: false,
                autoplay: true,
                paused: true,
                width: 1010,
                height: 568,
                id: QiSatPlayer.ID_VIDEO,
                poster: '',
                filename: null,
                ext: ['mp4']
            },
            canvas: {
                id: QiSatPlayer.ID_CANVAS,
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
                xml: '',
                //local   : 'https://cursos.qisat.com.br',
                local: window.location.protocol + '//' + window.location.hostname,
                imagens: '',
                imgMask: '',
                videos: '',
                infouser: '/repository/user/getinfouser.php',
                geralog: '/course/format/topicstime/controle_acesso/geraLog.php',
                poster: '/lib/QiSatPlayer3/public/imagens/poster.jpg',
                defaLocal: '/lib/QiSatPlayer3/public',
                defaArq: '/getUrl.php',
                data: ''
            }
        };
        opDefault = opDefault[0];
        for (var option in opDefault) {
            if (typeof opDefault[option] === 'object') {
                for (var subOption in opDefault[option])
                    this.options[option][subOption] = opDefault[option][subOption];
            }
            else {
                this.options[option] = opDefault[option];
            }
        }
        if (QiSatPlayer.PATHS[location.hostname]) {
            this.options.path = QiSatPlayer.PATHS[location.hostname];
        }
        this.options.video.poster = this.options['path']['poster'];
        window.oncontextmenu = function (e) {
            e.preventDefault();
        };
        var videoPlayer = document.getElementById(QiSatPlayer.ID_VIDEO_CONTAINER);
        if (this.options.style != null)
            videoPlayer.classList.add(this.options.style);
        videoPlayer.appendChild(this.createTop());
        videoPlayer.appendChild(this.createMenu());
        videoPlayer.appendChild(this.createVideoTag());
        videoPlayer.appendChild(this.createControls());
        this.carregarInfoUser();
        this.carregarXML();
        try {
            new MenuContexto(this);
        }
        catch (error) {
            console.log(error);
        }
    }
    /**
     * Criando componentes do topo do player
     */
    QiSatPlayer.prototype.createTop = function () {
        var videoTop = document.createElement("div");
        videoTop.id = QiSatPlayer.ID_VIDEO_TOP;
        videoTop.classList.add(QiSatPlayer.CLASS_VISIBILY);
        videoTop.appendChild(this.setTop());
        videoTop.appendChild(this.setLogo());
        videoTop.appendChild(this.setTitleCurso());
        videoTop.appendChild(this.setTitleAula());
        return videoTop;
    };
    QiSatPlayer.prototype.setTop = function () {
        var top = document.createElement("div");
        top.classList.add(QiSatPlayer.CLASS_TOP);
        return top;
    };
    QiSatPlayer.prototype.setLogo = function () {
        var logo = document.createElement("div");
        logo.classList.add(QiSatPlayer.CLASS_LOGO);
        return logo;
    };
    QiSatPlayer.prototype.setTitleCurso = function () {
        var titleCurso = document.createElement("span");
        titleCurso.classList.add(QiSatPlayer.CLASS_CURSO_TEXT);
        titleCurso.innerHTML = 'Test Player';
        return titleCurso;
    };
    QiSatPlayer.prototype.setTitleAula = function () {
        var titleAula = document.createElement("span");
        titleAula.classList.add(QiSatPlayer.CLASS_AULA_TEXT);
        titleAula.innerHTML = 'Demonstrativo';
        return titleAula;
    };
    /**
     * Criando menu do player
     */
    QiSatPlayer.prototype.createMenu = function () {
        var videoMenu = document.createElement("div");
        videoMenu.id = QiSatPlayer.ID_VIDEO_MENU;
        videoMenu.appendChild(this.setAction());
        videoMenu.appendChild(this.setList());
        return videoMenu;
    };
    QiSatPlayer.prototype.setAction = function () {
        var menuAction = document.createElement("div");
        menuAction.classList.add(QiSatPlayer.CLASS_MENU_ACTION);
        var menuIcon = document.createElement("img");
        menuIcon.classList.add(QiSatPlayer.CLASS_MENU_IMG);
        menuAction.appendChild(menuIcon);
        var menuSpan = document.createElement("span");
        menuSpan.innerHTML = 'MENU';
        menuAction.appendChild(menuSpan);
        menuAction.addEventListener('click', function () {
            var menuList = document.getElementsByClassName(QiSatPlayer.CLASS_MENU_LIST)[0];
            menuList.classList.toggle(QiSatPlayer.CLASS_HIDE);
        });
        return menuAction;
    };
    QiSatPlayer.prototype.setList = function () {
        var menuList = document.createElement("div");
        menuList.classList.add(QiSatPlayer.CLASS_MENU_LIST, QiSatPlayer.CLASS_HIDE);
        var menuTitleAula = document.createElement("span");
        menuTitleAula.classList.add(QiSatPlayer.CLASS_AULA_TEXT);
        menuList.appendChild(menuTitleAula);
        var parent = document.createElement("ul");
        parent.classList.add(QiSatPlayer.CLASS_PARENT);
        menuList.appendChild(parent);
        return menuList;
    };
    /**
     * Efeito de fundo ao clicar no botão
     * @param button
     */
    QiSatPlayer.prototype.btEstilo = function (button) {
        button.addEventListener('mousedown', function () {
            this.classList.add(QiSatPlayer.CLASS_BT_ACTIVE);
        });
        button.addEventListener('mouseup', function () {
            this.classList.remove(QiSatPlayer.CLASS_BT_ACTIVE);
        });
    };
    /**
     * Criando componentes de video do player
     */
    QiSatPlayer.prototype.createVideoTag = function () {
        var videoTag = document.createElement("div");
        videoTag.id = QiSatPlayer.ID_VIDEO_TAG;
        videoTag.appendChild(this.setBtClose());
        videoTag.appendChild(this.setVideo());
        videoTag.appendChild(this.setCanvas());
        return videoTag;
    };
    QiSatPlayer.prototype.touchstart = function () {
        var canvas = document.getElementById(QiSatPlayer.ID_CANVAS);
        clearInterval(parseInt(canvas.dataset['intervalTouchEnd']));
        var video = document.getElementById(QiSatPlayer.ID_VIDEO);
        var videoTop = document.getElementById(QiSatPlayer.ID_VIDEO_TOP);
        var videoControls = document.getElementById(QiSatPlayer.ID_VIDEO_CONTROLS);
        if ((video.classList.contains(QiSatPlayer.CLASS_HIDE) || !video.paused) &&
            (videoTop.classList.contains(QiSatPlayer.CLASS_VISIBILY) ||
                videoControls.classList.contains(QiSatPlayer.CLASS_VISIBILY))) {
            videoTop.classList.remove(QiSatPlayer.CLASS_VISIBILY);
            videoControls.classList.remove(QiSatPlayer.CLASS_VISIBILY);
        }
        else {
            videoTop.classList.add(QiSatPlayer.CLASS_VISIBILY);
            videoControls.classList.add(QiSatPlayer.CLASS_VISIBILY);
        }
    };
    QiSatPlayer.prototype.endVideo = function (_self) {
        _self.touchstart();
        var video = document.getElementById(QiSatPlayer.ID_VIDEO);
        video.classList.add(QiSatPlayer.CLASS_HIDE);
        video.load();
        var btPlay = document.getElementById(QiSatPlayer.ID_PLAY);
        btPlay.classList.remove(QiSatPlayer.CLASS_PLAY);
        btPlay.classList.remove(QiSatPlayer.CLASS_PAUSE);
        btPlay.classList.add(QiSatPlayer.CLASS_REFRESH);
        var btClose = document.getElementsByClassName(QiSatPlayer.CLASS_BT_CLOSE)[0];
        btClose.classList.add(QiSatPlayer.CLASS_HIDE);
    };
    QiSatPlayer.prototype.setBtClose = function () {
        var btClose = document.createElement("div");
        btClose.classList.add(QiSatPlayer.CLASS_BT_CLOSE);
        btClose.innerHTML = ' Fechar ';
        var fiX = document.createElement("div");
        fiX.classList.add(QiSatPlayer.CLASS_BT_CLOSE_X);
        btClose.appendChild(fiX);
        btClose.addEventListener('click', function () {
            var evObj = document.createEvent('HTMLEvents');
            evObj.initEvent('ended', false, false);
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            video.dispatchEvent(evObj);
        });
        this.btEstilo(btClose);
        return btClose;
    };
    QiSatPlayer.prototype.setVideo = function () {
        var video = document.createElement("video");
        video.id = QiSatPlayer.ID_VIDEO;
        video.width = 1010;
        video.height = 568;
        video.poster = this.options.path.poster;
        video.addEventListener('playing', function () {
            this.muted = Boolean(document.getElementsByClassName(QiSatPlayer.CLASS_VOLUME_NONE).length);
            var curmins = Math.floor(this.duration / 60), cursecs = Math.floor(this.duration - curmins * 60), durtimetext = document.getElementById(QiSatPlayer.ID_DURATION_TEXT);
            durtimetext.innerHTML = ("00" + curmins).slice(-2) + ":" + ("00" + cursecs).slice(-2);
        });
        video.addEventListener("timeupdate", function () {
            var curmins = Math.floor(this.currentTime / 60), cursecs = Math.floor(this.currentTime - curmins * 60), value = (this.currentTime / this.duration);
            var curtimetext = document.getElementById(QiSatPlayer.ID_TIME_TEXT);
            curtimetext.innerHTML = ("00" + curmins).slice(-2) + ":" + ("00" + cursecs).slice(-2);
            var progresso = document.getElementById(QiSatPlayer.ID_PROGRESS);
            progresso.value = (value) ? value : 0;
        });
        var _self = this;
        video.addEventListener('ended', this.endVideo.bind(this, _self));
        return video;
    };
    QiSatPlayer.prototype.setCanvas = function () {
        var canvas = document.createElement("canvas");
        canvas.id = QiSatPlayer.ID_CANVAS;
        canvas.width = 1010;
        canvas.height = 568;
        canvas.addEventListener('click', function () {
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            if (!video.classList.contains(QiSatPlayer.CLASS_HIDE)) {
                var btPlay = document.getElementById(QiSatPlayer.ID_PLAY);
                btPlay.click();
            }
        });
        canvas.addEventListener('touchstart', this.touchstart);
        canvas.addEventListener('touchend', function () {
            clearInterval(parseInt(this.dataset['intervalTouchEnd']));
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            this.dataset['intervalTouchEnd'] = setTimeout(function () {
                if (!video.paused) {
                    var videoTop = document.getElementById(QiSatPlayer.ID_VIDEO_TOP);
                    var videoControls = document.getElementById(QiSatPlayer.ID_VIDEO_CONTROLS);
                    videoTop.classList.remove(QiSatPlayer.CLASS_VISIBILY);
                    videoControls.classList.remove(QiSatPlayer.CLASS_VISIBILY);
                }
            }, 1500).toString();
        });
        return canvas;
    };
    /**
     * Criando componentes de controle do player
     */
    QiSatPlayer.prototype.createControls = function () {
        var videoControls = document.createElement("div");
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
    };
    QiSatPlayer.prototype.setBarraProgresso = function () {
        var progress = document.createElement("progress");
        progress.id = QiSatPlayer.ID_PROGRESS;
        progress.max = 1;
        progress.value = 0;
        progress.addEventListener('click', function (e) {
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            var value = e.offsetX / this.offsetWidth;
            var time = video.duration * value;
            video.currentTime = Math.floor(time);
            this.value = value;
        });
        return progress;
    };
    QiSatPlayer.prototype.setBtPrevious = function () {
        var _self = this;
        var btPrevious = document.createElement("div");
        btPrevious.id = QiSatPlayer.ID_PREVIOUS;
        btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS);
        btPrevious.addEventListener('click', function () {
            if (this.classList.contains(QiSatPlayer.CLASS_PREVIOUS))
                _self.setSource(false);
        });
        this.btEstilo(btPrevious);
        return btPrevious;
    };
    QiSatPlayer.prototype.setPlay = function () {
        var _self = this;
        var btPlay = document.createElement("div");
        btPlay.id = QiSatPlayer.ID_PLAY;
        btPlay.classList.add(QiSatPlayer.CLASS_PLAY);
        btPlay.click = function () {
            var menuList = document.getElementsByClassName(QiSatPlayer.CLASS_MENU_LIST)[0];
            menuList.classList.add(QiSatPlayer.CLASS_HIDE);
            var btClose = document.getElementsByClassName(QiSatPlayer.CLASS_BT_CLOSE)[0];
            btClose.classList.remove(QiSatPlayer.CLASS_HIDE);
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            video.classList.remove(QiSatPlayer.CLASS_HIDE);
            if (this.classList.contains(QiSatPlayer.CLASS_PAUSE)) {
                this.classList.remove(QiSatPlayer.CLASS_PAUSE);
                this.classList.add(QiSatPlayer.CLASS_PLAY);
                video.pause();
            }
            else {
                if (this.classList.contains(QiSatPlayer.CLASS_REFRESH)) {
                    video.currentTime = 0;
                }
                var promise = video.play();
                /*if (promise !== undefined) {
                    promise.then(function() {
                    //promise.then(_ => {
                        video.muted = Boolean(document.getElementsByClassName(QiSatPlayer.CLASS_VOLUME_NONE).length);
                        _self.touchstart();
                    });
                }*/
                _self.touchstart();
                if (!video.paused) {
                    this.classList.remove(QiSatPlayer.CLASS_REFRESH);
                    this.classList.remove(QiSatPlayer.CLASS_PLAY);
                    this.classList.add(QiSatPlayer.CLASS_PAUSE);
                }
                var subMenu = document.getElementById(QiSatPlayer.ID_SUBMENU);
                subMenu.classList.add(QiSatPlayer.CLASS_HIDE);
                var widget = document.getElementsByClassName(QiSatPlayer.CLASS_WIDGET)[0];
                if (widget)
                    clearInterval(parseInt(widget.dataset['interval']));
                if (MenuContexto) {
                    var graph = document.getElementsByClassName(MenuContexto.ID_GRAPH)[0];
                    if (graph)
                        clearInterval(parseInt(graph.dataset['interval']));
                }
            }
        };
        btPlay.addEventListener('click', btPlay.click);
        this.btEstilo(btPlay);
        return btPlay;
    };
    QiSatPlayer.prototype.setNext = function () {
        var _self = this;
        var btNext = document.createElement("div");
        btNext.id = QiSatPlayer.ID_NEXT;
        btNext.classList.add(QiSatPlayer.CLASS_NEXT);
        btNext.addEventListener('click', function () {
            if (this.classList.contains(QiSatPlayer.CLASS_NEXT))
                _self.setSource(true);
        });
        this.btEstilo(btNext);
        return btNext;
    };
    QiSatPlayer.prototype.setVolume = function () {
        var btVolume = document.createElement("div");
        btVolume.id = QiSatPlayer.ID_VOLUME;
        btVolume.classList.add(QiSatPlayer.CLASS_VOLUME);
        btVolume.addEventListener('click', function () {
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            if (video.muted = this.classList.contains(QiSatPlayer.CLASS_VOLUME)) {
                this.classList.remove(QiSatPlayer.CLASS_VOLUME);
                this.classList.add(QiSatPlayer.CLASS_VOLUME_NONE);
            }
            else {
                this.classList.remove(QiSatPlayer.CLASS_VOLUME_NONE);
                this.classList.add(QiSatPlayer.CLASS_VOLUME);
            }
        });
        this.btEstilo(btVolume);
        return btVolume;
    };
    QiSatPlayer.prototype.setVolumeBar = function () {
        var btVolumeBar = document.createElement("input");
        btVolumeBar.id = QiSatPlayer.ID_VOLUME_BAR;
        btVolumeBar.type = 'range';
        btVolumeBar.min = '0';
        btVolumeBar.max = btVolumeBar.value = '1';
        btVolumeBar.step = '0.1';
        btVolumeBar.addEventListener('click', function () {
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            video.volume = Number(this.value);
            var volume = document.getElementById(QiSatPlayer.ID_VOLUME);
            if (video.volume) {
                volume.classList.remove(QiSatPlayer.CLASS_VOLUME_NONE);
                volume.classList.add(QiSatPlayer.CLASS_VOLUME);
            }
            else {
                volume.classList.remove(QiSatPlayer.CLASS_VOLUME);
                volume.classList.add(QiSatPlayer.CLASS_VOLUME_NONE);
            }
        });
        return btVolumeBar;
    };
    QiSatPlayer.prototype.setSlides = function () {
        var _self = this;
        var slides = document.createElement("div");
        slides.id = QiSatPlayer.ID_DIV_SLIDES;
        slides.innerHTML = 'PARTE: ';
        slides.dataset['unid'] = '0';
        for (var i = 1; i <= 10; i++) {
            var p = document.createElement("p");
            p.innerHTML = i.toString();
            p.dataset['slide'] = (i - 1).toString();
            if (i == 1) {
                p.classList.add(QiSatPlayer.CLASS_ACTIVE);
            }
            else {
                p.classList.add(QiSatPlayer.CLASS_DISABLE);
            }
            p.addEventListener('click', function () {
                if (!this.classList.contains(QiSatPlayer.CLASS_DISABLE)) {
                    _self.options.slide = parseInt(this.dataset['slide']);
                    _self.setSource();
                }
            });
            slides.appendChild(p);
        }
        return slides;
    };
    QiSatPlayer.prototype.setSubVideos = function () {
        var subVideosList = document.createElement("div");
        subVideosList.id = 'subVideos-List';
        var p = document.createElement("p");
        p.innerHTML = 'VIDEO: ';
        subVideosList.appendChild(p);
        var subVideo = document.createElement("p");
        subVideo.classList.add(QiSatPlayer.CLASS_N_SUBVIDEO);
        subVideo.innerHTML = '1';
        subVideosList.appendChild(subVideo);
        var subVideoBarra = document.createElement("span");
        subVideoBarra.innerHTML = '/';
        subVideosList.appendChild(subVideoBarra);
        var totalSubVideo = document.createElement("p");
        totalSubVideo.classList.add(QiSatPlayer.CLASS_TOTAL_SUBVIDEO);
        totalSubVideo.innerHTML = '1';
        subVideosList.appendChild(totalSubVideo);
        return subVideosList;
    };
    QiSatPlayer.prototype.setTime = function () {
        var videoTime = document.createElement("div");
        videoTime.id = QiSatPlayer.ID_DIV_VIDEO_TIME;
        var curtimetext = document.createElement("span");
        curtimetext.id = QiSatPlayer.ID_TIME_TEXT;
        curtimetext.innerHTML = '00:00';
        videoTime.appendChild(curtimetext);
        var p = document.createElement("p");
        p.innerHTML = ' / ';
        videoTime.appendChild(p);
        var durtimetext = document.createElement("span");
        durtimetext.id = QiSatPlayer.ID_DURATION_TEXT;
        durtimetext.innerHTML = '00:00';
        videoTime.appendChild(durtimetext);
        return videoTime;
    };
    /**
     * Requisições de dados externas
     */
    QiSatPlayer.prototype.XhrFactory = function () {
        'use strict';
        var config = {
            contentType: 'text/xml',
            responseType: 'xml'
        };
        var parse = function (req) {
            var response;
            try {
                if (config.responseType == 'xml') {
                    response = req.responseXML;
                }
                else if (config.responseType == 'text') {
                    response = req.responseText;
                }
            }
            catch (e) {
                response = req.responseText;
            }
            return [response, req];
        };
        var xhr = function (type, url, data) {
            if (data === void 0) { data = null; }
            var atomXHR, methods = {
                success: function () { },
                error: function () { },
                always: function () { }
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
                    }
                    else {
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
            get: function (src) {
                return xhr('GET', src);
            },
            put: function (url, data) {
                return xhr('PUT', url, data);
            },
            post: function (url, data) {
                return xhr('POST', url, data);
            },
            "delete": function (url) {
                return xhr('DELETE', url);
            },
            setContentType: function (value) {
                config.contentType = value;
            },
            setResponseType: function (value) {
                config.responseType = value;
            }
        };
        return exports;
    };
    QiSatPlayer.prototype.carregarGeraLog = function (unid) {
        var idN = window.location.href.indexOf("?") !== -1 ? "&" : "?";
        var nivel = this.options.unid.indexOf(".") > 0 ? this.options.unid.substring(this.options.unid.indexOf(".")) : '0';
        var payload = "conteudoAnterior=un" +
            (this.options.unid.indexOf(".") > 0 ? this.options.unid.replace(".", "_") : this.options.unid + "_0") +
            ".html&conteudo=un" + (unid.indexOf(".") > 0 ? unid.replace(".", "_") : unid + "_0") +
            ".html&url=" + window.location.href + idN +
            'idN=' + this.options.aula +
            '&unidade=' + this.options.unid +
            '&nivel=' + nivel +
            '&aula=Aula%20' + this.options.aula;
        var xhReq = this.XhrFactory();
        xhReq.setContentType('application/x-www-form-urlencoded');
        xhReq.setResponseType('text');
        xhReq.post(this.options.path.local + this.options.path.geralog, payload);
    };
    QiSatPlayer.prototype.carregarInfoUser = function () {
        var _self = this;
        var xhReq = this.XhrFactory();
        xhReq.setContentType('text/plain');
        xhReq.setResponseType('text');
        xhReq.get(this.options.path.local + this.options.path.infouser).success(function (data) {
            _self.options.chave = data.split('<br>')[2].substr(8);
        });
    };
    QiSatPlayer.prototype.carregarXML = function () {
        var _self = this;
        var xhReq = this.XhrFactory();
        xhReq.setContentType('text/xml');
        xhReq.setResponseType('xml');
        xhReq.get(this.options.path.xml + this.options.filename).success(function (data) {
            //console.log(data);
            _self.listPlay = _self.listarXml(data.getElementsByTagName('curso'));
            _self.createMenuList();
            _self.setSource();
        });
    };
    /**
     * Converte o XML em array
     * @param elem
     * @param tag
     */
    QiSatPlayer.prototype.listarXml = function (elem, tag) {
        if (tag === void 0) { tag = 'curso'; }
        var retorno = [];
        var tagRelacionamento = {
            'curso': ['aula'],
            'aula': ['item', 'btnImagem'],
            'item': ['titulo', 'slides', 'subItem'],
            'subItem': ['titulo', 'slides'],
            'slides': ['video'],
            'btnImagem': ['img']
        };
        var nextTags = tagRelacionamento[tag];
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].nodeName == tag) {
                var index = i;
                if (tag == 'aula' || tag == 'item' || tag == 'subItem') {
                    for (var j = 0; j < elem[i].attributes.length; j++) {
                        var node = elem[i].attributes[j];
                        if (node.name == 'num') {
                            index = node.value.split('.').pop();
                        }
                    }
                }
                retorno[index] = [];
                for (var j = 0; j < elem[i].attributes.length; j++) {
                    var node = elem[i].attributes[j];
                    retorno[index][node.name] = node.value;
                }
                if (nextTags == undefined) {
                    if (tag == 'titulo')
                        return elem[i].textContent;
                    retorno[index][tag] = elem[i].textContent;
                }
                else {
                    for (var j = 0; j < nextTags.length; j++) {
                        var nextTag = nextTags[j];
                        retorno[index][nextTag] = this.listarXml(elem[i].childNodes, nextTag);
                    }
                }
            }
        }
        if (tag == 'curso')
            return retorno.pop();
        if (tag == 'aula' || tag == 'item' || tag == 'subItem')
            return retorno;
        return retorno.filter(function (el) {
            return el != null;
        });
    };
    /**
     * Cria o menu lateral com todas as unidades e niveis
     */
    QiSatPlayer.prototype.createMenuList = function () {
        var _self = this;
        var parent = document.getElementsByClassName(QiSatPlayer.CLASS_PARENT)[0];
        function setVideo() {
            _self.carregarGeraLog(this.parentNode.dataset['unid']);
            _self.options.unid = this.parentNode.dataset['unid'];
            _self.setSource();
        }
        ;
        for (var i = 0; i < this.listPlay['aula'][this.options.aula]['item'].length; i++) {
            var unidade = this.listPlay['aula'][this.options.aula]['item'][i];
            var liView = document.createElement("div");
            liView.classList.add(QiSatPlayer.CLASS_ACTION);
            liView.classList.add(QiSatPlayer.CLASS_VIEW);
            liView.classList.add(unidade['subItem'].length ? QiSatPlayer.CLASS_LESS : QiSatPlayer.CLASS_SPAN);
            liView.dataset['unid'] = i + '';
            if (unidade['subItem'].length) {
                var plus_1 = document.createElement("i");
                plus_1.classList.add(QiSatPlayer.CLASS_PLUS);
                plus_1.addEventListener('click', function () {
                    var elem, i;
                    for (i in this.parentNode.parentNode.childNodes) {
                        elem = this.parentNode.parentNode.childNodes[i];
                        if (elem == this.parentNode) {
                            elem = this.parentNode.parentNode.childNodes[++i];
                            elem = elem.childNodes[3];
                            break;
                        }
                    }
                    if (this.classList.contains(QiSatPlayer.CLASS_PLUS)) {
                        this.classList.remove(QiSatPlayer.CLASS_PLUS);
                        this.classList.add(QiSatPlayer.CLASS_MINUS);
                        elem.classList.remove(QiSatPlayer.CLASS_HIDE);
                    }
                    else {
                        this.classList.remove(QiSatPlayer.CLASS_MINUS);
                        this.classList.add(QiSatPlayer.CLASS_PLUS);
                        elem.classList.add(QiSatPlayer.CLASS_HIDE);
                    }
                });
                liView.appendChild(plus_1);
            }
            parent.appendChild(liView);
            var liAction = document.createElement("li");
            liAction.classList.add(QiSatPlayer.CLASS_ACTION);
            liAction.dataset['unid'] = i + '';
            liAction.addEventListener('mouseover', function () {
                var child = this.childNodes[1];
                child.classList.add(QiSatPlayer.CLASS_ACTIVE);
            });
            liAction.addEventListener('mouseout', function () {
                var child = this.childNodes[1];
                child.classList.remove(QiSatPlayer.CLASS_ACTIVE);
            });
            var liIcon = document.createElement("div");
            liIcon.classList.add(QiSatPlayer.CLASS_ICON);
            liIcon.addEventListener('click', setVideo);
            liAction.appendChild(liIcon);
            var plus = document.createElement("i");
            plus.classList.add(QiSatPlayer.CLASS_PAGE);
            liIcon.appendChild(plus);
            var titulo = document.createElement("span");
            titulo.textContent = unidade['titulo'];
            titulo.addEventListener('click', setVideo);
            liAction.appendChild(titulo);
            var clear = document.createElement("div");
            clear.classList.add(QiSatPlayer.CLASS_CLEAR);
            liAction.appendChild(clear);
            if (unidade['subItem'].length) {
                var ulHide = document.createElement("ul");
                ulHide.classList.add(QiSatPlayer.CLASS_HIDE);
                for (var j = 0; j < unidade['subItem'].length; j++) {
                    var nivel = unidade['subItem'][j];
                    if (nivel != undefined) {
                        var liAction2 = document.createElement("li");
                        liAction2.classList.add(QiSatPlayer.CLASS_ACTION);
                        liAction2.dataset['unid'] = i + '.' + j;
                        liAction2.addEventListener('mouseover', function () {
                            var child = this.childNodes[1];
                            child.classList.add(QiSatPlayer.CLASS_ACTIVE);
                        });
                        liAction2.addEventListener('mouseout', function () {
                            var child = this.childNodes[1];
                            child.classList.remove(QiSatPlayer.CLASS_ACTIVE);
                        });
                        var liIcon2 = document.createElement("div");
                        liIcon2.classList.add(QiSatPlayer.CLASS_ICON_DESACTIVE);
                        liIcon2.addEventListener('click', setVideo);
                        var pageSmall = document.createElement("i");
                        pageSmall.classList.add(QiSatPlayer.CLASS_PAGE_SMALL);
                        liIcon2.appendChild(pageSmall);
                        liAction2.appendChild(liIcon2);
                        var titulo_1 = document.createElement("span");
                        titulo_1.textContent = nivel['titulo'];
                        titulo_1.addEventListener('click', setVideo);
                        liAction2.appendChild(titulo_1);
                        ulHide.appendChild(liAction2);
                        ulHide.appendChild(clear.cloneNode(true));
                    }
                }
                liAction.appendChild(ulHide);
            }
            parent.appendChild(liAction);
            parent.appendChild(clear.cloneNode(true));
        }
    };
    /**
     * Manipulação do video
     */
    QiSatPlayer.prototype.setSource = function (pos) {
        var _a;
        if (pos === void 0) { pos = null; }
        var video = document.getElementById(QiSatPlayer.ID_VIDEO);
        video.classList.remove(QiSatPlayer.CLASS_HIDE);
        video.innerHTML = '';
        video.load();
        var src = this.getNextVideo(pos, true);
        var btPrevious = document.getElementById(QiSatPlayer.ID_PREVIOUS);
        if (this.getNextVideo(false) == undefined) {
            btPrevious.classList.remove(QiSatPlayer.CLASS_PREVIOUS);
            btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS_DISABLE);
        }
        else {
            btPrevious.classList.remove(QiSatPlayer.CLASS_PREVIOUS_DISABLE);
            btPrevious.classList.add(QiSatPlayer.CLASS_PREVIOUS);
        }
        var btNext = document.getElementById(QiSatPlayer.ID_NEXT);
        if (this.getNextVideo(true) == undefined) {
            btNext.classList.remove(QiSatPlayer.CLASS_NEXT);
            btNext.classList.add(QiSatPlayer.CLASS_NEXT_DISABLE);
        }
        else {
            btNext.classList.remove(QiSatPlayer.CLASS_NEXT_DISABLE);
            btNext.classList.add(QiSatPlayer.CLASS_NEXT);
        }
        var unidade, nivel, parte, subVideo, totalSubVideo;
        _a = this.options.unid.split('.'), unidade = _a[0], nivel = _a[1];
        if (nivel == undefined) {
            parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['slides'];
        }
        else {
            parte = this.listPlay['aula'][this.options.aula]['item'][unidade]['subItem'][nivel]['slides'];
        }
        var slides = document.getElementById(QiSatPlayer.ID_DIV_SLIDES);
        for (var i in slides.childNodes) {
            var elem = slides.childNodes[i];
            if (elem.nodeName == 'P') {
                elem.classList.remove(QiSatPlayer.CLASS_ACTIVE);
                if (parseInt(elem.dataset['slide']) == this.options.slide) {
                    elem.classList.add(QiSatPlayer.CLASS_ACTIVE);
                }
                if (parseInt(elem.dataset['slide']) > parte.length - 1) {
                    elem.classList.add(QiSatPlayer.CLASS_DISABLE);
                }
                else {
                    elem.classList.remove(QiSatPlayer.CLASS_DISABLE);
                }
            }
        }
        if (subVideo = document.getElementsByClassName(QiSatPlayer.CLASS_N_SUBVIDEO)[0]) {
            subVideo.innerHTML = this.options.subVideo + 1;
        }
        if (totalSubVideo = document.getElementsByClassName(QiSatPlayer.CLASS_TOTAL_SUBVIDEO)[0]) {
            totalSubVideo.innerHTML = parte[this.options.slide]['video'].length;
        }
        var type = [], srcs = [];
        for (var i = 0; i < this.options.video.ext.length; i++) {
            var ext = this.options.video.ext[i];
            type.push(QiSatPlayer.VIDEOTYPES[ext + "-codecs"]);
            srcs.push(src + '.' + ext);
        }
        var data = 'url=' + window.location.href + '&src=' + srcs.join('|') + '&type=' + type.join('|') + '&defaLocal=' + this.options.path.defaLocal;
        var _self = this;
        var xhReq = this.XhrFactory();
        xhReq.setContentType('application/x-www-form-urlencoded');
        xhReq.setResponseType('text');
        xhReq.post(this.options.path.defaLocal + this.options.path.defaArq, data).success(function (data) {
            var result = data.split('|');
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
            var IE = /Trident/.test(navigator.userAgent) && window['MSStream'];
            if (iOS || IE) {
                //video.setAttribute('poster', _self.options.video.poster);
                video.removeAttribute('poster');
                var loading_1 = document.getElementById(QiSatPlayer.CLASS_LOADING);
                var canvas_1 = document.getElementById(QiSatPlayer.ID_CANVAS);
                var xhReq_1 = new XMLHttpRequest();
                xhReq_1.onloadstart = function (ev) {
                    xhReq_1.responseType = "blob";
                    if (!loading_1) {
                        loading_1 = document.createElement('div');
                        loading_1.classList.add(QiSatPlayer.CLASS_LOADING);
                        var videoTag = document.getElementById(QiSatPlayer.ID_VIDEO_TAG);
                        videoTag.insertBefore(loading_1, canvas_1.nextSibling);
                    }
                };
                var ctx_1 = canvas_1.getContext('2d');
                var drawCircle = function (percent) {
                    ctx_1.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
                    ctx_1.beginPath();
                    ctx_1.arc(486, 282, 32, Math.PI * 1.5, (Math.PI * 1.5) + (Math.PI * 2 * percent), false);
                    ctx_1.strokeStyle = 'rgba(180, 180, 180, 0.5)';
                    ctx_1.lineCap = 'round';
                    ctx_1.lineWidth = 6;
                    ctx_1.stroke();
                };
                xhReq_1.addEventListener("progress", function (event) {
                    if (event.lengthComputable) {
                        drawCircle(event.loaded / event.total);
                    }
                }, false);
                xhReq_1.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var result = reader.result.toString();
                        var byteCharacters = atob(result.slice(result.indexOf(',') + 1));
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var t = type.pop();
                        if (t.indexOf(';') > 0)
                            t = t.substr(0, t.indexOf(';'));
                        var blob = new Blob([byteArray], { type: t });
                        var sourceElem = document.createElement("source");
                        sourceElem.src = URL.createObjectURL(blob);
                        sourceElem.type = t;
                        video.appendChild(sourceElem);
                        //video.removeAttribute('poster');
                        ctx_1.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
                        loading_1.parentNode.removeChild(loading_1);
                        _self.loadVideo(video);
                    };
                    reader.readAsDataURL(xhReq_1.response);
                };
                xhReq_1.open('GET', result[result.length - 1]);
                if (result[result.length - 1].indexOf('defavid') !== -1)
                    xhReq_1.setRequestHeader("Range", "bytes=0-");
                xhReq_1.send();
            }
            else {
                length = result.length;
                /*video.onloadstart = function() {
                };*/
                video.onprogress = function () {
                    if (video.buffered.length > 0 && video.buffered.end && video.duration) {
                        var percent = video.buffered.end(0) / video.duration;
                        percent = 100 * Math.min(1, Math.max(0, percent));
                        //console.log(percent);
                    }
                };
                /*video.oncanplay = function() {//through
                };*/
                while (length--) {
                    var ext = _self.options.video.ext[length];
                    var source = document.createElement("source");
                    source.src = result[length];
                    source.type = QiSatPlayer.VIDEOTYPES[ext + "-codecs"];
                    video.appendChild(source);
                }
                _self.loadVideo(video);
            }
        });
    };
    QiSatPlayer.prototype.loadVideo = function (video) {
        video.load();
        var btPlay = document.getElementById(QiSatPlayer.ID_PLAY);
        if (btPlay.classList.contains(QiSatPlayer.CLASS_PAUSE)) {
            video.play();
        }
        else {
            btPlay.click();
        }
        var playback = document.getElementById('playback');
        if (playback) {
            video.playbackRate = parseFloat(playback.textContent);
        }
    };
    QiSatPlayer.prototype.getNextVideo = function (pos, alterVideo) {
        if (pos === void 0) { pos = null; }
        if (alterVideo === void 0) { alterVideo = false; }
        var src, unidade, nivel, slides;
        nivel = this.options.unid.split('.');
        unidade = parseInt(nivel[0]);
        slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
        if (nivel[1]) {
            nivel = parseInt(nivel[1]);
            slides = slides['subItem'][nivel];
        }
        else {
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
                if (nivel + pos) {
                    slides = this.listPlay['aula'][this.options.aula]['item'][unidade]['subItem'][nivel + pos];
                    if (alterVideo) {
                        this.carregarGeraLog(unidade + '.' + (nivel + pos));
                        this.options.unid = unidade + '.' + (nivel + pos);
                    }
                }
                else {
                    slides = this.listPlay['aula'][this.options.aula]['item'][unidade];
                    if (alterVideo) {
                        this.carregarGeraLog(unidade.toString());
                        this.options.unid = unidade.toString();
                    }
                }
                if (slides == undefined) {
                    slides = this.listPlay['aula'][this.options.aula]['item'][unidade + pos];
                    if (alterVideo) {
                        this.carregarGeraLog((unidade + pos).toString());
                        this.options.unid = (unidade + pos).toString();
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
        }
        else {
            src = slides['slides'][this.options.slide]['video'][this.options.subVideo]['video'];
        }
        if (alterVideo) {
            this.atualizarCanvas();
            this.options.canvas.sentido = !this.options.canvas.sentido;
            this.updateMenuList();
        }
        return src;
    };
    QiSatPlayer.prototype.atualizarCanvas = function () {
        var _self = this;
        var canvas = document.getElementById(QiSatPlayer.ID_CANVAS);
        if (canvas.dataset['interval'])
            clearInterval(parseInt(canvas.dataset['interval']));
        var img = document.createElement("img");
        var _a = _self.options.unid.split('.'), unidade = _a[0], nivel = _a[1];
        if (nivel) {
            img.src = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['subItem'][nivel]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
        }
        else {
            img.src = _self.listPlay['aula'][_self.options.aula]['item'][unidade]['slides'][_self.options.slide]['video'][_self.options.subVideo]['img'];
        }
        canvas.dataset['interval'] = setInterval(function () {
            var video = document.getElementById(QiSatPlayer.ID_VIDEO);
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, _self.options.video.width, _self.options.video.height);
            if (video.classList.contains(QiSatPlayer.CLASS_HIDE)) {
                context.drawImage(img, 75, 0, _self.options.canvas.imgWidth, _self.options.canvas.imgHeight);
            }
            else if (video.played.length) {
                /**
                 * Barra diagonal com a chave
                 */
                if (_self.options.chave.length) {
                    context.fillStyle = "rgba(120,120,120,0.1)";
                    context.beginPath();
                    var diferenca = 45;
                    if (_self.options.canvas.sentido) {
                        context.moveTo(0, 0);
                        context.lineTo(diferenca, 0);
                        context.lineTo(canvas.width, canvas.height - diferenca);
                        context.lineTo(canvas.width, canvas.height);
                        context.lineTo(canvas.width - diferenca, canvas.height);
                        context.lineTo(0, diferenca);
                    }
                    else {
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
                    //Chave do aluno
                    var count = 0;
                    while (count < 11) {
                        if (_self.options.canvas.sentido) {
                            context.fillText(_self.options.chave, 960 - 90.5 * count, 535 - 48.5 * (count++));
                        }
                        else {
                            context.fillText(_self.options.chave, 46 + 91 * count, 535 - 48.5 * (count++));
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
    };
    /**
     * Set Menu List
     */
    QiSatPlayer.prototype.updateMenuList = function () {
        var menuList = document.getElementsByClassName('menu-list')[0];
        var parent = menuList.getElementsByClassName('parent')[0];
        var unidade = this.options.unid.split('.')[0];
        for (var i in parent.childNodes) {
            var elem = parent.childNodes[i];
            if (elem.nodeName == 'DIV' && elem.dataset['unid'] != undefined) {
                var child = void 0;
                if (child = elem.childNodes[0]) {
                    if (elem.dataset['unid'] == unidade) {
                        child.classList.remove(QiSatPlayer.CLASS_PLUS);
                        child.classList.add(QiSatPlayer.CLASS_MINUS);
                    }
                    else {
                        child.classList.remove(QiSatPlayer.CLASS_MINUS);
                        child.classList.add(QiSatPlayer.CLASS_PLUS);
                    }
                }
            }
            else if (elem.nodeName == 'LI') {
                var child = elem.childNodes[0];
                var ulList = elem.childNodes[3];
                if (elem.dataset['unid'] == this.options.unid) {
                    elem.classList.add(QiSatPlayer.CLASS_ACTIVE);
                    child.classList.remove(QiSatPlayer.CLASS_ICON);
                    child.classList.add(QiSatPlayer.CLASS_ICON_ACTIVE);
                }
                else {
                    elem.classList.remove(QiSatPlayer.CLASS_ACTIVE);
                    child.classList.remove(QiSatPlayer.CLASS_ICON_ACTIVE);
                    child.classList.add(QiSatPlayer.CLASS_ICON);
                }
                if (ulList) {
                    if (elem.dataset['unid'] == unidade) {
                        ulList.classList.remove(QiSatPlayer.CLASS_HIDE);
                    }
                    else {
                        ulList.classList.add(QiSatPlayer.CLASS_HIDE);
                    }
                }
                if (ulList) {
                    for (var j in ulList.childNodes) {
                        var elem2 = ulList.childNodes[j];
                        if (elem2.nodeName == 'LI') {
                            child = elem2.childNodes[0];
                            if (elem2.dataset['unid'] == this.options.unid) {
                                child.classList.remove(QiSatPlayer.CLASS_ICON_DESACTIVE);
                                child.classList.add(QiSatPlayer.CLASS_ICON_ACTIVE);
                            }
                            else {
                                child.classList.remove(QiSatPlayer.CLASS_ICON_ACTIVE);
                                child.classList.add(QiSatPlayer.CLASS_ICON_DESACTIVE);
                            }
                        }
                    }
                }
            }
        }
    };
    QiSatPlayer.ID = "#";
    QiSatPlayer.CLASS = ".";
    QiSatPlayer.CLASS_ICO = "ico";
    QiSatPlayer.CLASS_BT = "bt_ctrl";
    QiSatPlayer.ID_VIDEO_CONTAINER = "video-components";
    QiSatPlayer.ID_VIDEO_TOP = "video-top";
    QiSatPlayer.ID_VIDEO_MENU = "video-menu";
    QiSatPlayer.ID_VIDEO_TAG = "video-tag";
    QiSatPlayer.ID_VIDEO_CONTROLS = "video-controls";
    QiSatPlayer.ID_ERROR = "error";
    QiSatPlayer.ID_VIDEO = "video";
    QiSatPlayer.ID_CANVAS = 'canvasMask';
    QiSatPlayer.CLASS_LOADING = "loading";
    QiSatPlayer.CLASS_BT_CLOSE = "bt-close";
    QiSatPlayer.CLASS_BT_CLOSE_X = "fi-x";
    QiSatPlayer.ID_PREVIOUS = "previous";
    QiSatPlayer.ID_PLAY = "play";
    QiSatPlayer.ID_NEXT = "next";
    QiSatPlayer.ID_VOLUME = "volume";
    QiSatPlayer.CLASS_PREVIOUS = "fi-previous";
    QiSatPlayer.CLASS_NEXT = "fi-next";
    QiSatPlayer.CLASS_REFRESH = "fi-refresh";
    QiSatPlayer.CLASS_PLAY = "fi-play";
    QiSatPlayer.CLASS_PAUSE = "fi-pause";
    QiSatPlayer.CLASS_PREVIOUS_DISABLE = "fi-previous-disable";
    QiSatPlayer.CLASS_NEXT_DISABLE = "fi-next-disable";
    QiSatPlayer.CLASS_VOLUME = "fi-volume";
    QiSatPlayer.CLASS_VOLUME_NONE = "fi-volume-none";
    QiSatPlayer.CLASS_WIDGET = "fi-widget"; // MenuContexto
    QiSatPlayer.CLASS_BT_ACTIVE = "bt-active";
    QiSatPlayer.CLASS_TOP = "top";
    QiSatPlayer.CLASS_LOGO = "logo";
    QiSatPlayer.CLASS_AULA_TEXT = "title-aula";
    QiSatPlayer.CLASS_CURSO_TEXT = "title-curso";
    QiSatPlayer.CLASS_MENU_IMG = "menu-icon";
    QiSatPlayer.CLASS_MENU_LIST = "menu-list";
    QiSatPlayer.CLASS_MENU_ACTION = "menu-action";
    QiSatPlayer.CLASS_PARENT = "parent";
    QiSatPlayer.CLASS_ACTION = "li_action";
    QiSatPlayer.CLASS_VIEW = "li_view";
    QiSatPlayer.CLASS_SPAN = "li_span";
    QiSatPlayer.CLASS_LESS = "li_less";
    QiSatPlayer.CLASS_ICON = "li_icon";
    QiSatPlayer.CLASS_ICON_ACTIVE = "li_icon-active";
    QiSatPlayer.CLASS_ICON_DESACTIVE = "li_icon-desactive";
    QiSatPlayer.CLASS_PAGE = "fi-page";
    QiSatPlayer.CLASS_PAGE_SMALL = "fi-page-small";
    QiSatPlayer.CLASS_CLEAR = "clear";
    QiSatPlayer.CLASS_ACTIVE = "active";
    QiSatPlayer.CLASS_DISABLE = "disable";
    QiSatPlayer.CLASS_HIDE = "hide";
    QiSatPlayer.CLASS_VISIBILY = "show";
    QiSatPlayer.ID_SEEK_BAR = "track-bar";
    QiSatPlayer.ID_VOLUME_BAR = "volume-bar";
    QiSatPlayer.ID_PLAYBACK_RATE = "playback-rate";
    QiSatPlayer.CLASS_VOLUME_TRACK = "volume-track";
    QiSatPlayer.CLASS_VOLUME_THUMB = "volume-thumb";
    QiSatPlayer.ID_DIV_VIDEO_TIME = "video-time";
    QiSatPlayer.ID_DIV_SLIDES = "slides";
    QiSatPlayer.ID_LEGENDA_TEXT = "legenda-text";
    QiSatPlayer.ID_TIME_TEXT = "curtimetext";
    QiSatPlayer.ID_DURATION_TEXT = "durtimetext";
    QiSatPlayer.ID_PROGRESS = "progress";
    QiSatPlayer.CLASS_PROGRESS_BAR = "progress-bar";
    QiSatPlayer.ID_SUBVIDEO_LIST = 'subVideos-List';
    QiSatPlayer.CLASS_N_SUBVIDEO = "subVideo";
    QiSatPlayer.CLASS_TOTAL_SUBVIDEO = "total-subVideo";
    QiSatPlayer.ID_SUBMENU = 'subMenu';
    QiSatPlayer.ID_AUTOPLAY = 'autoplay';
    QiSatPlayer.ID_GROUP_PLAYBACK = 'group-playback';
    QiSatPlayer.ID_PLAYBACK = 'playback';
    QiSatPlayer.CLASS_MINUS = "fi-minus";
    QiSatPlayer.CLASS_PLUS = "fi-plus";
    QiSatPlayer.ERROR_NOT_VIDEO_SUPPORT = " >> Navegador não tem suporte ao novo formato de video HTML5, FAVOR ACESSAR ATRAVÉS POR UM BROWSER ATUALIZADO!";
    QiSatPlayer.ERROR_NOT_VIDEO_EXT = " >> Nenhuma extensão do video HTML5 é suportada!";
    QiSatPlayer.ERROR_FILE_XML = " >> FileName do video não configurado!";
    QiSatPlayer.ERROR_TAG_CONTAINER = " >> Problemas para encontrar a tag ID " + QiSatPlayer.ID_VIDEO_CONTAINER + " de estrutura do Player no HTML";
    QiSatPlayer.ERROR_NO_XML_DOC = " >> DOCUMENTO XML NÃO FOI CARREGADO!";
    QiSatPlayer.ERROR_NO_XMLHTTPREQUEST = " >> BROWSER NO SUPORTE XML HTTP REQUEST!";
    QiSatPlayer.PATHS = {
        "local-player.qisat.com.br": {
            'xml': '',
            'local': window.location.protocol + '//' + window.location.hostname,
            'imagens': '',
            'imgMask': '',
            'videos': '',
            'infouser': '/getinfouser.php',
            'geralog': '/geraLog.php',
            'poster': '/images/poster.jpg',
            'defaLocal': '',
            'defaArq': '/getUrl.php',
            'data': ''
        },
        "mn40.mntec.com.br": {
            'xml': '',
            'local': window.location.protocol + '//' + window.location.hostname,
            'imagens': '',
            'imgMask': '',
            'videos': '',
            'infouser': '/test/getinfouser.php',
            'geralog': '/test/geraLog.php',
            'poster': '/public/imagens/poster.jpg',
            'defaLocal': '/public',
            'defaArq': '/getUrl.php',
            'data': ''
        }
    };
    QiSatPlayer.VIDEOTYPES = {
        'mp4': 'video/mp4',
        'mp4-codecs': 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
        'webm': 'video/webm',
        'webm-codecs': 'video/webm; codecs="vp8, vorbis"',
        'ogg': 'video/ogg',
        'ogg-codecs': 'video/ogg; codecs="theora, vorbis"'
    };
    return QiSatPlayer;
}());
