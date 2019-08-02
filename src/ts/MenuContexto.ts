import * as CONFIG from './constants';
import * as TEXT from './text';

export default class MenuContexto {
	private table: HTMLTableElement;
	private player;

	constructor(player) {
		this.player = player;

		this.table = <HTMLTableElement>document.createElement('table');
		let rom = 0;

		if (player.options) {
			if (player.options.autoplay) {
				var hrow = <HTMLTableRowElement>this.table.insertRow(rom++);
				hrow.insertCell(0).innerHTML = TEXT.AUTO_PLAY;
				let autoplay = document.createElement("input");
				autoplay.id = CONFIG.ID_AUTOPLAY;
				autoplay.type = 'checkbox';
				hrow.insertCell(1).appendChild(autoplay);

				let _self = this;
				let video = document.getElementById(CONFIG.ID_VIDEO);
				video.addEventListener('ended', this.endVideo.bind(this, _self));
			}

			if (player.options.playbackRate) {
				let _self = this;
				hrow = <HTMLTableRowElement>this.table.insertRow(rom++);
				hrow.insertCell(0).innerHTML = TEXT.PLAY_SPEED;
				let groupPlayback = document.createElement("div");
				groupPlayback.id = CONFIG.ID_GROUP_PLAYBACK;

				let fiMinus = document.createElement("i");
				fiMinus.classList.add(CONFIG.CLASS_MINUS);
				fiMinus.addEventListener('click', function () {
					_self.playbackRate(false);
				});
				groupPlayback.appendChild(fiMinus);

				let playback = document.createElement("label");
				playback.id = CONFIG.ID_PLAYBACK;
				playback.innerHTML = '1x';
				groupPlayback.appendChild(playback);

				let fiPlus = document.createElement("i");
				fiPlus.classList.add(CONFIG.CLASS_PLUS);
				fiPlus.addEventListener('click', function () {
					_self.playbackRate();
				});
				groupPlayback.appendChild(fiPlus);

				hrow.insertCell(1).appendChild(groupPlayback);
			}
		}

		if (rom) {
			let videoControls = document.getElementById(CONFIG.ID_VIDEO_CONTROLS);

			let subMenu = document.createElement("div");
			subMenu.id = CONFIG.ID_SUBMENU;
			subMenu.classList.add(CONFIG.CLASS_HIDE);
			subMenu.appendChild(this.table);
			videoControls.appendChild(subMenu);

			let btWidget = document.createElement("div");
			btWidget.classList.add(CONFIG.CLASS_WIDGET);
			btWidget.addEventListener('click', function () {
				let subMenu = document.getElementById(CONFIG.ID_SUBMENU);
				if (subMenu.classList.contains(CONFIG.CLASS_HIDE)) {
					var degrees = 1;
					this.dataset['interval'] = setInterval(function () {
						if (navigator.userAgent.match("Chrome"))
							btWidget.style['WebkitTransform'] = "rotate(" + degrees + "deg)";
						else if (navigator.userAgent.match("Firefox"))
							btWidget.style['MozTransform'] = "rotate(" + degrees + "deg)";
						else if (navigator.userAgent.match("MSIE"))
							btWidget.style['msTransform'] = "rotate(" + degrees + "deg)";
						else if (navigator.userAgent.match("Opera"))
							btWidget.style['OTransform'] = "rotate(" + degrees + "deg)";
						else
							btWidget.style['transform'] = "rotate(" + degrees + "deg)";

						if (++degrees > 359) degrees = 1;
					}, 15).toString();
				} else {
					clearInterval(parseInt(this.dataset['interval']));
				}
				subMenu.classList.toggle(CONFIG.CLASS_HIDE);
			});
			this.player.btEstilo(btWidget);
			videoControls.appendChild(btWidget);
		}
	}

	endVideo(_self) {
		let videoTag = document.getElementById(CONFIG.ID_VIDEO_TAG);
		let video = document.getElementById(CONFIG.ID_VIDEO);

		let graph = document.getElementById(CONFIG.ID_GRAPH), canvas, span;
		if (graph) {
			for (let index = 0; index < graph.childNodes.length; index++) {
				let element = graph.childNodes[index];
				if (element.nodeName == 'CANVAS') {
					canvas = element;
				} else if (element.nodeName == 'SPAN') {
					span = element;
				}
			}
		} else {
			graph = document.createElement("div");
			graph.id = CONFIG.ID_GRAPH;
			videoTag.appendChild(graph);

			canvas = document.createElement('canvas');
			graph.appendChild(canvas);

			span = document.createElement('span');
			span.textContent = span.dataset['segundos'] = '10';
			span.classList.add(CONFIG.CLASS_HIDE);
			graph.appendChild(span);
		}

		var ctx = canvas.getContext('2d');
		let autoplay = <HTMLInputElement>document.getElementById(CONFIG.ID_AUTOPLAY);
		let startGraph = setInterval(function () {
			if (video.classList.contains(CONFIG.CLASS_HIDE) && autoplay.checked) {
				canvas.classList.remove(CONFIG.CLASS_HIDE);
				span.classList.remove(CONFIG.CLASS_HIDE);
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
				} else {
					graph.remove();
					clearInterval(startGraph);
					_self.player.setSource(true);
				}

				if (options_graph.percent < 360) {
					options_graph.percent += 1;
					graph.dataset['percent'] = options_graph.percent.toString();
				}
			} else {
				canvas.classList.add(CONFIG.CLASS_HIDE);
				span.classList.add(CONFIG.CLASS_HIDE);
				span.dataset['segundos'] = '10';
				if (graph) {
					graph.setAttribute('data-percent', '0');
					graph.setAttribute('data-size', '120');
					graph.setAttribute('data-line', '12');
					graph.setAttribute('data-rotate', '0');
				}
				if (!video.classList.contains(CONFIG.CLASS_HIDE))
					clearInterval(startGraph);
			}
		}, 10000 / 360);
	}

	playbackRate(plus = true) {
		let video = <HTMLVideoElement>document.getElementById(CONFIG.ID_VIDEO);
		var valores = [0.5, 0.75, 1, 1.25, 1.5, 2];
		var playback = document.getElementById('playback');
		var index = valores.indexOf(video.playbackRate) + (plus ? 1 : -1);
		if (valores[index] && playback) {
			playback.textContent = valores[index] + 'x';
			video.playbackRate = valores[index];
		}
	}
}
