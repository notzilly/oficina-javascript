# API REST de Espetáculos do IMDb

Este tutorial descreve os passos para rodar localmente a API utilizada na [oficina de JavaScript](https://github.com/leosteil/oficina-javascript) ministrada pelo PET-SI em setembro de 2018. A API foi feita para o servidor Node.js com o framework Express.

## Overview

### Tabela de Dados

A tabela de dados foi retirada do dataset "title.basics.tsv" do IMDb, disponível [aqui](https://www.imdb.com/interfaces/). Um subset muito pequeno de dados foi utilizado, visto o tamanho da tabela original (5,2 milhões de registros). Além disso, algumas colunas não relevantes para o contexto foram deixadas de fora. Abaixo estão as primeiras 7 linhas da tabela do arquivo "imdb.tsv":

|tipoTitulo|tituloPrimario|tituloOriginal|anoInicio|anoFim|duracaoMinutos|generos|
|---|---|---|---|---|---|---|
|tvSeries|A.T.O.M.: Alpha Teens on Machines|A.T.O.M.: Alpha Teens on Machines|2005|2007|1248|Action,Animation
|tvSeries|That Mitchell and Webb Look|That Mitchell and Webb Look|2006|2010|720|Comedy
|movie|The Cloth Peddler|Arshin mal-alan|1917||420|Comedy,Drama
|tvSeries|Back to the Floor|Back to the Floor|2002||360|Reality-TV
|movie|Enterpol|Enterpol|2005||220|Action,Comedy
|tvSeries|The Old Testament Scriptures|The Old Testament Scriptures|1958||210|Biography,Drama,History

### Rotas da API

A API possui as seguintes rotas:

|Verbo|URI|Função|
|---|---|---|
|GET|/api/filmes/pagina/{pagina_id}|Retorna filmes da página especificada|
|GET|/api/filmes/{filme_id}|Retorna filme por ID|
|POST|/api/filmes|Insere novo filme|
|DELETE|/api/filmes/{filme_id}|Exclui filme por ID|
|PUT|/api/filmes/{filme_id}|Atualiza filme por ID|
|GET|/api/series/pagina/{pagina_id}|Retorna séries da página especificada|
|GET|/api/series/{serie_id}|Retorna série por ID|
|POST|/api/series|Insere nova série|
|DELETE|/api/series/{serie_id}|Exclui série por ID|
|PUT|/api/series/{serie_id}|Atualiza série por ID|
|GET|/api/curtas/pagina/{pagina_id}|Retorna curtas da página especificada|
|GET|/api/curtas/{curta_id}|Retorna curta por ID|
|POST|/api/curtas|Insere novo curta|
|DELETE|/api/curtas/{curta_id}|Exclui curta por ID|
|PUT|/api/curtas/{curta_id}|Atualiza curta por ID|
|GET|/api/normalizar|Ajusta coluna gêneros|

### Download das Ferramentas

Instale a última versão disponível das ferramentas listadas abaixo para o sistema operacional que está utilizando. Após a instalação, certifique-se que os comandos "node", "npm" e "mongod" sejam acessíveis pela linha de comando do seu sistema. A ferramenta Forever serve para rodar scripts continuamente, ou seja, reiniciar o servidor caso algum erro ocorra durante a execução da API.

* [Node.js + NPM](https://nodejs.org/en/download/)
* [Forever](https://www.npmjs.com/package/forever)
* [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

### Download da API

O código da API pode ser baixado por download direto do [repositório](https://github.com/notzilly/oficina-js-api) ou por git clone:

```shell
git clone https://github.com/notzilly/oficina-js-api.git
```

### Configuração das Ferramentas

O próximo passo é entrar na pasta do projeto para instalarmos as dependências da API:

```shell
cd oficina-js-api
npm install
```

Depois vamos startar o serviço do banco de dados e importar nossos dados do arquivo "imdb.tsv":

```shell
[sudo] service mongod start
mongoimport --db imdb --collection imdb --type tsv --headerline --file imdb.tsv --ignoreBlanks
```

### Startando a API

Para startar a API, basta rodar o seguinte comando (ainda na pasta da API):

```shell
forever -w server.js
```

### Observações

Deve-se acessar a rota [http://localhost:8080/api/normalizar]() **uma e somente uma vez** após a importação de dados para ajustar a coluna de gêneros dos espetáculos. Feito isso, esta rota pode ser comentada.