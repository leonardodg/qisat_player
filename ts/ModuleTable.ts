class ModuleTable {
	table: HTMLTableElement;
	private tbody: HTMLTableSectionElement;
	constructor(QiSatPlayer) {
		this.table = document.createElement('table');
		this.tbody = <HTMLTableSectionElement> this.table.createTBody();
		let rom = 0;

			
		var hrow = <HTMLTableRowElement> this.table.tBodies[0].insertRow(rom++); 
		hrow.insertCell(0).innerHTML = "Reprodução automática";
		let autoplay = document.createElement("input");
		autoplay.id = QiSatPlayer.ID_AUTOPLAY;
		autoplay.type = 'checkbox';
		hrow.insertCell(1).appendChild(autoplay);

			
		hrow = <HTMLTableRowElement> this.table.tBodies[0].insertRow(rom++);
		hrow.insertCell(0).innerHTML = "Velocidade de reprodução";
		let groupPlayback = document.createElement("div");
		groupPlayback.id = QiSatPlayer.ID_GROUP_PLAYBACK;

		let fiMinus = document.createElement("i");
		fiMinus.classList.add(QiSatPlayer.CLASS_MINUS);
		fiMinus.addEventListener('click', function () {
			//
		});
		groupPlayback.appendChild(fiMinus);

		let playback = document.createElement("label");
		playback.id = QiSatPlayer.ID_PLAYBACK;
		playback.innerHTML ='1x';
		groupPlayback.appendChild(playback);

		let fiPlus = document.createElement("i");
		fiPlus.classList.add(QiSatPlayer.CLASS_PLUS);
		fiPlus.addEventListener('click', function () {
			//
		});
		groupPlayback.appendChild(fiPlus);

		hrow.insertCell(1).appendChild(groupPlayback);
	}
}
