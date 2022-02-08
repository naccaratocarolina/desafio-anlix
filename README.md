# Desafio Anlix
Repositório onde foi feita a implementação do [desafio](https://github.com/anlix-io/desafio-anlix) proposto pela **anlix-io**.

**Status do Projeto** : Em desenvolvimento

![Badge](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## Tabela de Conteúdo

1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Uso](#uso)
6. [Arquitetura](#arquitetura)
6. [Funcionalidades](#funcionalidades)
7. [Autores](#autores)

## Tecnologias utilizadas
Essas são as frameworks e ferramentas que você precisará instalar para desenvolver esse projeto:
- **Framework frontend:** Angular
- **Framework backend:** NodeJS

Outras tecnologias interessantes que foram implementadas:
- **Banco de dados:** mysql
- **ORM:** Sequelize

## Instalação
- Repositório Git<br>
  *Clone o repositorio*
``` bash
$ git clone https://github.com/naccaratocarolina/desafio-anlix
```
- Dependências<br>
  *Instale as dependências necessarias nas pastas ```/frontend``` e ```/backend```*
``` bash
$ cd /frontend
$ npm install
```

``` bash
$ cd /backend
$ npm install
```

## Configuração
*No backend, temos que criar um banco de dados para a nossa aplicação, assim como configurar o arquivo ```.env```.* <br>
*Além disso, também é necessário migrar e seedar os dados para o banco de dados.*<br>
*Segue o passo a passo. Todos os comandos abaixo devem ser rodados dentro da pasta ```/backend```*

- Banco de dados<br>
  *Crie um banco de dados no phpmyadmin ou pelo bash. Seguem instruções pelo bash.*
```
$ mysql -u <seu user> -p
MariaDB [(none)]> CREATE DATABASE anlix CHARACTER SET utf8 COLLATE utf8_bin;
```

- Crie o arquivo ```.env```<br>
  *Copie o conteudo do arquivo de exemplo ```.env.example```*
``` bash
$ cp .env.example .env
```

- Configure o arquivo ```.env```<br>
  *Adicione as informações necessárias para o backend rodar*
``` text
# DATABASE
DB_CONNECTION=mysql
DB_USERNAME=<seu user>
DB_PASSWORD=<sua senha>
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=anlix
```

- Migre as tabelas para o banco de dados
``` bash
$ node src/database/migrate.js
```

- Seedar dados para o banco de dados
``` bash
$ node src/database/seeders/Seeder.js
```

## Uso
*Para rodar o projeto a partir do terminal, siga as instruções*
- backend
``` bash
$ cd /backend
$ node src/app.js
```
- frontend
``` bash
$ cd /frontend
$ ng serve
```
<br>
*Por fim, abra a URL ```localhost:4200``` no browser de escolha.*

## Arquitetura
- Link para uma imagem da modelagem do banco de dados

## Funcionalidades

## Autores
- Carolina Naccarato