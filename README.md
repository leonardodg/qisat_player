<p align="center"><img src="https://public.qisat.com.br/images/topo.jpg"></p>

# QiSatPlayer HTML5
-----------
Player HTML5 Desenvolvido pela Equipe QiSat.


<p align="center"><img src="https://public.qisat.com.br/images/demo.png"></p>


## Requirements
-----------
- NodeJS
- Git/Github
- PHP 5.6
- Gulp

## Installation
----------
- Clone Repository
```bash
git clone https://github.com/qisat/player.git
```

- Install Dependencias
```bash
npm install --only=dev
```

## Run task Developers || Run Exemple
-----------

- Run taks server php backend
```bash
$ $ npm run dev:banckend
```

- Run task build files project
```bash
$ npm start
```

- Run Server Player Browsersync
```bash
$ gulp browser-sync
```

- Run Samples
```bash
 $ gulp build-samples
```

## Settings
-----------
> File ./config.js
> Environment: Configurar ambiente pela variavel
> Path: Configurar locais das pastas origem do arqruivos desenvolvidos e destino do arquivos compilador  'path'
> fontName: Nome da class icons

> ./src/ts/Player.ts

```bash
		path: {
			local: '', // caminho absoluto da pasta do projeto
			poster: '' // file poster do video
		},

		url: {
			path: '/player/dist/samples/files/', // path da url dos arquivo no projeto
			infoUser: 'http://local-backend.dev.com.br:8000/getinfouser.php', // get Dados de Identificação user
			geraLog: 'http://local-backend.dev.com.br:8000/geraLog.php', // set Log de Acesso Moodle
			startDefa: 'http://local-backend.dev.com.br:8000/getUrl.php', // Gerar Link do video
			defa: 'http://local-backend.dev.com.br:8000/', // Default Filename defavid.php in getUrl.php
			local: '' // link de acesso ao arquivos 
		}
```

##Example HTML Basic

```bash

<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="height=device-height, initial-scale=1">

    <!-- Inject Style Lib -->
    <link rel="stylesheet" href="css/qisat-player.css">
    <title>Exemplo Básico - Player QiSat</title>
</head>

</body>
    <!-- TAG do Player - Start Component - Local onde fica o Video -->
    <div id="video-components"></div>

    <!-- Inject Script Lib -->
    <script src="index.js"> </script>

    <script>
        new QiSat.Player({ 'aula': 1, 'unid': '0' });
    </script>
</body>
</html>
```